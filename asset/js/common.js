// JavaScript Document

$(function(){

// Add overlay
$('#container').append('<div id="overlay"></div>');

// Menu
$('#header').append('<div id="menuBtn" class="touch"><span></span></div>');
$('#menuBtn').on('click', function(){
    if( !$('header').is('.open') ) { 
        $('header').addClass('open');
        $('body').addClass('overlay');
    } else {
        $('header').removeClass('open');
        $('body').removeClass('overlay');
    }
});
$('#overlay').on('touchstart click', function(){
    $('header').removeClass('open');
    $('body').removeClass('overlay');
});

// share menu
$('span.share').on('click', function(){
    $( this ).removeClass('hover');
    $( 'span.language, #languageMenu').removeClass('open');
    if( !$('#shareMenu').is('.open') ) {
        $( 'span.share, #shareMenu').addClass('open');
    } else {
        $( 'span.share, #shareMenu').removeClass('open');
    }
});
// language menu
$('span.language').on('click', function(){
    $( this ).removeClass('hover');
    $( 'span.share, #shareMenu').removeClass('open');
    if( !$('#languageMenu').is('.open') ) {
        $( 'span.language, #languageMenu').addClass('open');
    } else {
        $( 'span.language, #languageMenu').removeClass('open');
    }
});

// Hover and touch
$('.touch').on('touchstart mouseenter', function(){
    $( this ).addClass('hover');
}).on('touchend mouseleave', function(){
    $( this ).removeClass('hover');
});

// Anker scroll
$('a[href^="#"]').not('.tabMenu a').on('touchstart mousedown click', function( e ){
    e.preventDefault();
}).on('touchend mouseup', function( e ){
    e.preventDefault();
    if ( e.which !== 3 ) {
        var speed = 300,
            href = $(this).attr('href');
        var target = $ ( href == '#' || href == '' ? 'html' : href );
        var position = target.offset().top;
        $('body, html').animate({ scrollTop : position }, speed, 'swing' );
    }
});

// Tab Contents
$('.tabContents').each( function(){
    $( this ).find('.tabMenu li:first a').addClass('tabOpen');
    $( this ).find('.tabContent:first').addClass('tabOpen');
});
$('.tabContents .tabMenu a').on('click', function( e ){
    e.preventDefault();
    $( this ).closest('.tabContents').find('.tabOpen').removeClass('tabOpen');
    var openTab = $( this ).attr('href');
    $( this ).addClass('tabOpen');
    $( openTab ).addClass('tabOpen');
});

// Slide Loading
$('div.slideView').on('click', function(){
  var $slideView = $( this ),
      $iframe = $( this ).find('iframe'),
      url = $( this ).attr('data-slide-url');
  
  $slideView.off('click').addClass('loading');
  $iframe.attr('src', url );
  
  $iframe.load( function(){
    $slideView.removeClass('loading').addClass('done');
    $( this ).fadeIn( 300 );
  });
  
});

});