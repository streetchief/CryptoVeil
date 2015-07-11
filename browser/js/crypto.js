// Search selector
var sel = function(e){ return document.querySelector(e)};
// Search selectors
var selAll = function(e){return document.querySelectorAll(e)};

var cry_row  = (32*2)-1,           // Symbols in row
    lt_space = 37.6/2,             // Spacing between characters
    cof      = 7.1,                // The coefficient for proportional decrease indentation
    so       = {},                 // The object which will symbols
    rwLth    = {},                 // The object which will be about strings
    orginal  = {},                 // The object which will save all modification DOM to repair
    tops     = 25,                 // Backdown Y
    st       = 0,                  // Characters
    enRow    = 0,                  // Number of rows that will be added down canvas-area
    sr       = 0,                  // Number of rows
    oLimit   = 0.5,                // Transparency
    abc      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    rtrims   = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,  // Regular season to cut empty spaces
    cWidth   = sel('main .container').clientWidth,    // Container Width
    bWidth   = sel('body').clientWidth,               // Body Width
    canvas   = sel('#area'),                          // Canvas area
    BODY     = sel('body'),
    MAIN     = sel('main'),
    context  = canvas.getContext("2d"),               // Context
    symCol   = '#666',             // Symbol color
    timePos  = 0,                  // For Timer
    navPrev  = sel('#nav-prev a'), // Navigation button
    navNext  = sel('#nav-next a'), // Navigation button
    mdlCls   = sel('#nav-close a'),// Button exit for page in modal window
    mobile   = false,              // Mobile check
    chkStp   = false,              // Draw Check
    frmFocus = {};                 // Focus element

    canvas.height = 0;
    cry_row = Math.floor(cWidth / lt_space ),
    isIE9   = document.all && document.addEventListener && !window.atob;

var link;

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/)) {
    mobile = true;
}

// Timer
var countdown = function (t) {

    var eventDate = (Date.parse( sel(t).getAttribute('data-time') )) / 1e3;

    var currentDate = Math.floor(Date.now() / 1e3);

    var seconds = eventDate - currentDate;

    var days = Math.floor(seconds / 86400);

    var endNum    = '',
        preNum    = '',
        endString = ' days left';

    var t0 = {
         1 : 'one',
         2 : 'two',
         3 : 'three',
         4 : 'four',
         5 : 'five',
         6 : 'six',
         7 : 'seven',
         8 : 'eight',
         9 : 'nine',
        10 : 'ten',
        11 : 'eleven',
        12 : 'twelve',
        13 : 'thirteen',
        14 : 'fourteen',
        15 : 'fifteen',
        16 : 'sixteen',
        17 : 'seventeen',
        18 : 'eighteen',
        19 : 'nineteen'
    };

    var t1 = {
        2 : 'twenty',
        3 : 'thirty',
        4 : 'forty',
        5 : 'fifty',
        6 : 'sixty',
        7 : 'seventy',
        8 : 'eighty',
        9 : 'ninety'
    };

    if (!isNaN(eventDate)) {
        if(days < 1){
            endNum = 'less than one day';
        } else if(days == 1){
            endString = ''
            endNum = t0[1]+' day left';
        } else if(days < 20 && days > 1){
            endNum = t0[days]+endString;
        } else if(days >= 20 && days < 100){
            


            if(String(days)[1] == 0){
                endNum = t1[String(days)[0]]+endString;
            } else {
                endNum = t1[String(days)[0]]+'-'+t0[String(days)[1]]+endString;
            }
        } else if(days >= 100 && days < 1000){
            
            if(String(days)[1]+String(days)[2] < 20){

                if(String(days)[1] == 0 && String(days)[2] == 0){
                    preNum = '';
                } else {
                    preNum = ' '+t0[Math.floor(String(days)[1]+String(days)[2])];
                } 

            } else if(String(days)[1]+String(days)[2] >= 20 && String(days)[1]+String(days)[2] < 100) {
                if(String(days)[2] == 0){
                    preNum = ' '+t1[String(days)[1]];
                } else {
                    preNum = ' '+t1[String(days)[1]]+'-'+t0[String(days)[2]];
                }
            }
            endNum = t0[String(days)[0]]+' hundred'+preNum+endString;
        } else if(days >= 1000){
            endNum = 'more than thousand days';
        }

        if (eventDate <= currentDate) {
            endNum = 'End Countdown';
        }

        sel(t + '> .innertime ').innerHTML = endNum;

    } else {
        sel(t + '> .innertime ').innerHTML = "Invalid date";
        console.log('Invalid date. Example: 2 september 2015 23:59');
    }

};

// var enRow; 

// Determination lenght object
function oLength(obj){var x = 0;for(i in obj) x++;return x};

// Vendor for RequestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function addClass(el, cls) {
    el.className += " "+cls
}

function removeClass(elm, cls) {
    var re = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    elm.className = elm.className.replace(re, ' ')
}

// Mixed array
function numberArray(a,b){
 b=[];while(a--)b[a]=a+1;return b;
}
function fy(a,b,c,d){c=a.length;while(c)b=Math.random()*(--c+1)|0,d=a[c],a[c]=a[b],a[b]=d}

// Hex to rgb
function hexToRgb(hex) {
    if(hex.length === 7){
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return 'rgba('+parseInt(result[1], 16)+','+parseInt(result[2], 16)+','+parseInt(result[3], 16)+', 1)';
    } else {
        var result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
        return ''+parseInt(result[1]+result[1], 16)+','+parseInt(result[2]+result[2], 16)+','+parseInt(result[3]+result[3], 16);
    }    
}

// Random Symbol
function randomString() {
    return abc[Math.round(Math.random() * (abc.length - 1))];
}
// Return value css element
function getStyle(style, selector) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var mysheet = document.styleSheets[i];
        var myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
        for (var j = 0; j < myrules.length; j++) {
            if (myrules[j].selectorText && myrules[j].selectorText.toLowerCase() === selector) {
                return myrules[j].style[style];
            }
        }

    }
};

// Return child elements
function getChildren(element) {
    var childNodes = element.childNodes;
    var children = [];
    for(var i = 1; i < childNodes.length; i += 2) {  // take every second element
        if(childNodes[i].nodeName !== "#comment"){
            children.push(childNodes[i]);
        }
    }
    return children;
}

// Checks limit в index
function symbolDelay(index,limit){
    if(index>=limit){return limit}else{if(index<0){return 0}else{return index.toFixed(1)}}
};

