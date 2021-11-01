// JavaScript Document

(function(){

  const $window = $( window ),
        $article = $('#article');
  
  
  
  
  $(document).ready(function(){
  
    // Rows mark
    $article.find('.line').each(function(){console.log('!');
      const $code = $( this ),
            rowLength = $code.text().match(/\r?\n/g).length;
      
      // Line type
      const typeCheck = function(){
        if ( $code.id('.d') ) {
          return ['d','$'];
        } else if ( $code.id('.s') ) {
          return ['s','#'];
        } else if ( $code.id('.g') ) {
          return ['g','&gt;'];
        } else {
          const numClass = $code.attr('class').split(' ').filter(function(v){return v.match(/^n[0-9]+$/);}),
                startNum = ( numClass.length === 0 )? 1: Number( numClass[0].slice(1) );
          return ['n', startNum ];
        }
      };
      const mark = typeCheck();
      
      // HTML
      let html = '<div class="linemarker">';
      for ( let i = 0; i < rowLength; i++ ) {
        if ( mark[0] === 'n') {
          html += ( mark[1] + i ) + '<br>';
        } else {
          html += mark[1] + '<br>';
        }
      }
      html += '</div>';
      $code.prepend( html );
    });
    
  });
  
  $window.on('load', function(){
    const $navi = $('#navi'),
          $doc = $('#article'),
          naviTarget = 'h2,h3,h4,h5,h6',
          naviCount = [0,0,0,0,0,0],
          naviCountLength = naviCount.length,
          pTop = [],
          maxHeadingNum = 3;
    let   pN = 2,
          naviHTML = '';    
    
    naviHTML += '<div id="anker-ht" class="article-title"><a class="article-title-link" href="#article">' + $doc.find('h1').text() + '</a></div>'
    + '<ol class="article-navi-list" data-level="1">';
    $doc.find( naviTarget ).each(function(index){
      const $h = $( this ),
            t = $h.text(),
            n = Number( $h.prop('tagName').slice( -1 ) ),
            nDiff = n - pN,
            id = $h.attr('id');

      // 段落番号
      naviCount[n-1]++;
      if ( nDiff < 0 ) {
        for ( let i = n+1; i <= naviCountLength; i++ ) {
          if ( naviCount[i-1] !== undefined ) naviCount[i-1] = 0;
        }
      }

      // 段落番号連結
      let dataId = naviCount[1];
      if ( n > 2 ) {
        for ( let i = 3; i <= n; i++ ) {
          if ( naviCount[i-1] !== undefined ) dataId += '-' + naviCount[i-1];
        }
      }
      $h.attr('data-id', dataId );
      pN = n;

      // HTML
      if ( nDiff === 1 ) {
        naviHTML += '<ol class="article-navi-list" data-level="' + n + '"';
        if ( n > maxHeadingNum ) {
          naviHTML += ' style="display:none"';
        }
        naviHTML += '>';
      } else if ( nDiff >= 2 ) {
        alert('Order of headings is out of order.');
        return false;
      } else if ( nDiff === 0 && index !== 1 ) {
        naviHTML += '</li>';
      } else if ( nDiff < 0 ) {
        naviHTML += '</li>';
        for ( let i = 0; i < Math.abs(nDiff); i++ ) {
          naviHTML += '</ol></li>';
        }
      }
      naviHTML += '<li id="anker-' + dataId + '" class="article-navi-item" data-level="' + n + '">'
      + '<a class="article-navi-link" href="#' + id + '">' + t + '</a>';

      // position top
      if ( n <= maxHeadingNum ) {
        pTop.push({
          'id': dataId,
          'top':  Math.floor( $h.position().top ),
          'type': n
        });
      }
    });

    naviHTML += '</ol>';

    $navi.html( naviHTML );
    
    const headingPosition = function( scrollTop ){
      const pTopLenght = pTop.length;
      let tId = '';
      for ( let i = 0; i < pTopLenght; i++ ) {
        if ( pTop[i].top <= scrollTop ) {
          tId = pTop[i].id;
        } else {
          break;
        }
      }
      if ( tId === '') tId = tId = 'ht';
      $navi.find('.focus').removeClass('focus');
      
      const $anker = $('#anker-' + tId ),
            naviHeight = $navi.outerHeight(),
            ankerTop = $anker.position().top;
      $anker.addClass('focus');
      if ( ankerTop < 0 || naviHeight < ankerTop ) {
        $navi.scrollTop( $anker.position().top + $navi.scrollTop() );
      }
    };
    headingPosition( $window.scrollTop() );
    
    $window.on('scroll', function(){
      headingPosition( $( this ).scrollTop() );
    });
  });

}());