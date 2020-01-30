// JavaScript Document

$(function(){

		var jsonURL = 'https://exastro-suite.github.io/it-automation-docs/asset/json/google_slide_urls.json',
				language = '';

		var $body = $('body');

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

				var googleSlideURLs = JSONparse[ language ],
						googleSlideURL = JSONparse.config["URL"],
						googleSlideParam = JSONparse.config["Parameters"];

				var $slideView = $('.slideView');
				
				// スライド要素をセット
				$slideView.each( function(){
					var $thisSlidView = $( this ),
							slideHTML = '',
							slideName = $thisSlidView.attr('data-slide-name');
					if ( googleSlideURLs[ slideName ] == "none" ) {
						slideHTML = '<img src="asset/img/under_construction.jpg" alt="Under Construction" style="vertical-align: middle;">';
						$thisSlidView.closest('.slide').html( slideHTML );
					} else {
						if( $thisSlidView.is('.wide') ){
							slideHTML = '<img src="asset/img/view_slide_wide.jpg" alt="View slide">';
						} else {
							slideHTML = '<img src="asset/img/view_slide.jpg" alt="View slide">';
						}
						slideHTML += '<iframe frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
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
	
});