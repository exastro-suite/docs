// JavaScript Document

// HASH
var locationHash = window.location.hash;
if ( locationHash.match('^#\/') ) {
    locationHash = undefined;
} else if ( locationHash ) {
    window.location.hash = '';
}

// LOAD
$('html').addClass('loadWait');

// $window load timeout.
var commonloadTimeoutTime = 3000;
var commonloadTimer = setTimeout(
  function(){
    $( window ).load();
  }, commonloadTimeoutTime
);

$( window ).one('load', function(){

  clearTimeout( commonloadTimer );
  $('html').removeClass('loadWait');
  
  // Anker scroll
  if( locationHash ) {
    if ( $( locationHash ).length ) {
      window.location.hash = locationHash;
      $('html, body').scrollTop( 0 );
      setTimeout(function(){
      
        var $target = $( locationHash ),
            headerHeight = $('header').outerHeight(),
            subMenuHeight = $('#contentsMenu').outerHeight();
        
        var scrollPosition = 0;
            
        if ( $target.is('.tabContent') ) {
          scrollPosition = $target.closest('section').offset().top - headerHeight - subMenuHeight;
        } else {
          scrollPosition = $target.offset().top - headerHeight - subMenuHeight;
        }
            
        $('html, body').animate({ scrollTop: scrollPosition }, 300, 'swing');
        if( $( locationHash ).is('.toggleHeading') ) {
          setTimeout(function(){
            $( locationHash ).click();
          }, 400 );
        }
      }, 100 );
    }
  }
  
  // Menu width Check
  var $header = $('header'),
      titleAreaWidth = $('#titleArea').outerWidth(),
      mainMenuWidth = $('#mainMenu').width(),
      subMenuWidth = $('#subMenu').outerWidth(),
      menuOpenButtonWidth = 40;
  var menuWidthCheck = function() {
    var headerWidth = $('#header').outerWidth() - 16;
    if ( headerWidth < titleAreaWidth + mainMenuWidth + subMenuWidth ) {
      $header.addClass('snsHide');
      if ( headerWidth < titleAreaWidth + mainMenuWidth + menuOpenButtonWidth ) {
        $header.addClass('menuHide');
      } else {
        $header.removeClass('menuHide');
      }
    } else {
      $header.removeClass('menuHide snsHide');
    }
  };
  var resizeMenuCheckTimer;
  $( window ).on('resize', function(){
    clearTimeout( resizeMenuCheckTimer );
    resizeMenuCheckTimer = setTimeout( function() {
      menuWidthCheck();

    }, 200 );
  });
  menuWidthCheck();
});

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
$('a[href^="#"].anker, .article-navi-button.anker').on('click', function( e ){
  e.preventDefault();
  var $anker = $( this ),
      href = $anker.attr('href');
  if ( $( this ).is('.article-navi-button') ) {
    href = '#' + $anker.attr('data-id');
  } else {
    href = $anker.attr('href');
  }
  var headerHeight = $('header').outerHeight(),
      menuHeight = $('#contentsMenu').outerHeight(),
      speed = 300,
      target = $( ( href == '#' || href == '' ) ? 'html' : href ),
      position = target.offset().top - headerHeight - menuHeight;console.log(target)
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


// hash open tab check.
if ( locationHash ) {
  var $hashTab = $( locationHash );
  if ( $hashTab.is('.tabContent') ){
    var $tabContents = $hashTab.closest('.tabContents');
    $tabContents.attr('data-open-tab', $hashTab.closest('.tabContents').children('.tabContent').index( $hashTab ) );
    if ( $tabContents.closest('.tabContent').length ) {
      var $parentTabContents = $tabContents.closest('.tabContent').closest('.tabContents');
      $parentTabContents.attr('data-open-tab', $parentTabContents.children('.tabContent').index( $tabContents.closest('.tabContent') ) );
    }
  }
}

// Tab Contents
$('.tabContents, .webinarContainer').each( function(){
    var $tabContents = $( this ),
        openTabNum = ( $tabContents.attr('data-open-tab') === undefined )? 0: $tabContents.attr('data-open-tab');
    $( this ).children('.tabMenu, .webinarVersionSelect').find('.tabMenuItem, .webinarVersionItem').eq( openTabNum ).addClass('tabOpen');
    $( this ).children('.tabContent, .webinarContent').eq( openTabNum ).addClass('tabOpen');
});
$('.tabMenuLink, .webinarVersionLink').on('click', function( e ){
    e.preventDefault();
    var $a = $( this ),
        $tabMenuItem = $a.parent(),
        $targetTab = $( $a.attr('href') );
    $tabMenuItem.siblings('.tabOpen').removeClass('tabOpen');
    $tabMenuItem.closest('.tabContents, .webinarContainer').children('.tabOpen').removeClass('tabOpen');
    $tabMenuItem.addClass('tabOpen');
    $targetTab.addClass('tabOpen');
});

// News Room tab
$('.documentSetInner').each( function(){
    $( this ).children('.documentSetMenu').find('.documentSetMenuItem').eq(0).addClass('tabOpen');
    $( this ).children('.documentSetContent').eq(0).addClass('tabOpen');
});
$('.documentSetMenuLink').on('click', function( e ){
    e.preventDefault();
    var $tabMenuItem = $( this ).parent(),
        $targetTab = $( $( this ).attr('href') );
    $tabMenuItem.siblings('.tabOpen').removeClass('tabOpen');
    $tabMenuItem.closest('.documentSetInner').children('.tabOpen').removeClass('tabOpen');
    $tabMenuItem.addClass('tabOpen');
    $targetTab.addClass('tabOpen');
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
var $toggleMenu = $('.toggleMenu').children('span');
var tggleMenuClose = function( $togleMenuSpan ) {
  $togleMenuSpan.find('i').removeClass('fa-times').addClass('fa-angle-down');
  $togleMenuSpan.removeClass('on').next('ul').removeClass('open over').hide();
}
$toggleMenu.on('click', function(){
  var $this = $( this ),
      $window = $( window );
  
  var openMenu = function() {
    $this.addClass('on').next('ul').addClass('open').removeClass('over').stop(0,0).slideDown( 50, function(){
    $this.find('i').removeClass('fa-angle-down').addClass('fa-times');
      $( window ).on('scroll.navMenu resize.navMenu', function(){
        $( window ).off('scroll.navMenu resize.navMenu');
        tggleMenuClose( $toggleMenu.filter('.on') );
      });
    });
    var positionTop = $this.offset().top + $this.outerHeight() + 4 - $window.scrollTop(),
        positionLeft = $this.offset().left - $window.scrollLeft();
    if( $window.width() < positionLeft + $this.next('ul').outerWidth() ) $this.next('ul').addClass('over');
    if( positionLeft < 4 ) positionLeft = 4;
    $this.next('ul').css({
      'top' : positionTop,
      'left': positionLeft
    });
  }
  
  if ( $this.is('.on') ) {
    tggleMenuClose( $this );
  } else {
    if ( $toggleMenu.filter('.on').length ) {
      tggleMenuClose( $toggleMenu.filter('.on') );
    }
    openMenu();
  }  

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


// "YouTube iframe Player API" Set
function youTubeIframeAPISet() {
    var youtubeScript = document.createElement('script');
    youtubeScript.src = 'https://www.youtube.com/iframe_api';
    $('body').append( youtubeScript );
    
    // thumbnail
    $('.youtubeEmbed').each( function() {
      var $youtubeEmbed = $( this ),
          youTubeID = $youtubeEmbed.attr('data-embed-id'),
          thumbnailURL = 'http://i.ytimg.com/vi/' + youTubeID + '/sddefault.jpg';
      $youtubeEmbed.addClass('ready').css('background-image', 'url(' + thumbnailURL + ')');      
    });
}
// "Yotube iframe Player API" Ready
function onYouTubeIframeAPIReady() {
    var $youtubeEmbed = $('.youtubeEmbed');  
    
    $youtubeEmbed.on('click', function(){
      var $loadYouTube = $( this ),
          loadYouTubeID = $loadYouTube.attr('data-embed-id'),
          width = $loadYouTube.width(),
          height = $loadYouTube.outerHeight(),
          start = Number( $loadYouTube.attr('data-start-time') );
      if ( start === undefined ) start = 0;
      console.log(start)
      $loadYouTube.removeClass('ready').addClass('loading');
      
      var ytPlayer = new YT.Player(
        loadYouTubeID, {
          width: width,
          height: height,
          videoId: loadYouTubeID,
          playerVars: {
            'autoplay': 1,
            'start': start,
          },
          events: {
            'onReady': function(){
              $loadYouTube.removeClass('loading').addClass('done');
            }
          }
        }
      );
      
      $('#' + loadYouTubeID ).on('load', function(){
        $loadYouTube.removeClass('loading').addClass('done');
      });
    });
}

// FAQ
function faqLoading( jsonURL ) {

		var language = '',
        $body = $('body'),
        $faqList = $('#faqList'),
        $faqNavi = $('#faqNavi'),
        $searchResult = $('#search-result');

		// 言語をbodyのclassから判定
		if ( $body.is('.en') ) {
			language = 'en';
		} else if ( $body.is('.ja') ) {
			language = 'ja';
		} else {
			language = undefined;
		}
		
		if ( language !== undefined ) {
		
			// JSONを読み込む
			$.ajax({

				url: jsonURL,
				type: 'GET',
				dataType: 'text'

			}).done( function( data ){

				var JSONparse = JSON.parse( data );

				var faq = JSONparse[ language ],
            faqHTML = '',
            faqNaviHTML = '',
            frequentlyNumber = 1,
            frequentlyHTML = '';
        
        // FA HTML
        var faqItemHTML = function( id, faqNo, qText, aText, category ) {
          if ( category !== undefined ) {
            category = '<span class="category">' + category + '</span>'
          } else {
            category = '';
          }
          var faqItem = ''
            + '<li>'
              + '<dl id="' + id + '">'
                + '<dt tabindex="0" class="q toggleHeading"><span class="mark">Q<span class="num">' + faqNo + '</span></span><span class="text">' + category + qText + '</span></dt>'
                + '<dd class="a toggleText"><span class="mark">A</span><span class="text">' + aText + '</span></dd>'
              + '</dl>'
            + '</li>';
          return faqItem;
        };
        
        // Taeget scroll
        var targetScroll = function( id ) {
          $('#faqList').find('.open').removeClass('open');
          $('#' + id ).addClass('open');

          var headerHeight = $('header').outerHeight() + 16,
              speed = 300,
              position = $('#' + id ).offset().top - headerHeight;
          $('body, html').animate({ scrollTop : position }, speed, 'swing' );
        };
        
        // Entities
        var textEntities = function( text ) {
            var entities = [
              ['&', 'amp'],
              ['\"', 'quot'],
              ['\'', 'apos'],
              ['<', 'lt'],
              ['>', 'gt'],
            ];
            for ( var i = 0; i < entities.length; i++ ) {
              text = text.replace( new RegExp( entities[i][0], 'g'), '&' + entities[i][1] + ';' );
            }
            text = text.replace(/^\s+|\s+$/g, '');
            return text;
        };
        
        // Replace
        var textReplace = function( str ) {  
          str = textEntities( str );
          str = str.replace(/\{color\{([\s\S]+?)\}(.+?)\}/g,'<span style="color:$2">$1</span>');
          str = str.replace(/\r?\n/g, '<br>\n'); 
          str = str.replace(/\{img{(.+?)\}(.+?)\}/g,'<div class="aImge"><img src="$1" style="width:$2;"></div>');
          str = str.replace(/\{a{(.+?)\}(.+?)\}/g,'<a href="$1" target="_blank">$2</a>');
          str = str.replace(/\{ank{(.+?)\}(.+?)\}/g,'<a href="#$1" class="q-anker" target="_blank">$2</a>');
          str = str.replace(/\__{code\{([\s\S]+?)\}([^\}]+?)\}__/g,'<pre class="type-$2 clipboard-copy">$1</pre>');
          str = str.replace(/\{cmd\{([\s\S]+?)\}command}/g,'<pre class="type-$2">$1</pre>');
          return str;
        };
        
        // Search replace
        var tagReplace = function( match, p1, offset, str ) {
          // Check <xxx> or &xxx;
          var entitieGreater = str.indexOf( ';', offset ),
              entitieLesser = str.indexOf( '&', offset ),
              tagGreater = str.indexOf( '>', offset ),
              tagLesser = str.indexOf( '<', offset );
          if(
              ( entitieGreater < entitieLesser || ( entitieGreater != -1 && entitieLesser == -1 ) ) ||
              ( tagGreater < tagLesser || ( tagGreater != -1 && tagLesser == -1 ) )
          ) {
            return match;
          } else {
            return '<span class="match">' + match + '</span>';
          }
        };
        
        for ( var cat in faq ) {
          faqHTML += '<div id="' + faq[cat]['data']['id'] + '" class="faqItem">'
            + '<h3>' + cat + '</h3>'
            + '<div class="faqBody">'
              + '<ul>';
          var catName = cat;
          if ( faq[cat]['data']['abbreviation'] !== undefined && faq[cat]['data']['abbreviation'] !== '') {
            catName = faq[cat]['data']['abbreviation'];
          }
          faqNaviHTML += '<li><a href="#' + faq[cat]['data']['id'] + '" class="touch"><i class="fas ' + faq[cat]['data']['icon'] + '"></i>' + catName + '</a></li>';
          
          if ( faq[cat]['data']['id'] !== 'frequently' ) {
            var frequentlyArray = faq[cat]['data']['frequently'].split(',');
            for ( var no in faq[cat] ) {
              if ( no === "data" ) break;
              var qText = textReplace( faq[cat][no]["Q"] ),
                  aText = textReplace( faq[cat][no]["A"] );
                  
              faqHTML += faqItemHTML( faq[cat][no]['id'], no, qText, aText );
              
              if ( frequentlyArray.indexOf( no ) !== -1 ) {
                frequentlyHTML += faqItemHTML( faq[cat][no]['id'], frequentlyNumber++, qText, aText, cat );
              }
            }
          }
          faqHTML += ''
              + '</ul>'
            + '</div>'
          + '</div>';
        }
        
        $faqNavi.find('ul').html( faqNaviHTML ).slideDown( 300, function() {
          // Index 一番目を表示
          $faqList.find('.loading').remove();
          $faqList.prepend( faqHTML );
          $faqList.find('pre').find('br').remove();
          //$('#frequently').find('ul').html( frequentlyHTML );
          $faqNavi.find('a').eq(0).addClass('open');
          $faqList.children().eq(0).addClass('open');
          
          // 指定初期表示
          qInit();
        });
        
        $faqNavi.find('a').on('click', function( e ) {
          e.preventDefault();
          var $link = $( this );
          $faqNavi.find('.open').removeClass('open');
          $link.addClass('open');
          var id = $link.attr('href').replace('#','');
          targetScroll( id );          
        });
        
        $faqList.on({
          'click' : function(){
            $( this ).toggleClass('open');
            $( this ).next('.toggleText').slideToggle( 100 );
          },
          'keydown' : function( e ){
            if ( e.keyCode === 13 ) {
              e.preventDefault();
              $( this ).click();
            }
          }
        }, '.toggleHeading' );
        
        // FAQ link
        $faqList.on('click', '.q-anker',function(e){
          e.preventDefault();
          var $link = $( this ),
              href = $( this ).attr('href'),
              linkCat = href.replace(/[0-9]+$/,''),
              headerHeight = $('header').outerHeight(),
              menuHeight = $('#contentsMenu').outerHeight(),
              speed = 100;
          
          // 別のカテゴリリンクの場合
          if ( !$link.closest( linkCat ).length ) {
            $faqNavi.find('.open').removeClass('open');
            $faqList.find('.faqItem.open').removeClass('open');
            
            $faqNavi.find('a[href="' + linkCat + '"]').addClass('open');
            $faqList.find( linkCat ).addClass('open');
          }
          
          var $target = $( ( href == '#' || href == '' ) ? 'html' : href ),
              position = $target.offset().top - headerHeight - menuHeight;                    
          
          $('body, html').animate({ scrollTop : position }, speed, 'swing' );
          if ( !$target.find('.a').is(':visible') ) {
            $target.find('dt').click();
          }
        });
        
        $faqList.on('click', '.clipboard-copy', function(){

          var clickInterval = 1000; // Click interval.
          var $this = $( this );

          if( !$this.is('.copy') ){

            var $dummyElm = $('<textarea class="dummy" />'),
                text = '';

            // Line feed check.
            text = $( this ).text();
            text = text.replace(/\r/g, '\n');
            if( text.slice( -1) !== '\n' ) text += '\n';
            text = text.replace(/\n+$/, '\n');

            // Add text to dummy element and select.
            $this.after( $dummyElm );
            $dummyElm.text( text ).focus().select();

            // Selected text to clipboard.
            document.execCommand('copy');

            // Dummy element remove.
            $dummyElm.remove();

            // Leave an interval.
            $this.addClass('copy');
            setTimeout( function(){
              $this.removeClass('copy');
            }, clickInterval );

          }
        });

        var $searchInput = $('#search-input'),
            $searchButton = $('#search-button'),
            regexEscapeArray = ['.','*','+','^','|','[',']','(',')','?','$','{','}'],
            regexEscapeLength = regexEscapeArray.length;
        
        $searchInput.on('keydown', function( e ) {
          if ( e.keyCode === 13 ) {
            e.preventDefault();
            $searchButton.click();
          }
        });
        
        $searchButton.on('click', function() {
          var keyword = $searchInput.val(),
              searchResultHTML = '',
              searchResultNum = 1;
          
          // 空白のみの場合は終了
          if ( keyword.replace(/\s/g, '') === '' ) return false;
          
          // 正規表現メタ文字をエスケープ
          for ( var i = 0; i < regexEscapeLength; i++ ) {
            keyword = keyword.replace( regexEscapeArray[i], '\\' + regexEscapeArray[i] );
          }
          
          // スペースOR
          keyword = textEntities( keyword.replace(/\s/g, '|') );
          
          var regex = new RegExp( "(" + keyword + ")", "igu");
          $faqNavi.find('.open').removeClass('open');
          
          for ( var cat in faq ) {
            if ( faq[cat]['data']['id'] !== 'frequently' ) {
              for ( var no in faq[cat] ) {
                if ( no === "data" ) break;
                var qText = textReplace( faq[cat][no]['Q'] ),
                    aText = textReplace( faq[cat][no]['A'] );
                if ( qText.match( regex ) !== null || aText.match( regex ) !== null ) {
                  qText = qText.replace( regex, tagReplace );
                  aText = aText.replace( regex, tagReplace );
                  if ( qText !== false || aText !== false ) {
                    searchResultHTML += faqItemHTML('search' + no, searchResultNum++, qText, aText, cat );
                  }
                }
              }
            }
          }
          if ( searchResultHTML === '' ) {
            var errorMessage = 'No search results found.';
            if ( language === 'ja') {
              errorMessage = '検索結果は見つかりませんでした。';
            }
            searchResultHTML = '<li class="error"><i class="fas fa-exclamation-triangle"></i> ' + errorMessage + '</li>';
          }
          
          $searchResult.find('ul').html( searchResultHTML );
          $faqList.find('pre').find('br').remove();
          targetScroll('search-result');
          
        });

			}).fail( function(){

				// リストの読み込みに失敗したらConsoleにエラー出力
				window.console.error('Failed to load "' + jsonURL + '".');

			});
		
		} else {

			// 言語の判定に失敗したらConsoleにエラー出力
			window.console.error('Failed to get language.');
			
		}
    
    const qInit = function() {
        // 指定のQを開く
        const openQ = function( targetQ ){
              var href = '#' + targetQ,
                  linkCat = href.replace(/[0-9]+$/,''),
                  headerHeight = $('header').outerHeight(),
                  menuHeight = $('#contentsMenu').outerHeight(),
                  speed = 100;
              
              $faqNavi.find('.open').removeClass('open');
              $faqList.find('.faqItem.open').removeClass('open');

              $faqNavi.find('a[href="' + linkCat + '"]').addClass('open');
              $faqList.find( linkCat ).addClass('open');

              const $target = $( ( href == '#' || href == '' ) ? 'html' : href );

              if ( $target.length ) {
                  const position = $target.offset().top - headerHeight - menuHeight;                    

                  $('body, html').animate({ scrollTop : position }, speed, 'swing' );
                  if ( !$target.find('.a').is(':visible') ) {
                    $target.find('dt').click();
                  }
              }
        };

        // パラメータ取得
        const getParams = function() {
            const searchParams = ( new URL( document.location ) ).searchParams.entries(),
                  params = {};
            for ( const [ key, val ] of searchParams ) {
                params[ key ] = val;
            }
            return params;
        };

        const params = getParams();

        if ( params['q'] ) {
            setTimeout( function(){
                openQ( params['q'] );
            }, 500 );
        }
    };

}