// JavaScript Document

$(function(){
    var topMoveHeight;

    // Title background image.
    $('#articleTitle').append('<div class="background"></div>');
    if( $('#website.index').length ) $('.background').html('<div class="monitor"><div><ul><li></li><li></li><li></li></ul></div></div>');
    
    // Resize window.
    var resizeWindow = function() {
        topMoveHeight = $('#articleBody').offset();
    }
    var timer = false;    
    $( window ).resize( function() {
        if ( timer !== false ) {
            clearTimeout( timer );
        }
        timer = setTimeout( function(){
            resizeWindow();
        }, 500 );
    });
    
    resizeWindow();
    
    $( window ).scroll( function(){
        var windowScrollTop = $( this ).scrollTop();
        var headerHeight = $('header').outerHeight();
        var windowBackgroundPosition = windowScrollTop / 2 + headerHeight;
        if ( windowScrollTop < topMoveHeight.top ){
            $('#topMove').css('bottom', '-64px' );
            $('#articleTitle .background').css('top', windowBackgroundPosition + 'px' );
        } else {
            $('#topMove').css('bottom', '8px' );
        }
    });

/* -------------------------------------------------- **

   Clipborad copy

** -------------------------------------------------- */ 
    $('.clipboard-copy').on('click', function(){
      
      
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

/* -------------------------------------------------- **

   Slide tab menu change.

** -------------------------------------------------- */  
    var $slideMenu = $('.slideMenu');

    // Menu On
    $slideMenu.each( function(){
      $( this ).find('li').eq(0).addClass('on');
    });

    $slideMenu.find('li').on('click', function(){
      var $this = $( this );
      if( !$this.is('.on') ){

        var $slide = $( this ).closest('.slide'),
            index = $this.parent().find('li').index( $this );
        
        // Slide view adjust height.
        if( $slide.find('.on').is('.viewSlide') ){
          var height = $slide.find('.slideView').outerHeight();
          $slide.children().not('.slideMenu').css('height', height );
        }

        $slide.find('.on').removeClass('on');
        $this.addClass('on');

        $slide.children().not('.slideMenu').hide();
        $slide.children().eq( index ).show();

      }
    });
    
// PDF.js Loading Viewer
    $('.pdfView').one('click', function(){
      var $pdfView = $( this ),
          $iframe = $pdfView.find('iframe'),
          pdfURL = $pdfView.attr('data-pdf-url');

      var url = 'https://exastro-suite.github.io/docs/asset/library/pdfjs/web/viewer.html?file=https://exastro-suite.github.io/' + pdfURL + '#page=1'

      $pdfView.addClass('loading');

      $iframe.one('load', function(){
        var $viewContent = $( this );
        $pdfView.removeClass('loading').addClass('done');
        $pdfView.find('.fullscreen').on('click', function(){ toggleFullScreen( $pdfView.parent().get(0) ); });
        $pdfView.find('.outlink').on('click', function(){ window.open( url, '_brank'); });
        
        $viewContent.fadeIn( 300 ).contents().find('a').on('click', function( e ) {
          e.preventDefault();
        });
        
      }).attr('src', url ).load();

    });
    
});