// JavaScript Document

$(function(){

// Suite List
$('#logo a').on('click', function( e ){
  e.preventDefault();
  $('#suiteList').stop(0,0).fadeToggle( 300 );
});
// 要素外をクリックで消す
$( document ).on('mousedown.suitelist', function( e ){
  if ( $('#suiteList').is(':visible') ) {
      if ( !$( e.target ).closest('#suiteList, #logo a').length ) {
          $('#suiteList').fadeToggle( 300 );
      }
  }
});

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
$('.touch').on({
  'touchstart mouseenter': function(){
      $( this ).addClass('hover');
  },
  'touchend mouseleave': function(){
      $( this ).removeClass('hover');
  }
});

// Anker scroll
$('a[href^="#"]').not('#logo a, .tabMenu a').on({
  'click' : function( e ){
    e.preventDefault();
  },
  'touchstart mousedown': function( e ){
    e.preventDefault();
    
    if ( e.which !== 3 ) {
      var href = $( this ).attr('href'),
          actionType = e.type,
          moveRange = 0;

      if( actionType === 'mousedown' ){
        var startPointX = e.pageX,
            startPointY = e.pageY;
      } else {
        var startPointX = e.originalEvent.touches[0].pageX,
            startPointY = e.originalEvent.touches[0].pageY;
      }

      $( window ).on({
        'touchmove.anker mousemove.anker': function( e ){
          if( actionType === 'mousedown' ){
            var movePointX = e.pageX - startPointX,
                movePointY = e.pageY - startPointY;
          } else {
            var movePointX = e.originalEvent.changedTouches[0].pageX - startPointX,
                movePointY = e.originalEvent.changedTouches[0].pageY - startPointY;
          }
          moveRange = Math.floor( Math.sqrt( Math.pow( movePointX, 2 ) + Math.pow( movePointY, 2 )));
          if( moveRange > 30 ) $( this ).off('touchend.anker mouseup.anker touchmove.anker mousemove.anker');
        },
        'touchend.anker mouseup.anker': function( e ){
          e.preventDefault();
          $( this ).off('touchend.anker mouseup.anker touchmove.anker mousemove.anker');
          var speed = 300,
              target = $ ( href == '#' || href == '' ? 'html' : href ),
              position = target.offset().top;
          $('body, html').animate({ scrollTop : position }, speed, 'swing' );
        }
      });
    }
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

// Toggle Text Area
$('.toggleHeading').on('click', function(){
  $( this ).toggleClass('open');
  $( this ).next('.toggleText').slideToggle( 100 );
});

// Toggle Menu
$('.toggleMenu span').on('click', function(){
  const $this = $( this ),
        $window = $( window );
  let positionTop = $this.offset().top + $this.outerHeight() + 4 - $window.scrollTop(),
      positionLeft = $this.offset().left - $window.scrollLeft();
  
  const change = function(){
    if( $this.find('i').is('.fa-times') ) {
      $this.find('i').removeClass('fa-times').addClass('fa-angle-down');
      $this.next('ul').removeClass('open over').hide();
    } else {
      $this.next('ul').addClass('open').removeClass('over').stop(0,0).slideDown( 50, function(){
        $this.find('i').removeClass('fa-angle-down').addClass('fa-times');
          $( window ).on('scroll.navMenu resize.navMenu', function(){
            $( window ).off('scroll.navMenu resize.navMenu');
            change();
          });
      } );
    }
  }
  change();
  
  // Window size position over check
  if( $window.width() < positionLeft + $this.next('ul').outerWidth() ) $this.next('ul').addClass('over');
  if( positionLeft < 4 ) positionLeft = 4;
  
  $this.next('ul').css({
    'top' : positionTop,
    'left': positionLeft,
  });
  
});

});