var canvaSize = function(){

    sel('#wrapper').style.letterSpacing = '19.5px';
    sel('#wrapper').style.lineHeight = '30px';

    cWidth   = sel('main .container').clientWidth;
    bWidth   = BODY.clientWidth;

    lt_space = 37.6/2;
    tops     = 25;
    cry_row = Math.floor(cWidth / lt_space);

    navPrev.style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';
    navNext.style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';


    // Адаптив
    if( bWidth <= 1199) {

        cry_row = Math.floor(cWidth / lt_space );

        sel('#wrapper').style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','') + cof+'px';

        if (bWidth < 991 && bWidth > 767) {

            sel('#wrapper').style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-cof+'px';
            sel('#wrapper').style.lineHeight = '24px';

            tops = 19.5;
            lt_space = 26.8/2;
            cry_row = Math.floor(cWidth / lt_space );

            navPrev.style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';
            navNext.style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';
        }

        if (bWidth < 767) {

            tops = 14.5;
            lt_space = 24/2;
            cry_row = Math.floor(cWidth / lt_space );

            sel('#wrapper').style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-cof-1.5+'px';
            sel('#wrapper').style.lineHeight = '15px';
            

            navPrev.style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';
            navNext.style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';
        }
    }
};


canvaSize();

// Background font size
function fontSize(){
    var context = canvas.getContext("2d");
    if( bWidth < 991 && bWidth > 767) {
        return context.font = "300 24px Source Code Pro";
    } else if(bWidth < 767){
        return context.font = "300 21px Source Code Pro";
    } else {
        return context.font = "300 30px Source Code Pro";
    }
}

// Object for information about navigation
var navObj = {};
var pageClass = selAll('.page');

// Generates navigation object and adds her in DOM
for (var i = 0; i < pageClass.length; i++) {
    navObj[i] = {
        index : i,
        nav   : pageClass[i].getAttribute("data-nav"),
        col   : pageClass[i].getAttribute("data-nav-color")
    }
    if(navObj[i].index !== 0 ) {
        var navA = document.createElement('a');

        navA.setAttribute('href','#'+navObj[i].nav);
        navA.setAttribute('class','link');
        navA.setAttribute('data-nav-color',navObj[i].col);
        navA.innerHTML = navObj[i].nav;

        sel('#home-nav').appendChild(navA);
    }
}

var navLeng = oLength(navObj); // Numbers of pages

// Check for nav
function ress(n){
    if(n < 0){
        return navLeng-1;
    } else if (n > navLeng-1) {
        return 0;
    } else {
        return n;
    }
}

