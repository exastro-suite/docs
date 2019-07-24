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

$(function(){
    var $canvas = $('#backgroundCanvas'),
        areaSize;
    var headerWidth,
        headerHeight,
        currentWidth = $( window ).innerWidth();

    // resize canvas
    var resizeCanvas = function() {
    
        headerWidth = $( window ).innerWidth();
        headerHeight = $( window ).innerHeight();
        areaSize = headerWidth * headerHeight / 2000;
        $('#startArea').css('height', headerHeight );
        $canvas.attr({'width': headerWidth, 'height': headerHeight });
    
    }
    var timer = false;    
    $( window ).resize( function() {
        if ( currentWidth == $( window ).innerWidth() && $( window ).innerWidth() < 640 ) {
            return;
        }
        if ( timer !== false ) {
            clearTimeout( timer );
        }
        timer = setTimeout( function(){
            $canvas.fadeOut( 300, function(){
                cancelAnimFrame( requestId );
                resizeCanvas();
                starAnimation( areaSize );
                $( this ).fadeIn( 300 );
                currentWidth = $( window ).innerWidth();
            });
        }, 500 );
    });
    
    // Header Menu
    var scrollCheck = function(){
        var windowScrollTop = $( this ).scrollTop();

        if ( windowScrollTop > headerHeight / 2 ){
            $('header').css('top', 0 );
        } else {
            $('header').css('top', '-80px' );
        }
        if ( windowScrollTop < headerHeight ){
          var opacityNum = ( 1 - ( windowScrollTop / headerHeight ) ).toFixed( 5 );
          $('#topMove').css('bottom', '-64px' );
          $('#startArea,#backgroundFull').css('opacity', opacityNum );
        } else {
          $('#topMove').css('bottom', '8px' );
        }
    }
    $( window ).scroll( function(){
        scrollCheck();
    });
    
    // Initialized
    resizeCanvas();
    starAnimation( areaSize );
    scrollCheck();
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
