// JavaScript Document


// HASH
var locationHash = window.location.hash;
if( locationHash ) window.location.hash = ''; 

// LOAD
$('html').addClass('loadWait');
$( window ).one('load', function(){
  $('html').removeClass('loadWait');
  
  // Anker scroll
  if( locationHash ) {
    window.location.hash = locationHash;
    $('html, body').scrollTop( 0 );
    setTimeout(function(){
      var headerHeight = $('header').outerHeight(),
          scrollPosition = $( locationHash ).offset().top - headerHeight;
      $('html, body').animate({ scrollTop: scrollPosition }, 300, 'swing');
      if( $( locationHash ).is('.toggleHeading') ) {
        setTimeout(function(){
          $( locationHash ).click();
        }, 400 );
      }
    }, 100 );
  }
}).load();

// DOM
$(function(){

// Event default
var enterEvent = ( 'onpointerenter' in window ) ? 'pointerenter' : 'mouseenter',
    leaveEvent = ( 'onpointerleave' in window ) ? 'pointerleave' : 'mouseleave';

// Add overlay
$('#container').append('<div id="overlay"></div>');

// Suite List
$('#logo a').on('click', function( e ){
  e.preventDefault();
  $('#suiteList').stop(0,0).fadeToggle( 300 );
});
$( window ).on('mousedown.suitelist', function( e ){
  if ( $('#suiteList').is(':visible') ) {
      if ( !$( e.target ).closest('#suiteList, #logo a').length ) {
          $('#suiteList').fadeToggle( 300 );
      }
  }
});
// in iframe mousedown
$('iframe').on('load', function () {
  $( this ).contents().on('mousedown.suitelist', function() {
    $('#suiteList').fadeOut( 300 );
  });
});
	
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

// Hover event
$('body').on( enterEvent, '.touch', function(){
  var $this = $( this);
  $this.addClass('hover').on( leaveEvent, function(){
    $this.off( leaveEvent ).removeClass('hover');
  });
});

// Anker scroll
$('a[href^="#"].anker').on('click', function( e ){
  e.preventDefault();
  var href = $( this ).attr('href'),
      headerHeight = $('header').outerHeight(),
      speed = 300,
      target = $( ( href == '#' || href == '' ) ? 'html' : href ),
      position = target.offset().top - headerHeight;
  $('body, html').animate({ scrollTop : position }, speed, 'swing' );
});

// Scroll show element
if( $('.scrollShow').length ){
  var scrollShowTimer = null;
  var scrollShow = function(){
    // Process thin out
    if( scrollShowTimer == undefined ) {
      scrollShowTimer = setTimeout( function(){
        var showVisibleHeight = 0.1; // Visible height to judge.
        var targetPoint = $( this ).height() + $( this ).scrollTop() - ( $( this ).height() * showVisibleHeight );
        $('.scrollShow').each(function(){
          if( targetPoint >= $( this ).offset().top ) {
            $( this ).addClass('show');
          } else {
            $( this ).removeClass('show');
          }
          scrollShowTimer = null;
        });
      }, 100 );
    }
  }
  $( window ).on('scroll', function(){
    scrollShow();
  });
}

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

// ImageBox Close
var closeImageBox = function(){
  var $imageBox = $('#imageBox'),
      $document = $( document );
  $document.off('keydown.closeImg');
  $imageBox.remove();
  $('body').removeClass('imageOpen');
}

// ImageBox Open
$('.loupe').on('click', function(){

  var $this = $( this );
  // Add imageBox
  var imageBox = '<div id="imageBox" data-scale="100"><div class="imageBoxInner">'
      + '<ul class="imageBoxMenu">'
      + '<li><button class="zoomIn touch"><i class="fas fa-plus-circle"></i></button></li>'
      + '<li><div class="scale">100%</div></li>'
      + '<li><button class="zoomOut touch"><i class="fas fa-minus-circle"></i></button></li>'
      + '<li><button class="close touch"><i class="fas fa-times-circle"></i></button></li>'
      + '</ul>'
      + '<div class="image"></div>'
      + '</div></div>';
  
  $('body').addClass('imageOpen');
  
  if( $this.closest('.caseContent').length ){
    $this.closest('.caseContentWrap').after( imageBox );
  } else {
    $('body').append( imageBox );
  }
    
  var imageHTML = $this.find('img').clone(),
      $image = $('#imageBox');
      
  $image.find('.image').html( imageHTML );

  imageHTML.on('load', function(){
  
    var imageBoxWidth = $image.find('img').outerWidth(),
        imageBoxMargin = $image.find('img').css('margin').replace('px','');
    
    var imageBoxSet = function( scale ) {
      var imageBoxScaleWidth = imageBoxWidth * ( scale / 100 ),
          windowWidth = $( window ).width(),
          windowHeight = $( window ).height();

      $image.attr('data-scale', scale );
      $image.find('.scale').text( scale + '%');
      $image.find('img').css('width', imageBoxScaleWidth );
      var imageHeight = $image.find('img').outerHeight();
      
      if( windowWidth <= imageBoxScaleWidth || windowHeight <= imageHeight ) {
        $image
          .scrollLeft( ( imageBoxScaleWidth - windowWidth + ( imageBoxMargin * 2 ) ) / 2 )
          .scrollTop( ( imageHeight - windowHeight + ( imageBoxMargin * 2 ) ) / 2 );
      }
    }

    $image.find('img').css({
      'max-width': 'none',
      'max-height': 'none'
    });
    imageBoxSet( 100 );

    // Zoom in or out
    $('#imageBox').find('button.zoomIn, button.zoomOut').on('click.zoom', function(){
      
      var imageBoxScale = Number( $image.attr('data-scale') );

      if( $( this ).is('.zoomIn') ){
        imageBoxScale = imageBoxScale + 10;
        if( imageBoxScale >= 200 ) imageBoxScale = 200;
      } else {
        imageBoxScale = imageBoxScale - 10;
        if( imageBoxScale <= 20 ) imageBoxScale = 20;
      }
      
      imageBoxSet( imageBoxScale );

    });
    // Close click close
    $('#imageBox').find('button.close, .imageBoxInner').on('click', function(){
      closeImageBox();
    });
    // stopPropagation
    $('#imageBox').find('.imageBoxMenu, img').on('click', function( e ){
      e.stopPropagation();
    });
    // Esc click close
    $( document ).on('keydown.closeImg', function( e ){
      if(e.keyCode === 27 ) {
        closeImageBox();
      }
    });
  });
  
});

// Toggle Text Area
$('.toggleHeading').on('click', function(){
  $( this ).toggleClass('open');
  $( this ).next('.toggleText').slideToggle( 100 );
});

// Toggle Menu
$('.toggleMenu span').on('click', function(){
  var $this = $( this ),
      $window = $( window );
  var positionTop = $this.offset().top + $this.outerHeight() + 4 - $window.scrollTop(),
      positionLeft = $this.offset().left - $window.scrollLeft();
  
  var change = function(){
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


// Case open close
$('#caseList').find('a[href^="#"]').on('click', function( e ){

  e.preventDefault();
  
  var showSpeed = 600;
  
  var $window = $( window ),
      $document = $( document ),
      $body = $('body'),
      $case = $( this ),
      idName = $case.attr('href'),
      $caseContent = $( idName );

  var focusElement = 'a, input, select, textarea, button';
  $( focusElement ).not('.caseContent *').attr('tabindex', -1 );
  
  var caseWidth = $case.width(),
      caseHeight = $case.height(),
      caseLeft = $case.offset().left - $window.scrollLeft(),
      caseTop = $case.offset().top - $window.scrollTop(),
      caseCenterLeft = ( $window.width() / 2 ) - ( caseWidth / 2 ),
      caseCenterTop = $window.height() / 2 - caseHeight / 2;

  $('html, body').delay( showSpeed / 2 ).animate({ scrollTop: $case.offset().top - $('header').outerHeight() - 16 }, showSpeed, 'swing');
  $body.addClass('caseOpen');
  
  $case.closest('li').css('height', $case.closest('li').outerHeight() );
  $caseContent.addClass('show');
  $case.addClass('show').css({
    'position' : 'fixed',
    'width' : caseWidth,
    'height' : caseHeight,
    'left' : caseLeft,
    'top' : caseTop,
    'transition' : 'none'
  }).animate({
    'left' : caseCenterLeft,
    'top' : caseCenterTop
  }, showSpeed / 3, 'linear' );
  
  setTimeout( function(){
    
    // Focus to first element of case modal.
    // $caseContent.find( focusElement ).eq( 0 ).focus();
    
    // Close case modal function.
    var caseClose = function(){
      if( !$body.is('.caseClose') ) {
        $body.addClass('caseClose');
        $case.removeAttr('style');
        setTimeout( function(){
          $case.removeClass('show').focus();
          $case.closest('li').removeAttr('style');
          $caseContent.removeClass('show').find('button').off('click');
          $document.off('keydown.close');
          $body.removeClass('caseOpen caseOpenEnd caseClose');
          $('[tabindex="-1"]').removeAttr('tabindex');
        }, showSpeed );
      }
    }  
    // Cross mark click to close case modal.
    $caseContent.find('.closeButton').on('click', function(){
      if( fullScreenCheck() ){
        toggleFullScreen( $caseContent.find('.sectionInner').get(0) );
      }
      caseClose();
    });
    // Keydown "ESC" to close case modal.
    $document.on('keydown.close', function( e ){
      if(e.keyCode === 27 && !$('.imageOpen').length ) {
        caseClose();
      }
    });
    // Full screen window.
    $caseContent.find('.fullScreenButton').on('click', function(){
      toggleFullScreen( $caseContent.find('.sectionInner').get(0) );
    });
  }, showSpeed );
  
});

// Fullscreen event
document.onfullscreenchange = document.onmozfullscreenchange = document.onwebkitfullscreenchange = document.onmsfullscreenchange = function () {
	if( fullScreenCheck() ){
  $('body').addClass('fullscreen');
  } else {
  $('body').removeClass('fullscreen');
  }
}

});


// Features SVG LINE
function featuresSvgLineDraw() {
  
  $( window ).on('load', function(){

    var $featuresList = $('#featuresList li'),
        $svgArea = $('#svgArea');

    var featuresSvgLine = function() {
      $featuresList.each( function( i ){
        // Path Position
        var $feature = $(this),
            exastroPositionX = 50,
            exastroPositionY = $('#featuresList').outerHeight() / 2,
            thisPositionX = $feature.position().left + 2,
            thisPositionY = $feature.position().top + ( $feature.outerHeight() / 2 );

        // Path Data
        var pathDotted = $( document.createElementNS('http://www.w3.org/2000/svg', 'path') ),
            pathBack = $( document.createElementNS('http://www.w3.org/2000/svg', 'path') ),
            pathD = 'M ' + exastroPositionX + ',' + exastroPositionY + ' Q ' + (( thisPositionX - exastroPositionX) / 2 ) + ',' + thisPositionY + ' ' + thisPositionX + ',' + thisPositionY;
        pathBack.attr({'id' : 'svgPathBack' + i, 'class' : 'pathBack', 'd' : pathD});
        pathDotted.attr({'id' : 'svgPathDotted' + i, 'class' : 'pathDotted', 'd' : pathD });

        // Append Path
        $svgArea.append( pathBack, pathDotted );

        var index = 0;
        $featuresList.on({
          'touchstart mouseenter': function(){
              index = $featuresList.index( this );
              $('#svgPathBack' + index ).attr('class', 'pathBack hover');
              $('#svgPathDotted' + index ).attr('class', 'pathDotted hover');
          },
          'touchend mouseleave': function(){
              $('#svgPathBack' + index ).attr('class', 'pathBack');
              $('#svgPathDotted' + index ).attr('class', 'pathDotted');
          }
        });

      });

      // Dotted Animation
      var pathAnime = function() {
        $('.pathDotted').animate({'stroke-dashoffset' : 0 }, 2000, 'linear', function(){
          $( this ).css('stroke-dashoffset', 100 );
          pathAnime();
        } );
      }
      pathAnime();

    }
    featuresSvgLine();

    // Window Resize
    var currentWidth = $( window ).innerWidth();

    var timer = false;    
    $( window ).resize( function() {
        if ( currentWidth == $( window ).innerWidth() && $( window ).innerWidth() < 640 ) {
            return;
        }
        $('.pathBack, .pathDotted').remove();
        if ( timer !== false ) {
            clearTimeout( timer );
        }
        timer = setTimeout( function(){
          featuresSvgLine();
          currentWidth = $( window ).innerWidth();
        }, 500 );
    });

  });
}

// Full screen function
function fullScreenCheck() {
  if (
        ( document.fullScreenElement !== undefined && document.fullScreenElement === null ) ||
        ( document.msFullscreenElement !== undefined && document.msFullscreenElement === null ) ||
        ( document.mozFullScreen !== undefined && !document.mozFullScreen ) || 
        ( document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen )
      )
  {
    return false;
  } else {
    return true;
  }
}
function toggleFullScreen( elem ) {
  if ( !fullScreenCheck() ) {
    if ( elem.requestFullScreen ) {
      elem.requestFullScreen();
    } else if ( elem.mozRequestFullScreen ) {
      elem.mozRequestFullScreen();
    } else if ( elem.webkitRequestFullScreen ) {
      elem.webkitRequestFullScreen( Element.ALLOW_KEYBOARD_INPUT );
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if ( document.cancelFullScreen ) {
      document.cancelFullScreen();
    } else if ( document.mozCancelFullScreen ) {
      document.mozCancelFullScreen();
    } else if ( document.webkitCancelFullScreen ) {
      document.webkitCancelFullScreen();
    } else if ( document.msExitFullscreen ) {
      document.msExitFullscreen();
    }
  }
}