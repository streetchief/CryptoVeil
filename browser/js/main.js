var $ = jQuery;

function swipeStatus(event, phase, direction, distance){
    if(phase == "end" && link === undefined ){
        if (direction == "left") {
            crypt0.next();
        } else if (direction == "right") {
            crypt0.prev();
        }
    }
}

$.fn.setCursorToTextEnd = function() {
    this.focus();
    var $initialVal = this.val();
    this.val($initialVal);
};

$(document).ready(function(){

    "use strict";

    if(BODY.clientWidth < 500){

        $('main .container').swipe({
            triggerOnTouchEnd: true,
            swipeStatus: swipeStatus,
            allowPageScroll: "vertical",
            threshold: 75
        });
        
    }

    function cursorAnimate(elem){
        var cursor,
            cursorInterval = 0,
            elInput = $(elem+' input:not([type=submit])'),
            elCurs  = $(elem+' .cursor'),
            elSpan  = $(elem+' .cmd span');

        $(elem+' .cmd').click(function() {

            elInput.setCursorToTextEnd();

            if(isIE9){
                // alert('ie9')
                elCurs.css('opacity',1);

                clearInterval(cursorInterval);
                cursorInterval = setInterval(function(){

                    if (elCurs.css('visibility') === 'visible') {
                        elCurs.css({
                            visibility: 'hidden'
                        });
                    } else {
                        elCurs.css({
                            visibility: 'visible'
                        });
                    }

                    
                },500);
                
            } else {
                elCurs.addClass('animated');
            }
        });

        elInput.keyup(function() {
            elSpan.text($(this).val());

            elSpan.width($(this).val().length * (lt_space*2));

            sel(elem+' .cmd span').scrollLeft = sel(elem+' .cmd span').scrollWidth;
        });
        
        elInput.focus(function(){
            if(isIE9){
                // alert('ie9')
                elCurs.css('opacity',1);
                clearInterval(cursorInterval);

                cursorInterval = setInterval(function(){

                    if (elCurs.css('visibility') === 'visible') {
                        elCurs.css({
                            visibility: 'hidden'
                        });
                    } else {
                        elCurs.css({
                            visibility: 'visible'
                        });
                    }

                    
                },500);
                
            } else {
                elCurs.addClass('animated');
            }
        });


        elInput.blur(function() {
            elCurs.removeClass('animated');
            if(isIE9){
                clearInterval(cursorInterval);
                elCurs.css('opacity',0);
            }
            elCurs.css({ visibility: 'visible' });
        });
    }

    // Cursor animation
    cursorAnimate('#notify');

    var inpt = selAll('.form-input');
    for (var i=1; i <= inpt.length; i++) {
        cursorAnimate('.form-input:nth-child('+i+')');
    }

    $('#notify .notify-me').submit(function(e){
        e.preventDefault();

        var form = $(this),
            elem = $('.notify-me .no-enter');
        
        $.ajax({
          url     : 'php/notify-me.php',
          type    : 'POST',
          data    : form.find('input').serialize(),
          success : function(data){
            switch(data) {
                case 0:
                    formLogger(0,elem);
                    break;
                case 1:
                    formLogger(1,elem);
                    break;
                case 2:
                    formLogger(1,elem);
                    break;
                default:
            }
          }
        });
    });

    $('.sayhello-form').submit(function(e){
        e.preventDefault();

        var form      = $(this);
        var formInput = form.find('input');

        // Remove class
        function removeError(el){
            setTimeout(function(){
                el.removeClass('error');
            },1500);
        }

        // For email
        function emailError(){
            for (var i = 0; i < formInput.length; i++) {
                if(formInput[i].type === 'email'){
                    var item = $(formInput[i].parentNode);
                    item.addClass('error');
                    removeError(item);
                    $(formInput[i]).setCursorToTextEnd();
                }
            }
        }

        $.ajax({
            type: 'POST',
            url : 'php/contact.php',
            data: formInput.serialize(),
            success: function(data){
                // Good
                if(data == 0){
                    form.trigger('reset');
                    for (var i = 0; i < formInput.length; i++) {
                        var item = $(formInput[i].parentNode);
                        item.find('span').text('');
                    }
                // unfilled
                } else if(data == 1){
                    for (var i = 0; i < formInput.length; i++) {
                        if(formInput[i].value === ''){
                            var item = $(formInput[i].parentNode);
                            item.addClass('error');
                            removeError(item);
                        }
                    }
                // wrong mail
                } else if(data == 2){
                    emailError();
                }
            }

        });
    });

    $('.follow-name').on('click',function(){
        $('.follow').toggleClass('open');
    });

    backgroundSlider();
});

var formChecker  = 0,
    elCount      = 0,
    messInterval = 0,
    messClass,
    messText;

// Notification for "Notify me"
function formLogger(status,el){

    var span = el.find('span'),
        inpt = el.find('input'); // Input

    if(status == 0){
        messText  = 'Success';
        messClass = 'send-ok';

    } else if(status == 1 | 2){
        messText  = 'Error';
        messClass = 'error';
    }

    elCount = messText;

    el.addClass(messClass);

    el.find('input').val(messText);

    messInterval = setInterval(function(){

        if(elCount.length == 0){ 
            clearInterval(messInterval);
            el.removeClass(messClass);
        };

        inpt.val(elCount);

        span.text(elCount);

        span.width(inpt.val().length * (lt_space*2));

        elCount = elCount.substring(0, elCount.length - 1);

    },200);
}



















