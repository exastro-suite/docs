// JavaScript Document

// requestAnimationFrame and cancelAnimationFrame
var requestId,
    requestAnimFrame,
    cancelAnimFrame;
window.requestAnimFrame = ( function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
})();
window.cancelAnimFrame = ( function() {
    return window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozcancelAnimationFrame || window.webkitcancelAnimationFrame || window.mscancelAnimationFrame;
})();

$('html').addClass('loadStart');
$( window ).on('load', function(){

    var loadCompleatDelay = 100,
        loadCompleatWait = 350,
        canvasFadeAnimationTime = 300;

    setTimeout(function(){
      
      $('html, body').scrollTop( 0 );
      $('html').addClass('loadCompleat');
      
      setTimeout(function(){
      
        $('html').removeClass('loadStart').addClass('loadEnd');
        $('#loading').remove();

        var $canvas = $('#backgroundCanvas'),
            $window = $( window ),
            areaSize;
        var headerWidth,
            headerHeight,
            currentWidth = $window.innerWidth();

        // resize canvas
        var resizeCanvas = function() {

            headerWidth = $window.innerWidth();
            headerHeight = $window.innerHeight();
            areaSize = headerWidth * headerHeight / 2000;
            $('#startArea').css('height', headerHeight );
            // IEで画像のサイズの取得がおかしい時の対策
            $('#startLogo').find('img').css('height', 'auto');
            $('#startLogo').find('img').css('height', '100%');
            $canvas.attr({'width': headerWidth, 'height': headerHeight });

        }
        var resizeAndMore = function() {

          $('#andMore').find('.text').css('height', $('#andMore').find('.image').height() );

        }
        var timer = false;    
        $window.resize( function() {
            if ( currentWidth == $window.innerWidth() && $window.innerWidth() < 640 ) {
                return;
            }
            if ( timer !== false ) {
                clearTimeout( timer );
            }
            timer = setTimeout( function(){
                $canvas.fadeOut( canvasFadeAnimationTime, function(){
                    cancelAnimFrame( requestId );
                    resizeCanvas();
                    resizeAndMore();
                    starAnimation( areaSize );
                    $( this ).fadeIn( canvasFadeAnimationTime );
                    currentWidth = $window.innerWidth();
                });
            }, 500 );
        });

        // Header Menu
        var scrollCheck = function(){
            var windowScrollTop = $( this ).scrollTop();

            if ( windowScrollTop > headerHeight / 2 ){
                $('header').css('transform', 'translateY(0)' );
            } else {
                $('header').css('transform', 'translateY(-80px)' );
                $('#suiteList').fadeOut( canvasFadeAnimationTime );
            }
            if ( windowScrollTop < headerHeight ){
              //var opacityNum = ( 1 - ( windowScrollTop / headerHeight ) ).toFixed( 5 );
              $('#topMove').css('transform', 'translateY(8px)' );
              //$('#startArea,#backgroundFull').css('opacity', opacityNum );
              $('canvas').show();
            } else {
              $('#topMove').css('transform', 'translateY(-72px)' );
              $('canvas').hide();
            }
        }
        $window.scroll( function(){
            scrollCheck();
        });

        // Initialized
        resizeCanvas();
        resizeAndMore();
        starAnimation( areaSize );
        scrollCheck();
        
      }, loadCompleatWait );      
    }, loadCompleatDelay );
    
});

$(function(){
    
    // Add loading
    $('#container').append('<div id="loading"></div>');  
  
});



function starAnimation( areaSize ) {

    var Particle = function( scale, color, speed, opacity ) {
        this.scale = scale;
        this.color = color;
        this.speed = speed;
        this.opacity = opacity;
        this.position = { x: 0, y: 0 };
    };
    Particle.prototype.draw = function() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc( this.position.x, this.position.y, this.scale, 0, 2 * Math.PI, false );
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    // Canvas 
    var canvas = document.querySelector('#backgroundCanvas');
    var ctx = canvas.getContext('2d');

    // Particles
    var density = areaSize;
    var particles = [];

    for (var i = 0; i < density; i++ ) {
        var scale = ~~( Math.random() * 10 + 1 ),
            speed = ~~( Math.random() * 100 + 1 ),
            opacity = ~~( Math.random() * 10 + 1 ),
            colors = ['#FFFFFF', '#FFFFCC', '#FFCCCC'];
        var color = colors[ ~~( Math.random() * 2 ) ];
        particles[i] = new Particle( scale / 10, color, speed / 300, opacity / 10 );
        particles[i].position.x = Math.random() * canvas.width;
        particles[i].position.y = Math.random() * canvas.height;
        particles[i].draw();
    }

    // Animation
    loop();
    function loop() {
        requestId = requestAnimFrame( loop );
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        for (var i=0; i<density; i++) {
            particles[i].position.x += particles[i].speed;
            particles[i].position.y += particles[i].speed / 2;
            particles[i].draw();
            if (particles[i].position.x > canvas.width) particles[i].position.x = -30;
            if (particles[i].position.y > canvas.height) particles[i].position.y = -30;
        }
    }

}
