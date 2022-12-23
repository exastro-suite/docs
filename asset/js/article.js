// JavaScript Document

$(function(){
    const $articleTitle = $('#articleTitle');
    if ( $articleTitle.length ) {
        let topMoveHeight;

        // Title background image.
        $articleTitle.append('<div class="background"></div>');
        if( $('#website.index').length ) $('.background').after('<div class="backgroundMonitor"><div class="monitor"><div><ul><li></li><li></li><li></li></ul></div></div></div>');

        // Resize window.
        const resizeWindow = function() {
            if ( $('#articleBody').length ) {
              topMoveHeight = $('#articleBody').offset();
            } else if ( $('#eventBody').length ) {
              topMoveHeight = $('#eventBody').offset();
            }
        }
        let timer = false;    
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
            const windowScrollTop = $( this ).scrollTop();
            const windowBackgroundPosition = windowScrollTop / 2;
            if ( windowScrollTop < topMoveHeight.top ){
                $('#topMove').css('bottom', '-64px' );
                $('#articleTitle .background').css('transform', 'translate3d(0,' + windowBackgroundPosition + 'px,0)');
            } else {
                $('#topMove').css('bottom', '8px' );
            }
        });
    }

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

        var $viewDocument = $( this ).closest('.viewDocument'),
            index = $this.parent().find('li').index( $this );
        
        // Slide view adjust height.
        if( $viewDocument.find('.on').is('.viewSlide') ){
          var height = $viewDocument.find('.viewDocumentBody').outerHeight();
          $viewDocument.children().not('.slideMenu').css('height', height );
        }

        $viewDocument.find('.on').removeClass('on');
        $this.addClass('on');

        $viewDocument.children().not('.slideMenu').hide();
        $viewDocument.children().eq( index ).show();

      }
    });
      
});