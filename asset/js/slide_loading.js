// JavaScript Document

function slideLoading( jsonURL ) {

		var language = '',
        $body = $('body');

		// 言語をbodyのclassから判定
		if ( $body.is('.en') ) {
			language = 'en';
		} else if ( $body.is('.ja') ) {
			language = 'ja';
		} else {
			language = undefined;
		}
		
    const text = {
    ja : ['フルスクリーン','別タブで開く'],
    en : ['Full screen','Open in new tab'],
    }
    
		if ( language !== undefined ) {
		
			// JSONを読み込む
			$.ajax({

				url: jsonURL,
				type: 'GET',
				dataType: 'text'

			}).done( function( data ){

				var JSONparse = JSON.parse( data );

				var googleSlideURLs = JSONparse[ language ],
						googleSlideURL = JSONparse.config["URL"],
						googleSlideParam = JSONparse.config["Parameters"];

				var $slideView = $('.slideView');
				
				// スライド要素をセット
				$slideView.each( function(){
					var $thisSlidView = $( this ),
							slideHTML = '',
							slideName = $thisSlidView.attr('data-slide-name');
					if ( googleSlideURLs[ slideName ] === "none" ) {
						slideHTML = '<img src="asset/img/under_construction.jpg" alt="Under Construction" style="vertical-align: middle;">';
						$thisSlidView.closest('.slide').html( slideHTML );
					} else {
						if( $thisSlidView.is('.wide') ){
							slideHTML = '<img src="asset/img/view_slide_wide.jpg" alt="View slide">';
						} else {
							slideHTML = '<img src="asset/img/view_slide.jpg" alt="View slide">';
						}
						slideHTML += '<iframe frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
            slideHTML += '<div class="viewToolBar"><ul>'
            + '<li><button class="fullscreen touch"><i class="fas fa-expand"></i> ' + text[language][0] + '</button></li>'
            + '<li><button class="outlink touch"><i class="fas fa-external-link-alt"></i> ' + text[language][1] + '</button></li>'
            + '</ul></div>';
						$thisSlidView.html( slideHTML );
					}
				});

				// クリックでスライドを読み込む
				$slideView.on('click', function(){
					var $slideView = $( this ),
							$iframe = $slideView.find('iframe'),
							slideName = $slideView.attr('data-slide-name');

					var url = googleSlideURL + googleSlideURLs[ slideName ] + googleSlideParam;

					$slideView.off('click').addClass('loading');
					$iframe.attr('src', url );

					$iframe.load( function(){
						$slideView.removeClass('loading').addClass('done');
						$( this ).fadeIn( 300 );
            $slideView.find('.fullscreen').on('click', function(){ toggleFullScreen( $slideView.parent().get(0) ); });
            $slideView.find('.outlink').on('click', function(){ window.open( url, '_brank'); });
					});

				});

			}).fail( function(){

				// リストの読み込みに失敗したらConsoleにエラー出力
				window.console.error('Failed to load "' + jsonURL + '".');

			});
		
		} else {

			// 言語の判定に失敗したらConsoleにエラー出力
			window.console.error('Failed to get language.');
			
		}

}