// Generates rows
function countRow(type,text,color,align,elem){

    var ew = -1;

    // Space between symbols { 1 - no spaces, 2 - spaces };
    var ph = 2;

    st = oLength(so);

    function insertText(){
        ew += 1;
        return text[ew].toUpperCase();
    }

    function symbDelay(){
        var mas = [0,-0.2,-0.4,-0.6,-0.8,-1];
        fy(mas)
        return mas[0];
    }

    // cuts number
    function croop(number) {
        return number > 2 && number < cry_row-(text.length*ph)-2;
    }

    //Return random number from positive(+) or negative(-);
    function getRandomInt(max) {
        return  (Math.floor (Math.random() * (max + 1)) - ( max/2 ))*2;
    }

    // Position element
    function elemPos(imprt,itm,stSp,row){
        if(itm !== undefined){

            if(imprt === true && stSp % 2 !== 0){
                stSp+=1
            }
            itm.style.position = "absolute";
            itm.style.whiteSpace = "nowrap";
            itm.style.top = so[row+stSp].posY-tops+'px';
            itm.style.left = so[row+stSp].posX+'px';
        }
    }

    function posNst(len){
        if(cry_row % 2 == 0){
            return cry_row - len - 3;
        } else {
            return cry_row - len - 2;
        }
    }

    function insertNav(txt){
        ew += 1;
        return txt[ew].toUpperCase();
    }

    function prop(vd){ 
        if(vd === 1){return insertText()}else{return ' '}
    }

    var start_space  = 0, // Start posotion
        end_space    = 0, // End position
        prevNavStart = 0, // Position for nav
        prevNavEnd   = 0, // Position for nav
        nextNavStart = 0, // Position for nav
        nextNavEnd   = 0; // Position for nav

    // Position
    function textSpace(){
        if(align === 'center'){

            if(bWidth < 500){
                start_space = 0;
            } else {
                start_space = Math.floor((cry_row - text.length*ph)/2);
            }

            end_space   = start_space + text.length*ph;
        } else if(align === 'left'){

            if(bWidth < 500){
                start_space = 0;
            } else {
                start_space = 2;
            }

            end_space   = start_space + text.length*ph;

        } else if(align === 'timer'){

            ph = 2;
            // Array for random position
            var strsp = [4,6,8];
            fy(strsp);

            if(bWidth < 500){
                strsp[0] = 2;
            }

            // First row
            if(timePos === 0 ){
                timePos = strsp[0];
            }
            if(timePos > strsp[0]){
                timePos += strsp[0]; 
            }

            start_space = timePos;
            end_space   = start_space + text.length*ph;

        } else if (align === 'random'){
            start_space = Math.floor((cry_row - text.length*ph)/2)+getRandomInt(4);
            // If start_space is negative number
            if(start_space<0){start_space = 0};

            end_space   = start_space + text.length*ph;

        } else if(align === 'title'){
                prevNavStart = 2,
                prevNavEnd   = navObj[ress(current-1)].nav.length+2;

                nextNavStart = posNst(navObj[ress(current+1)].nav.length),
                nextNavEnd   = posNst(0);

                start_space  = Math.floor((cry_row - text.length*ph)/2);
                end_space    = start_space + text.length*ph;

        } else {
            start_space = Math.floor((cry_row - text.length*ph)/2)+getRandomInt(4);
            // If start_space is negative number
            if(start_space<0){start_space = 0};

            end_space   = start_space + text.length*ph;

        }
    }

    switch (type) {

        case 'nav':

            // Position
            textSpace();


            for(var i = 0;i < cry_row;i++){

                if(i % 2 == 0){
                    if(i >= start_space & i < end_space  ) {
                        var trash = insertText();

                        // Check for an empty symbol in the text on a grid
                        if(trash === ' '){
                            so[st+i] = {
                                sumb  : randomString(),
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        } else {
                            so[st+i] = {
                                sumb  : trash,
                                col   : hexToRgb(color),
                                notxt : false,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        }

                    } else {
                        so[st+i] = {
                            sumb  : randomString(),
                            col   : hexToRgb(symCol),
                            notxt : true,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    }
                } else {
                    so[st+i] = {
                        sumb  : ' ',
                        col   : hexToRgb(symCol),
                        notxt : true,
                        row   : Math.floor(st/cry_row),
                        posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                        posX  : lt_space*i,
                        del   : symbDelay()
                    }
                }
                
            }

            elemPos(true,elem,start_space,st);

            break;
        case 'title-nav':

            var ew = -1;

            textSpace();

            if (bWidth < 500) {
                
            } else if(bWidth < 767){
                for(var i = 0;i < cry_row;i++){
                    // Pos for previous nav
                    if(i >= prevNavStart & i < prevNavEnd) {
                        so[st+i] = {
                            sumb  : insertNav(navObj[ress(current-1)].nav),
                            col   : hexToRgb(navObj[ress(current-1)].col),
                            notxt : false,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    } else if ( i >= nextNavStart & i < nextNavEnd ) {
                        if (nextNavStart == i) {
                            ew = -1;
                        }
                        so[st+i] = {
                            sumb  : insertNav(navObj[ress(current+1)].nav),
                            col   : hexToRgb(navObj[ress(current+1)].col),
                            notxt : false,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    } else {
                        if(i % 2 == 0){
                            so[st+i] = {
                                sumb  : randomString(),
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }

                        } else {
                            so[st+i] = {
                                sumb  : ' ',
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        }
                    }
                }

            } else {
                for(var i = 0;i < cry_row;i++){
                    // Pos for previous nav
                    if(i >= prevNavStart & i < prevNavEnd) {
                        so[st+i] = {
                            sumb  : insertNav(navObj[ress(current-1)].nav),
                            col   : hexToRgb(navObj[ress(current-1)].col),
                            notxt : false,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    } else if(i >= start_space & i < end_space ) {
                        if (start_space == i) {
                            ew = -1;
                        }
                        if(i % 2 == 0){
                            so[st+i] = {
                                sumb  : insertText(),
                                col   : hexToRgb(color),
                                notxt : false,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        } else {
                            so[st+i] = {
                                sumb  : ' ',
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        }

                    } else if ( i >= nextNavStart & i < nextNavEnd ) {
                        if (nextNavStart == i) {
                            ew = -1;
                        }
                        so[st+i] = {
                            sumb  : insertNav(navObj[ress(current+1)].nav),
                            col   : hexToRgb(navObj[ress(current+1)].col),
                            notxt : false,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    } else {
                        if(i % 2 == 0){
                            so[st+i] = {
                                sumb  : randomString(),
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }

                        } else {
                            so[st+i] = {
                                sumb  : ' ',
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        }
                    }
                }
                elemPos(true,elem,start_space,st);
            }

            if(bWidth < 500 !== true){
                elemPos(false,sel('#nav-prev'),prevNavStart,st);
                elemPos(false,sel('#nav-next'),nextNavStart,st);
            }

            break;
        case 'title-modal':
            // Determination end
            

            var navClose = posNst(1);
            
            if(bWidth < 500){
                start_space  = 0;
            } else {
                start_space  = Math.floor((cry_row - text.length*ph)/2);
            }

            end_space    = start_space + text.length*ph;

            for(var i = 0;i < cry_row;i++){
                // Pos for previous nav
                if(i >= start_space & i < end_space ) {
                    
                    if(i % 2 == 0){
                        var trash = insertText();
                        if(trash === ' '){
                            so[st+i] = {
                                sumb  : randomString(),
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        } else {
                            so[st+i] = {
                                sumb  : trash,
                                col   : hexToRgb(color),
                                notxt : false,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        }

                    } else {
                        so[st+i] = {
                            sumb  : ' ',
                            col   : hexToRgb(symCol),
                            notxt : true,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    }

                } else if ( i === navClose ) {
                    if (nextNavStart == i) {
                        ew = -1;
                    }
                    so[st+i] = {
                        sumb  : 'X',
                        col   : hexToRgb('#f33'),
                        notxt : false,
                        row   : Math.floor(st/cry_row),
                        posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                        posX  : lt_space*i,
                        del   : symbDelay()
                    }
                } else {
                    if(i % 2 == 0){
                        so[st+i] = {
                            sumb  : randomString(),
                            col   : hexToRgb(symCol),
                            notxt : true,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }

                    } else {
                        so[st+i] = {
                            sumb  : ' ',
                            col   : hexToRgb(symCol),
                            notxt : true,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    }
                }
            }

            elemPos(true,elem,start_space,st);
            elemPos(true,mdlCls,navClose,st);

            break;

        case 'text':
            
            // Space between symbols
            ph = 1;

            textSpace();

            for(var i = 0;i < cry_row;i++){

                if(i % 2 == 0){
                    if(i >= start_space & i < end_space) {
                        var trash = insertText();

                        // Check for an empty symbol in the text on a grid
                        if(trash === ' ' && text.indexOf(-1) && text.indexOf(-2) === 1){
                            so[st+i] = {
                                sumb  : randomString(),
                                col   : hexToRgb(symCol),
                                notxt : true,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        } else {
                            so[st+i] = {
                                sumb  : trash,
                                col   : hexToRgb(color),
                                notxt : false,
                                row   : Math.floor(st/cry_row),
                                posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                                posX  : lt_space*i,
                                del   : symbDelay()
                            }
                        }

                    } else {
                        so[st+i] = {
                            sumb  : randomString(),
                            col   : hexToRgb(symCol),
                            notxt : true,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    }
                } else {
                    if(i >= start_space & i < end_space  ) {
                        so[st+i] = {
                            sumb  : prop(ph),
                            col   : hexToRgb(color),
                            notxt : false,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }

                    } else {
                        so[st+i] = {
                            sumb  : ' ',
                            col   : hexToRgb(symCol),
                            notxt : true,
                            row   : Math.floor(st/cry_row),
                            posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                            posX  : lt_space*i,
                            del   : symbDelay()
                        }
                    }
                }
                
            }
            if(text.indexOf('  ') === 1 || text.indexOf('  ') === 0){
                elemPos(true,elem,start_space,st);
            } else {
                elemPos(false,elem,start_space,st);
            }

            break;

        default:
            for(var i = 0;i < cry_row;i++){

                if(i % 2 == 0){
                    so[st+i] = {
                        sumb  : randomString(),
                        col   : hexToRgb(symCol),
                        notxt : true,
                        row   : Math.floor(st/cry_row),
                        posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                        posX  : lt_space*i,
                        del   : symbDelay()
                    }
                } else {
                    so[st+i] = {
                        sumb : ' ',
                        col  : hexToRgb(symCol),
                        notxt : true,
                        row   : Math.floor(st/cry_row),
                        posY  : ((tops*2)*(Math.floor(st/cry_row)+1)) -tops,
                        posX  : lt_space*i,
                        del   : symbDelay()
                    }
                }
            }

            type = 'default';
    }

    // Info for row
    rwLth[sr] = {
        row     : sr,
        type    : type,
        strRow  : oLength(so)-cry_row,
        endRow  : oLength(so)-1
    }
    sr += 1;
}

window.devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;

var devPix = window.devicePixelRatio.toFixed(1);

// Core ))
function draw(status){

    // Size area

    canvas.width = (lt_space * cry_row) * devPix;    
    canvas.height = ((sr*(tops*2))*devPix)-(tops-1);
    context.scale(devPix, devPix);

    if(bWidth < 767 || devPix>=1){
        canvas.style.maxWidth = canvas.width/devPix+'px';
    }

    var objLength = oLength(so);

    // array number of characters 
    var arr = numberArray(objLength-1);

    arr[arr.length] = 0;

    var cHe = window.innerHeight - sel('header').clientHeight - sel('footer').clientHeight;

    MAIN.style.height = cHe+'px';

    sel('main .container').style.height     = cHe+'px';
    sel('main .container').style.overflow   = 'hidden';
    sel('main .container').style.overflowY  = 'auto';

    // Padding and size grid
    fontSize();

    context.textAlign = "left";

    var s = 0;
    
    if (status == 'start') {
        var r = 0;
        var setTest;

        MAIN.style.top = (cHe-(canvas.height/devPix))/2+'px';

        setTest = setInterval(function(){
            if(r >= (oLimit + 1)){
                clearInterval(setTest)
            } else{
                if(chkStp == false){
                    context.clearRect(0,0,canvas.width,canvas.height);

                    for(var index=0;index < objLength;index++){
                        if(so[arr[index]].sumb !== ' '){
                            context.fillStyle = "rgba("+so[arr[index]].col+",1)";
                            if (so[arr[index]].notxt === false) {
                                context.globalAlpha = symbolDelay(so[arr[index]].del+r,oLimit)*2;
                            } else {
                                context.globalAlpha = symbolDelay(so[arr[index]].del+r,oLimit);
                            }
                            context.fillText(so[arr[index]].sumb, so[arr[index]].posX, so[arr[index]].posY);
                        }
                    }
                    r += 0.03;
                } else {
                    clearInterval(setTest)
                }
            }
        },17)
        
    } else if(status == 'destroy') {

        var r = 1+oLimit;
        var setTest;

        chkStp = true;

        (function ll(){
            if(r <= 0){
                cancelAnimationFrame(setTest);
            } else{
                if(chkStp == true){
                    setTest = requestAnimationFrame(ll);
                    context.clearRect(0,0,canvas.width,canvas.height);
                    for(var index=0;index < objLength;index++){
                        if(so[arr[index]].sumb !== ' '){
                            context.fillStyle = "rgba("+so[arr[index]].col+",1)"; 
                            if (so[arr[index]].notxt === false) {
                                context.globalAlpha = symbolDelay((r-1)-so[arr[index]].del,oLimit)*2;
                            } else {
                                context.globalAlpha = symbolDelay((r-1)-so[arr[index]].del,oLimit);
                            }
                            context.fillText(so[arr[index]].sumb, so[arr[index]].posX, so[arr[index]].posY);
                        }
                    }

                    r -= 0.05;
                } else {
                    cancelAnimationFrame(setTest);
                }
            }
        }())


        setTimeout(function(){
            so    = {};
            st    = 0;
            sr    = 0;
            chkStp = false;

            canvas.width = 0;
            canvas.height = 0;

            arr = [];
            cHe = 0;
        },1000);
    }
}

var startLoop,
    soLoop,
    canvasLooper,
    generalStart;

var mas = []; // Future array of strings to be where the symbols will light up

var checkStopFade = false; // Check stop lighting
var check = 0;             // Check old setTimeout and setInterval


// Lighting random number of characters in the blank line
function looper(status){

    if(status == 'start'){

        check++;

        checkStopFade = false;

        var maxViews = 0;

        mas = [];

        // Strings are suitable
        if(enRow % 2 !== 0){
            for (var i=oLength(rwLth)-1; i >= 0; i -= 2 ) {
                if(rwLth[i].type == 'default'){
                    mas.push(rwLth[i].row);
                }
            }
        } else {
            for (var i=oLength(rwLth)-2; i >= 0; i -= 2 ) {
                if(rwLth[i].type == 'default'){
                    mas.push(rwLth[i].row);
                }
            }
        }

        // Mix
        fy(mas);

        var masLeng = mas.length;

        // Max symbols
        maxViews = Math.floor(cry_row/3);


        function loop(el) {

            var randomLight = [2500,3000,3500,4000,4500,5000,5500,6000,6500];
            fy(randomLight);

            maxViews = Math.floor(cry_row/3);

            var countLoop = check;

            startLoop = setTimeout(function() {

                if (countLoop === check) {

                    if (checkStopFade === false) {

                        var strRow  = rwLth[mas[el]].strRow,    // Start position in row
                            endRow  = rwLth[mas[el]].endRow,    // End position in row
                            mView   = numberArray(maxViews*2),  // The array to determine the number of educated symbols
                            strView = [];                       // Future array which will be written character positions for lighting

                        // crutch )))
                        for(var i = 0; i <= 6; i++){
                           mView[i] = 6;
                        }

                        // Mixed to determine the number of characters lighting
                        fy(mView);

                        // Adding a finger position from which the character may start lighting
                        for (var i = strRow; i < endRow-mView[0]; i+=2) {
                            strView.push(i);
                        }

                        // Mixed to determine the position of which will start lighting
                        fy(strView);

                        // Opacity
                        var r = oLimit;

                        var setLoop;

                        (function fader(){

                            if(chkStp == false){
                                setLoop = requestAnimationFrame(fader);

                                if(r < 1){
                                    r += 0.005;

                                    // strView[0] - Position symbol which will begin redrawing
                                    // mView[0]   - The number of characters to be redrawn

                                    for (var i = strView[0]; i < strView[0]+mView[0]; i++) {
                                        context.fillStyle = "#666666";
                                        context.globalAlpha = r.toFixed(2);
                                        context.clearRect(so[i].posX,so[i].posY-tops,lt_space+1,lt_space+tops);
                                        context.fillText(so[i].sumb, so[i].posX, so[i].posY);
                                    }

                                } else {
                                    // A small delay for attenuation
                                    var canvasLooper = setTimeout(function(){

                                        // Check
                                        if (checkStopFade === false) {

                                            // Initial transparency for attenuation
                                            var r = 1;
                                            
                                            var setTest;
                                            (function ll(){
                                                if(chkStp == false){
                                                    setTest = requestAnimationFrame(ll);
                                                    if(r > 0.5){
                                                        r -= 0.005;

                                                        for (var i = strView[0]; i < strView[0]+mView[0]; i++) {
                                                            context.fillStyle = "#666666";
                                                            context.globalAlpha = r.toFixed(2);
                                                            context.clearRect(so[i].posX,so[i].posY-tops,lt_space+1,lt_space+tops);
                                                            context.fillText(so[i].sumb, so[i].posX, so[i].posY);
                                                        }
                                                    } else {

                                                        strRow  = 0;
                                                        endRow  = 0;
                                                        mView   = 0;
                                                        strView = [];

                                                        cancelAnimationFrame(setTest);
                                                    }

                                                } else {
                                                    cancelAnimationFrame(setTest);
                                                }
                                            }())

                                        } else {
                                            clearTimeout(canvasLooper);
                                        }

                                    }, 1200);

                                    if (checkStopFade === false) {
                                        soLoop = setTimeout(function(){
                                            loop(el);
                                        },randomLight[0]);
                                    }
                                    

                                    cancelAnimationFrame(setLoop);
                                }
                            } else {
                                cancelAnimationFrame(setLoop);
                            }

                        }());

                    } else {
                        clearTimeout(startLoop);
                    }
                } else {
                    clearTimeout(startLoop);
                }
            },randomLight[0])
        }

        //First Start
        generalStart = setTimeout(function(){
            checkStopFade = false;
            for (var i = mas.length-1; i >= 0; --i) {
                loop(i);
            }
        },1200);

    } else if(status == 'stop'){
        checkStopFade = true;

        clearTimeout(startLoop);
        clearTimeout(soLoop);
        clearTimeout(canvasLooper);
        clearTimeout(generalStart);
        
        mas    = [];
        rwLth  = {};
    }
}

function crooper(type,text,color,align,elem,pw,cryrow){

    // Якщо кількість символів більша за кілкість символив в рядку
    if(text.length*pw >= cryrow) {

        var trow = 0;                    // Кількість рядків
        var textSeparate = [''];         // Масив для запису рядків
        var textSplit = text.split(' '); // Розбиваєм текст на елементи масива

        for (var a=0; a<textSplit.length; a++) {
            // Якщо рядок не буде вміщати ще одне слово то створюєм новий елемент в textSeparate
            if ((textSeparate[trow] +' '+ textSplit[a] +' '+textSplit[a+1]).length*pw >= cryrow && textSplit[a+1] !== undefined) {
                trow += 1;
                textSeparate[trow] = '';
                
                if(textSplit[a+1] !== undefined){
                    textSeparate[trow] += textSplit[a] +' '+ textSplit[a+1];
                    a++;
                } else {
                    textSeparate[trow] += textSplit[a];
                }
                
            } else if(textSeparate[0].length === 0 ) {
                textSeparate[trow] += textSplit[a];
            } else {
                if(textSplit[a+1] === undefined){
                    trow += 1;
                    textSeparate[trow] = '';
                    textSeparate[trow] += textSplit[a];
                } else {
                    textSeparate[trow] += ' '+textSplit[a];
                }
            }
        }

        for (var q=0; q<textSeparate.length; q++) {
            if(q === 0){

                countRow(type,textSeparate[q],color,'center',elem);
                // Запис оргінального html
                orginal[oLength(orginal)] = {
                    elem : elem,
                    html : elem.innerHTML
                };

                if(bWidth < 767){
                    elem.style.lineHeight = (tops*2)+'px';
                } else {
                    elem.style.lineHeight = (tops*2)-cof+'px';
                }

                // elem.style.textAlign  = 'center';
                elem.innerHTML = '<div>'+textSeparate[q]+'</div>';

            } else {
                if(type === 'title-modal'){
                    type = 'nav';
                };
                countRow(type,textSeparate[q],color,'center');
                elem.innerHTML += '<div>'+textSeparate[q]+'</div>';
            }
        }

    } else {
        countRow(type,text,color,align,elem);
    }
}

function pages(index,id) {

    timePos = 0;            // Reset timer elements
    mdlCls.innerHTML  = ''; // Reset button

    // Recovery modified HTML
    for (var i=0;i<oLength(orginal);i++) {
        orginal[i].elem.innerHTML = orginal[i].html;

        if(i+1 == oLength(orginal)){orginal = {}}
    }

    var cHe = window.innerHeight - sel('header').clientHeight - sel('footer').clientHeight;

    // Pages
    if(id !== undefined ){
        var el = getChildren( sel(id) );   
    } else {
        var el = getChildren( pageClass[index] );
    }

    if (current == 0) {
        var ix      = 0,
            it      = 0,
            contEl  = {},  // For text
            timerEl = {};  // For timer.
    }

    if (current !== 0 && bWidth < 500 !== true) {
        navPrev.innerHTML = navObj[ress(current-1)].nav;
        navNext.innerHTML = navObj[ress(current+1)].nav;
    }

    // Bust elements used and the formation of the row
    for (var i = 0; i < el.length; i++) {

        if (el[i].getAttribute("data-type") === 'text' || el[i].getAttribute("data-type") === 'timer') {

            var cry_rowLen = Math.floor(cry_row/2);

            if(el[i].getAttribute("data-type") === 'text'){
                cry_rowLen = cry_row;

                // Space between symbols
                el[i].style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+0.1+'px';
                if (bWidth < 991) {
                    el[i].style.letterSpacing = sel('#wrapper').style.letterSpacing.replace('px','')-lt_space+'px';
                }
            }
            
            var stTr  = el[i].textContent.split(/\n/g),
                elTr = ['']; // Array all row
            var mrow = 0;

            for (var t=0; t < stTr.length; t++){
                if( elTr[0].length === 0) {
                    elTr[mrow]=''; 
                    elTr[mrow] += stTr[t].replace(rtrims, '');
                } else {
                    mrow += 1;
                    elTr[mrow]=''; 
                    elTr[mrow] += stTr[t].replace(rtrims, '');
                }
            }

            // Check out array for forming an object with strings
            for (var v = 0; v < elTr.length; v++) {
                if(elTr[v] == ''){
                   delete elTr[v]; 
                } else {

                    // If the text string Larger
                    if(elTr[v].length > cry_rowLen-4){

                        var trow = 0;                       // Number of rows
                        var textSeparate = [''];            // Array for row
                        var textSplit = elTr[v].split(' '); // Divide into

                        for (var a=0; a<textSplit.length; a++) {

                            // If the string will contain one more word then create a new row
                            if ((textSeparate[trow] +' '+ textSplit[a]).length > cry_rowLen-4) {
                                trow += 1;
                                textSeparate[trow] = '';
                                textSeparate[trow] += textSplit[a];
                            } else if(textSeparate[0].length === 0 ) {
                                textSeparate[trow] += textSplit[a];
                            } else {
                                textSeparate[trow] += ' '+textSplit[a];
                            }
                        }

                        for (var q=0; q<textSeparate.length; q++) {
                            if(el[i].getAttribute("data-type") === 'timer'){

                                if(q === 0){

                                    orginal[oLength(orginal)] = {
                                        elem : getChildren(el[i])[v],
                                        html : getChildren(el[i])[v].innerHTML
                                    }
                                    getChildren(el[i])[v].innerHTML = ''
                                }
                                var nodeEl = document.createElement('div');
                                    nodeEl.innerHTML = textSeparate[q];

                                getChildren(el[i])[v].appendChild(nodeEl);

                                timerEl[it++] = {
                                    text  : textSeparate[q],
                                    align : 'left',
                                    elem  : nodeEl
                                }

                            } else {
                                if(q === 0){
                                    orginal[oLength(orginal)] = {
                                        elem : el[i],
                                        html : el[i].innerHTML
                                    }
                                    el[i].innerHTML = ''
                                }
                                var nodeEl = document.createElement('div');
                                    nodeEl.innerHTML = textSeparate[q];

                                el[i].appendChild(nodeEl);

                                countRow('text',textSeparate[q],"#fff",'center',nodeEl);
                            }
                        }
                    } else {
                        if(el[i].getAttribute("data-type") === 'timer'){

                            timerEl[it++] = {
                                text : elTr[v],
                                align : 'timer',
                                elem : getChildren(el[i])[v]
                            }

                        } else {
                            if(v === 0){
                                orginal[oLength(orginal)] = {
                                    elem : el[i],
                                    html : el[i].innerHTML
                                }
                                el[i].innerHTML = ''
                            }

                            var nodeEl = document.createElement('div');
                                nodeEl.innerHTML = elTr[v];

                            el[i].appendChild(nodeEl);

                            countRow('text',elTr[v],"#fff",'center',nodeEl);
                        }
                    }
                }
                if(el[i].getAttribute("data-type") !== 'timer' && v+1 == elTr.length){
                    countRow();
                }
            }
        } else if(el[i].getAttribute("data-type") === 'nav'){

            var elLen = el[i].childElementCount;

            if(elLen !== 0){
               for (var t=0; t < elLen; t++) {
                    contEl[ix++] = {
                        text : el[i].children[t].textContent,
                        col  : el[i].children[t].getAttribute("data-nav-color"),
                        elem : el[i].children[t]
                    }
                    
               }
            }
        } else if(el[i].getAttribute("data-type") === 'link'){

        
            crooper(
                'nav',
                el[i].children[0].textContent,
                el[i].children[0].getAttribute("data-nav-color"),
                'random',
                el[i].children[0],
                2,
                cry_row
            );
            

            countRow();
        } else if(el[i].getAttribute("data-type") === 'title-modal'){
            
            if(bWidth < 500){
                crooper(
                    'title-modal',
                    el[i].textContent.replace(rtrims, ''),
                    sel(id).getAttribute("data-nav-color"),
                    'left',
                    el[i],
                    2,
                    cry_row
                );
            } else {
                crooper(
                    'title-modal',
                    el[i].textContent.replace(rtrims, ''),
                    sel(id).getAttribute("data-nav-color"),
                    'center',
                    el[i],
                    2,
                    cry_row
                );

            }
            countRow();

            navPrev.innerHTML = '';
            navNext.innerHTML = '';
            mdlCls.innerHTML  = 'X';

        } else if(el[i].getAttribute("data-type") === 'form'){
            var elf = getChildren(el[i]);



            for (var t=0;t<elf.length; t++) {

                var elr = getChildren(elf[t])[0];

                if(elf[t].getAttribute('data-type') !== 'hide'){
                    


                    if(elr.getAttribute('type') === 'button' || elr.getAttribute('type') === 'submit'){
                        if(elr.nodeName != 'BUTTON'){
                            countRow('text',elr.getAttribute('value'),elr.getAttribute("data-color"),'random',elr);
                            countRow();
                        } else {
                            countRow('text',elr.innerHTML,elr.getAttribute("data-color"),'random',elr);
                            countRow();
                        }
                    } else {

                        if(elr.getAttribute('placeholder') !== null){
                            var inputStr = elr.getAttribute('placeholder'),
                                placeLen = inputStr.length;

                            for (var v=0;v<Math.floor(elr.offsetWidth/lt_space)-placeLen;v++) {
                                inputStr += ' ';
                            }
                            countRow('text',inputStr,'#f30','left',elr);
                            countRow();
                        } else {

                            var inputStr = '';
                            for (var v=0;v<Math.floor(elr.offsetWidth/lt_space);v++) {
                                inputStr += ' ';
                            }
                            if(inputStr.length % 2 !== 0){
                                inputStr = inputStr.slice(0,-1);
                            }

                            countRow('text',inputStr,'#fff','center',elr);
                            countRow();
                        }
                    }
                }
            }
        } else if(el[i].getAttribute("data-type") === 'title'){
            
            if(bWidth > 767){
                countRow('title-nav',el[i].innerHTML.replace(rtrims, ''),pageClass[index].getAttribute('data-nav-color'),'title',el[i]);
            }
            if(bWidth < 500){
                countRow('nav',el[i].innerHTML.replace(rtrims, ''),pageClass[index].getAttribute('data-nav-color'),'left',el[i]);
            }
            if (bWidth < 767 && bWidth > 500) {
                countRow('title-nav',el[i].innerHTML.replace(rtrims, ''),pageClass[index].getAttribute('data-nav-color'),'title',el[i]);
                countRow('nav',el[i].innerHTML.replace(rtrims, ''),pageClass[index].getAttribute('data-nav-color'),'center',el[i]); 
            }

            countRow();
        }
    }

    // Add map class
    if(activeEl.getAttribute('data-map') !== null){
        removeClass(BODY,'map-bg');
        addClass(BODY,'map-bg');
    } else {
        removeClass(BODY,'map-bg');
    }

    var addRow = Math.floor((cHe/(tops*2)))-oLength(rwLth);

    // Adding to empty blocks
    if(current !== 0 || id !== undefined){
        if(addRow !== 0){
            for (var i=0;i<addRow;i++) {
                countRow();
            }
        }
    }
    if (current === 0 && id === undefined) {

        var contElen  = oLength(contEl),
            timerElen = oLength(timerEl);

        addRow = Math.floor((cHe/(tops*2))) -contElen - timerElen;

        var addRowCount = addRow,           
            tRow        = contElen + 1 - 1, // Count elements
            frRow,                          // top 
            inRow;                          // middle
            enRow = 0;                      // bottom

        function frRows(num){
            if(num/2 < 1 || num === 1){
                return 0;
            } else {
                return Math.floor(num/2);
            }
        }
        function enRows(num){
            if(num === 1){
                return 1;
            } else if(num/2 < 1){
                return 1;
            } else {
                return Math.floor(num/2);
            }
        }
            
        if(addRow <= tRow){ // If lines that can be added to canvas less than the number of elements
            frRow = 0;
            enRow = 1;
            inRow = 1;
        } else {

            var b;
            inRow = Math.floor((addRow)/tRow);  // Count symbols between link and timer
            b = inRow * tRow;

            addRowCount -= b;

            var frRowBeta = frRows(addRowCount);

            (function rowLevel(){
                if(frRowBeta*2 <= inRow && inRow > 1){
                    inRow -= 1;
                    addRowCount += tRow;
                    frRowBeta = frRows(addRowCount)
                    rowLevel()
                }
            })();

            frRow = frRows(addRowCount);
            enRow = enRows(addRowCount);

            if(frRow + enRow < addRowCount){
                enRow +=1;
            }

        }

        (function homePos(){
            for (var t=0;t<frRow;t++) {
                countRow();
            }
            for (var t=0;t<timerElen;t++) {
                countRow('nav',timerEl[t].text,'#fff',timerEl[t].align,timerEl[t].elem);
            }
            for (var t=0;t<inRow;t++) {
                countRow();
            }
            for (var t=0;t<contElen;t++) {

                if(contEl[t].text.length*2 >= cry_row) {
                    var trow = 0;                       // Amount row
                    var textSeparate = [''];            // Array for row
                    var textSplit = contEl[t].text.split(' '); // Divide into

                    for (var a=0; a<textSplit.length; a++) {
                        if ((textSeparate[trow] +' '+ textSplit[a]).length*2 >= cry_row) {
                            trow += 1;
                            textSeparate[trow] = '';
                            textSeparate[trow] += textSplit[a];
                        } else if(textSeparate[0].length === 0 ) {
                            textSeparate[trow] += textSplit[a];
                        } else {
                            textSeparate[trow] += ' '+textSplit[a];
                        }
                    }

                    for (var q=0; q<textSeparate.length; q++) {
                        if(q === 0){
                            countRow('nav',textSeparate[q],contEl[t].col,'left',contEl[t].elem);
                            orginal[oLength(orginal)] = {
                                elem : contEl[t].elem,
                                html : contEl[t].elem.innerHTML
                            }

                            contEl[t].elem.style.lineHeight = (tops*2)-cof+'px';
                            contEl[t].elem.innerHTML = '<div>'+textSeparate[q]+'</div>';
                        } else {
                            countRow('nav',textSeparate[q],contEl[t].col,'left');
                            contEl[t].elem.innerHTML += '<div>'+textSeparate[q]+'</div>';
                        }
                    }

                } else {
                    countRow('nav',contEl[t].text,contEl[t].col,'random',contEl[t].elem);
                }

                if (t+1 !== contElen ) {
                    for (var v=0;v<inRow;v++) {
                        countRow();
                    }
                }
            }
            for (var t=0;t<enRow;t++) {
                countRow();
            }
        })();

        navPrev.innerHTML = '';
        navNext.innerHTML = '';
    }
}

var current = 0;   // Active section
var activeEl = pageClass[current];

var crypt0 = function(){

    current = 0;
    pages(current);

    activeEl = pageClass[current];
    addClass(activeEl,'active');

    draw('start');
    looper('start');

    crypt0.end();
};

crypt0.next = function(){
    if(chkStp == false){
        looper('stop');
        draw('destroy');
        current++
        if(current > navLeng-1){current = 0};

        removeClass(activeEl,'active');
        activeEl = pageClass[current];

        setTimeout(function(){
            addClass(activeEl,'active');
            pages(current);
            draw('start');
            looper('start');
            crypt0.end();
        },1001);
    }
};
crypt0.prev = function(){
    if(chkStp == false){
        looper('stop');
        draw('destroy');

        current--
        if(current < 0){current = navLeng-1};

        removeClass(activeEl,'active');
        activeEl = pageClass[current];

        setTimeout(function(){
            addClass(activeEl,'active');
            pages(current);
            draw('start');
            looper('start');
            crypt0.end();
        },1001);
    }
};

crypt0.link = function(){
    if(chkStp == false){
        looper('stop');
        draw('destroy');

        link = this.getAttribute('href');
        window.location.hash = '';

        removeClass(activeEl,'active');
        activeEl = sel(link);

        // Search in object id element
        for (var i=0;i<oLength(navObj);i++) {
            if('#'+navObj[i].nav === link){
                current = navObj[i].index;
                link = undefined;
                activeEl = pageClass[current];
            }
        }
        setTimeout(function(){
            addClass(activeEl,'active');
            pages(current,link);
            draw('start');
            looper('start');
            crypt0.end();
            window.location.hash = '';
        },1001);
        window.location.hash = '';
    }
}
crypt0.to = function(to){
    if(chkStp == false){
        link = undefined;
        looper('stop');
        draw('destroy');
        current = to;

        removeClass(activeEl,'active');
        activeEl = pageClass[current];

        setTimeout(function(){
            addClass(activeEl,'active');
            pages(current);

            draw('start');
            looper('start');
            crypt0.end();
        },1001);
    }
}

crypt0.hardDestroy = function (){
    so    = {};
    st    = 0;
    sr    = 0;

    canvas.width = 0;
    canvas.height = 0;
}

crypt0.end = function(){

    sel('#notify .cmd').style.position = 'absolute';
    sel('#notify .cmd').style.top = sel('#notify input').style.top;

    if(mobile === true){
        sel('#notify input').style.transform       = 'translateX(-200%)';
        sel('#notify input').style.webkitTransform = 'translateX(-200%)';
    }

    sel('#notify input').style.msTransform = 'translateX(-200%)';

    var NotyInptLen = Math.round(sel('#notify input').style.left.replace('px','')/lt_space);
    var NotyInptWid = Math.round(sel('#notify input').offsetWidth/lt_space);

    if(NotyInptWid !== 0 && bWidth > 767 && mobile === false){
        $('#notify input').focus();
    }

    if(NotyInptWid % 2 !== 0){
        NotyInptWid--;
    }

    sel('#notify .cmd').style.left = NotyInptLen*lt_space+'px';
    sel('#notify .cmd').style.width = (NotyInptWid*lt_space)-lt_space+'px';

    var inpt = selAll('.form-input');

    for (var i=1; i <= inpt.length; i++) {

        var elem   = sel('.form-input:nth-child('+i+') .cmd');
        var plpt = sel('.form-input:nth-child('+i+') input');

        if(mobile === true){
            plpt.style.transform       = 'translateX(-200%)';
            plpt.style.webkitTransform = 'translateX(-200%)';
        }
        plpt.style.msTransform = 'translateX(-200%)';

        elem.style.position = 'absolute';
        elem.style.top = plpt.style.top;

        var finLen = Math.round(plpt.style.left.replace('px','')/lt_space);

        if(finLen % 2 !== 0){
            finLen++;
        }

        var holdLen = plpt.getAttribute('placeholder').length;

        var elemWidth = Math.round(plpt.offsetWidth/lt_space) - holdLen;

        var elemLeft  = finLen+holdLen;

        if(elemLeft % 2 !== 0){
            elemLeft++;
        }

        if(elemWidth+elemLeft % 2 !== 0){
            elemWidth--;
        }

        if(elemWidth > 1 && i === 1 && bWidth > 767 && mobile === false){
            setTimeout(function(){
                $('.form-input:nth-child(1) input').focus();
            },0)
        }

        elem.style.left = (elemLeft)*lt_space+'px';
        elem.style.width = (elemWidth * lt_space)-lt_space+'px';
    }

    if(MAIN.style.height.replace('px','') < canvas.height){

        MAIN.style.top = '0px';

        if(mobile === false){
            $('main .container').mCustomScrollbar({
                axis            :"y",
                scrollInertia   : 150
            });
        };

    };
};


// Incoming text
function writeText(el){
    var fltxt = el.innerHTML;
    var cacheText = '';
    var countText = 0;
    var cacheTextInterval = 0;

    el.innerHTML = '';

    cacheTextInterval = setInterval(function(){

        cacheText += fltxt[countText];
        el.innerHTML = cacheText;
        countText++

        if(countText === fltxt.length){
            clearInterval(cacheTextInterval);
        }
    },140)
}

//Google Map
var map;

var map_lon = document.querySelector(".map-canvas").getAttribute("data-map-lon");  // Longitude
var map_lat = document.querySelector(".map-canvas").getAttribute("data-map-lat");  // Latitude

if(map_lon==undefined){map_lon = 40.707476}
if(map_lat==undefined){map_lat = -74.013670}

function initialize() { 

    // coordinate
    var myLatlng = new google.maps.LatLng(map_lon, map_lat);

    var mapOptions = {
        zoom: 8,
        draggable: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        center: myLatlng
    };

    var map = new google.maps.Map(document.getElementsByClassName('map-canvas')[0],mapOptions);
}

var $ = jQuery;

$(window).resize(initialize);

$(document).ready(function(){
    initialize();
})


window.onload = function () {
    countdown('.countdown');

    if(bWidth < 500){
        setTimeout(function(){
            removeClass(BODY,'preloader');
            addClass(BODY,'load');
            crypt0();
            writeText(sel('.follow-name'));
            writeText(sel('.copyright'));
        },2500);

    } else {
        removeClass(BODY,'preloader');
        addClass(BODY,'load');
        crypt0();
        writeText(sel('.follow-name'));
        writeText(sel('.copyright'));
    }

    navPrev.onclick = function(){
        crypt0.prev();
        return false;
    }
    navNext.onclick = function(){
        crypt0.next();
        return false;
    }
    mdlCls.onclick = function(){
        crypt0.to(0);
        return false;
    }
    selAll('.logo img')[0].onclick = function(){
        crypt0.to(0);
        return false;
    }
    
    for (var i = 0; i < selAll('.link').length; i++) {
        selAll('.link')[i].addEventListener('click',crypt0.link,true);
    }

}

var resFlag = 0;

window.onresize = function() {

    (function resizeCanvas(){
        chkStp = true;

        resFlag+=1;
        var countLoop = resFlag;

        var resizeDestroy = setTimeout(function(){
            if(countLoop === resFlag){

                looper('stop');
                crypt0.hardDestroy();

            } else {
                clearTimeout(resizeDestroy);
            }
        },100);


        var resizeTimeOut = setTimeout(function(){
            if (countLoop === resFlag) {
                setTimeout(function(){
                    canvaSize();
                    chkStp = false;

                    link !== undefined ? pages(current,link) : pages(current);
                    
                    draw('start');
                    looper('start');
                    crypt0.end();
                },200)
            } else {
                clearTimeout(resizeTimeOut);
            }
        },1001);
        
    })();

};

function backgroundSlider() {
    var slider = $('.background-slider');
    
    if (slider.length) {
        var autoplayTimeout = 2000,
                animateIn       = 'fadeIn',
                animateOut      = 'fadeOut';
        
        if (slider.data('animateIn')) {
            animateIn = slider.data('animateIn');
        }
        
        if (slider.data('animateOut')) {
            animateOut = slider.data('animateOut');
        }
        
        if (slider.data('timeout')) {
            autoplayTimeout = slider.data('timeout');
        }
        
        slider.owlCarousel({
            animateIn       : animateIn,
            animateOut      : animateOut,
            items           : 1,
            loop            : true,
            autoplay        : true,
            autoplayTimeout : autoplayTimeout
        });
    }
}