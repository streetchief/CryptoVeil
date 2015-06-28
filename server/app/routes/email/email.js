var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('vDMsj0tlxEj5ONebunR34g');

// function setProp(arr){
//   var tempTo = [];
//   var objTo = {};
//   arr.forEach(function(a){
//     if(a.type){
//       objTo.type = a.type
//     }
//   })
//   return temp;
// }

function sendEmail(info){
//to_name, to_email, from_name, from_email, subject, message_html
  console.log('email info',info);

//this can be structured and cusomized as per the information google provided
  // var message = {
  //     "html": message_html,
  //     "subject": subject,
  //     "from_email": from_email,
  //     "from_name": from_name,
  //     "to": [{
  //             "email": to_email,
  //             "name": to_name
  //         }],
  //     "important": false,
  //     "track_opens": true,    
  //     "auto_html": false,
  //     "preserve_recipients": true,
  //     "merge": false  
  // };
//   var message = {
//     "subject": "Your order is received",
//     "from_email": "order@meetyourhero.com",
//     "from_name": "MeetYourHero",
//     "to": [{
//             "email": "eueu.lee@gmail.com",
//             "name": "Eunice",
//             "type": "to"
//         },
//         {
//         "email": "robbieferguson139@gmail.com",
//         "name": "Robbie",
//         "type": "to"
//       },
//       {
//       "email": "kylelussier3@gmail.com",
//       "name": "Kyle",
//       "type": "to"
//       }

//         ],
//     "headers": {
//         "Reply-To": "message.reply@example.com"
//     }

// };

var async = false;
var ip_pool = "Main Pool";

// mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
// // mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
//     console.log('reseult....',result);
// }, function(e) {
//     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
// });


}

module.exports = sendEmail;