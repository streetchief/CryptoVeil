<?php
	require_once('api_mailchimp/MCAPI.class.php');
	require_once('api_getresponse/GetResponseAPI.class.php');
	require_once('api_aweber/aweber_api.php');
	require_once('api_campaignmonitor/csrest_subscribers.php');
	require_once('api_icontact/iContactApi.php');
	
	/* notify me options ************************************/

	/* Mailchimp setting */
	//define('MC_APIKEY', ''); //Your API key from here - http://admin.mailchimp.com/account/api
	//define('MC_LISTID', ''); //List unique id from here - http://admin.mailchimp.com/lists/

	/* GetResponse setting */
	//define('GR_APIKEY', ''); //Your API key fr om here - https://app.getresponse.com/my_api_key.html
	//define('GR_CAMPAIGN', ''); //Campaign name from here - https://app.getresponse.com/campaign_list.html
	
	/* AWeber setting */
	//define('AW_AUTHCODE', ''); //Your Authcode from here - https://auth.aweber.com/1.0/oauth/authorize_app/4ac86d98
	//define('AW_LISTNAME', ''); //List name from here - https://www.aweber.com/users/autoresponder/manage

	/* Campaign Monitor setting */
	//define('CM_APIKEY', ''); //Your API key from here - https://www.campaignmonitor.com/api/getting-started/#authenticating_with_an_api_key
	//define('CM_LISTID', ''); //List id from here - https://www.campaignmonitor.com/api/getting-started/#listid
	
	/* iContact setting */
	//define('IC_APPID', ''); //Your APP ID from here - https://app.icontact.com/icp/core/registerapp
	//define('IC_APIUSERNAME', ''); //Your username
	//define('IC_APIPASSWORD', ''); //Your password
	
	/* txt file setting */
	define('FL_MAIL', 'emails.txt');
	
	/* File error log */
	define('ERROR_LOG', 'error-log.txt');

	/* Install headers */
	header('Expires: 0');
	header('Cache-Control: no-cache, must-revalidate, post-check=0, pre-check=0');
	header('Pragma: no-cache');
	header('Content-Type: application/json; charset=utf-8');
	
	/* AJAX check */
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		extract($_POST);
		
		try {
			if(isset($subscribe) && validateMail($subscribe)) {
				saveFile($subscribe);
				sendMailChimp($subscribe);
				sendGetResponse($subscribe);
				sendAWeber($subscribe);
				sendCompaingMonitor($subscribe);
				sendiContact($subscribe);
			} else {
				throw new Exception("Email not valid",1);
			}
		} catch(Exception $e) {
			$code = $e->getCode();
		}
		
		echo $code?$code:0;

	} else {
		echo 'Only Ajax request';
	} 
	
	function validateMail($email)	{
		if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
			return true;
		} else {
			return false;
		}
	}
	
	function saveFile($mailSubscribe)	{
		if(defined('FL_MAIL')) {
			file_put_contents(FL_MAIL, date("m/d/Y H:i:s")." - ".$mailSubscribe.";\n", FILE_APPEND);
		}
	}

	function sendMailChimp($mailSubscribe) {
		if(defined('MC_APIKEY') && defined('MC_LISTID')) {
			$api = new MCAPI(MC_APIKEY);
			if($api->listSubscribe(MC_LISTID, $mailSubscribe) !== true) {
				if($api->errorCode == 214) {
					throw new Exception("Email exist",2);
				} else {
					errorLog("MailChimp","[".$api->errorCode."] ".$api->errorMessage);
				}
			}
		}
	}
	
	function sendGetResponse($mailSubscribe) {
		if(defined('GR_APIKEY') && defined('GR_CAMPAIGN')) {
			$api = new GetResponse(GR_APIKEY);
			$campaign = $api->getCampaignByName(GR_CAMPAIGN);
			$subscribe = $api->addContact($campaign, getName($mailSubscribe), $mailSubscribe);
			if(array_key_exists('duplicated', $subscribe)) {
				throw new Exception("Email exist",2);
			}
		}
	}
	
	function sendAWeber($mailSubscribe)	{
		if(defined('AW_AUTHCODE') && defined('AW_LISTNAME')) {
			$token = 'api_aweber/'. substr(AW_AUTHCODE, 0, 10);
			
			if(!file_exists($token)) {
				try {
					$auth = AWeberAPI::getDataFromAweberID(AW_AUTHCODE);
					file_put_contents($token, json_encode($auth));
				} catch(AWeberAPIException $exc) {
					errorLog("AWeber","[".$exc->type."] ". $exc->message ." Docs: ". $exc->documentation_url);
					throw new Exception("Authorization error",5);
				}  
			}
			
			if(file_exists($token)) {
				$key = file_get_contents($token);
			}
			list($consumerKey, $consumerSecret, $accessToken, $accessSecret) = json_decode($key);
			
			$aweber = new AWeberAPI($consumerKey, $consumerSecret);
			try {
				$account = $aweber->getAccount($accessToken, $accessSecret);
				$foundLists = $account->lists->find(array('name' => AW_LISTNAME));
				$lists = $foundLists[0];
				
				$params = array(
					'email' => $mailSubscribe,
					'name' => getName($mailSubscribe)
				);
			
				if(isset($lists)) {
					$lists->subscribers->create($params);
				} else{
					errorLog("AWeber","List is not found");
					throw new Exception("Error found Lists",4);
				}
		
			} catch(AWeberAPIException $exc) {
				if($exc->status == 400) {
					throw new Exception("Email exist",2);
				} else {
					errorLog("AWeber","[".$exc->type."] ". $exc->message ." Docs: ". $exc->documentation_url);
				}
			}
		}
	}
	
	function sendCompaingMonitor($mailSubscribe) {
		if(defined('CM_APIKEY') && defined('CM_LISTID')) {
			$wrap = new CS_REST_Subscribers(CM_LISTID, array('api_key' => CM_APIKEY));
			$result = $wrap->add(array(
				'EmailAddress' => $mailSubscribe,
				'Resubscribe' => true
			));
			
			if(!$result->was_successful()) {
				throw new Exception("Error found Lists",4);
			}
		}
	}
	
	function sendiContact($mailSubscribe) {
		if(defined('IC_APPID') && defined('IC_APIUSERNAME') && defined('IC_APIPASSWORD')) {
			iContactApi::getInstance()->setConfig(array(
				'appId'       => IC_APPID, 
				'apiPassword' => IC_APIPASSWORD, 
				'apiUsername' => IC_APIUSERNAME
			));
			
			$oiContact = iContactApi::getInstance();
			
			try {
				$oiContact->addContact($mailSubscribe);
			} catch (Exception $oException) {
				throw new Exception("Error found Lists",4);
			}
		}
	}
	
	function errorLog($name,$desc) {
		file_put_contents(ERROR_LOG, date("m.d.Y H:i:s")." (".$name.") ".$desc."\n", FILE_APPEND);
	}
	
	function getName($mail)	{
		preg_match("/([a-zA-Z0-9._-]*)@[a-zA-Z0-9._-]*$/",$mail,$matches);
		return $matches[1];
	}

?>