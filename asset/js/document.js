// JavaScript Document

(function(){

  // Anker HASH
  // const locationHash = window.location.hash;
  // if ( locationHash ) window.location.hash = ''; 

  const $window = $( window ),
        naviTarget = 'h2,h3,h4,h5,h6',
        maxHeadingNum = 3,
        headerChangeWidth = 1220;
  
  const getHeaderHeight = function(){
    return ( $window.outerWidth() <= headerChangeWidth )?
      $('#header').find('.header-title').height(): 0;
  };
  
  const smoothScroll = function( $target ){
    const headerHeight = getHeaderHeight(),
          scrollPosition = $target.offset().top - headerHeight;
    $('html, body').animate({ scrollTop: scrollPosition }, 300, 'swing');
  };
  
  $(function(){
  
    const $header = $('#header'),
          $navi = $('#navi'),
          $article = $('#article');
    
    // メニュー開閉
    $header.find('.header-menu-button, .header-overlay').on('click', function(){
      $header.toggleClass('open');
    });
        
    // ハイライター追加処理
    $article.find('div.highlighter-rouge').each(function(){
      const $code = $( this );
      
      // 行マーク付与
      if ( $code.is('.line') ) {
        const n = $code.text().match(/\r?\n/g),
              rowLength = ( n === null )? 1: n.length;

        // マーク種類
        const typeCheck = function(){
          if ( $code.is('.d') ) {
            return ['d','$'];
          } else if ( $code.is('.s') ) {
            return ['s','#'];
          } else if ( $code.is('.g') ) {
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
      }
      
      // 最後がスペースで終わる場合削除する
      const $codeIn = $code.find('code'),
            codeHTML = $codeIn.html();
      if ( codeHTML.match(/\s$/) ) {
        $codeIn.html( codeHTML.replace(/\s$/, '') );
      }
      
    });
    
    // 見出しリストの作成
    const headingList = function(){
        const naviCount = [0,0,0,0,0,0],
              naviCountLength = naviCount.length;
        let   pN = 2,
              naviHTML = '';

        naviHTML += '<div id="anker-ht" class="article-title"><a class="article-title-link" href="#article">' + $article.find('h1 > .article-header-title').text() + '</a></div>'
        + '<ol class="article-navi-list" data-level="1">';
        $article.find( naviTarget ).each(function(index){
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
        });

        naviHTML += '</ol>';

        $navi.html( naviHTML );
    }
    headingList();
    
    // スムーススクロール
    $('a[href^="#"]').on('click', function(e){
      e.preventDefault();
      const href = $( this ).attr('href');
      smoothScroll( $(( href === '#')? 'html': href ) );
    });
    
    // Page top
    const pageTopShow = function() {
        const windowScrollTop = $window.scrollTop(),
              windowHeight = $window.height();
        if ( windowScrollTop < windowHeight ){
            $('#topMove').css('bottom', '-64px' );
        } else {
            $('#topMove').css('bottom', '8px' );
        }
    };
    pageTopShow();
    
    // スクロールイベント
    $window.on('scroll', function(){
        pageTopShow();
    });
    
    // イメージリンク lazyload対応
    $article.find('img').not(':eq(0)').each(function(){
      const $img = $( this ),
            url = $img.attr('src'),
            width = $img.attr('width'),
            height = $img.attr('height'),
            ratio = Math.round( height / width * 10000000 ) / 100000;
      $img.attr({'src': '', 'data-src': url }).addClass('lazyload');
      $img.wrap('<a style="padding-bottom:' + ratio + '%" class="article-image-link lazyloading" href="' + url + '" target="_blank" />')
    });
    
    $article.find("img.lazyload").lazyload().on('load', function(){
      $( this ).closest('.article-image-link').removeClass('lazyloading');
    });
    
    
    // 見出し強調
    const hTop = [];
    
    // 見出しの位置を取得
    const getHeadingPositon = function(){
      hTop.splice(0);
      $article.find( naviTarget ).each(function(){
        const $h = $( this ),
              id = $h.attr('data-id'),
              n = Number( $h.prop('tagName').slice( -1 ) );
        if ( n <= maxHeadingNum ) {
          hTop.push({
            'id': id,
            'top':  Math.floor( $h.offset().top ),
            'type': n
          });
        }
      });
    };
    getHeadingPositon();
    
    // スクロール位置、メニュー内の見出しを強調
    const headingPosition = function( scrollTop ){
      const hTopLength = hTop.length,
            headerHeight = getHeaderHeight();
      let tId = '';
      for ( let i = 0; i < hTopLength; i++ ) {
        if ( hTop[i].top - headerHeight <= scrollTop ) {
          tId = hTop[i].id;
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
    
    let scrollTimer;
    $window.on('scroll', function(){
      clearTimeout( scrollTimer );
      scrollTimer = setTimeout( function() {
        headingPosition( $( this ).scrollTop() );
      }, 100 );
    });
    
    // Windowサイズが変わったら位置を再取得
    let resizeTimer;
    $window.on('resize', function(){
      clearTimeout( resizeTimer );
      resizeTimer = setTimeout( function() {
        getHeadingPositon();
        headingPosition( $window.scrollTop() );
      }, 200 );
    });
  });

}());