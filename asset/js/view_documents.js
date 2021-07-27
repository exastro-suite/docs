// JavaScript Document

function viewDocuments( ducumentsJsonUrl ) {

		var language = '',
        $body = $('body');

		if ( $body.is('.en') ) {
			language = 'en';
		} else if ( $body.is('.ja') ) {
			language = 'ja';
		} else {
			language = undefined;
		}
		
    const barText = {
      ja : ['フルスクリーン','フルスクリーン解除','別タブで開く','戻る','進む'],
      en : ['Full screen','Full screen off','Open in new tab','Prev','Next'],
    }
    
		if ( language === undefined ) return false;
		
    // JSONを読み込む
    $.ajax({

      url: ducumentsJsonUrl,
      type: 'GET',
      dataType: 'text'

    }).done( function( data ){

      var documentsJSON = JSON.parse( data );

      var documents = documentsJSON[ language ],
          pdfViewerURL = documentsJSON.config["pdf_viewer_url"],
          pdfViewerParam = documentsJSON.config["pdf_viewer_parameters"],
          pdfURL = documentsJSON.config["pdf_url"],
          googleSlideURL = documentsJSON.config["slide_url"],
          googleSlideParam = documentsJSON.config["slide_parameters"];

      var $viewDocuments = $('.viewDocument');

      $viewDocuments.each( function() {
        var $viewDocument = $( this ),
            documentName = $viewDocument.attr('data-document'),
            viewHTML = '<div class="viewDocumentBody">';
        
        if ( documentName in documents ) {
          
          var documentType = ( 'type' in documents[documentName] ) ? documents[documentName]['type'] : 'none',
              documentURL = ( 'url' in documents[documentName] ) ? encodeURI( documents[documentName]['url'] ) : '';
              
          $viewDocument.addClass( documentType );

          switch( documentType ) {
            case 'none':
              viewHTML += '<img src="asset/img/under_construction.jpg" alt="Under Construction"></div>';
              $viewDocument.prepend( viewHTML );
              break;
            case 'pdf':
            case 'slide':
              if( $viewDocument.is('.wide') ){
                viewHTML += '<img src="asset/img/view_' + documentType + '_wide.jpg" alt="View ' + documentType + '">';
              } else {
                viewHTML += '<img src="asset/img/view_' + documentType + '.jpg" alt="View ' + documentType + '">';
              }
              viewHTML += '<iframe frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>'
              + '<div class="viewToolBar"><ul>'
                + '<li><button class="prev touch" disabled><i class="fas fa-arrow-left"></i> ' + barText[language][3] + '</button></li>'
                + '<li><button class="next touch" disabled>' + barText[language][4] + ' <i class="fas fa-arrow-right"></i></button></li>'
                + '<li><button class="fullscreen-on touch"><i class="fas fa-expand"></i> ' + barText[language][0] + '</button><button class="fullscreen-off touch"><i class="fas fa-compress"></i> ' + barText[language][1] + '</button></li>'
                + '<li><button class="outlink touch"><i class="fas fa-external-link-alt"></i> ' + barText[language][2] + '</button></li>'
              + '</ul></div></div>';
              
              $viewDocument.prepend( viewHTML ).find('.viewDocumentBody').one('click', function(){
                var $viewBody = $( this ),
                    $iframe = $viewBody.find('iframe');

                var url = '';
                if ( documentType === 'pdf') {
                  if ( documentURL.match(/^https:\/\//) ) {
                    url = documentURL + pdfViewerParam;
                  } else {
                    url = pdfViewerURL + pdfURL + documentURL + pdfViewerParam;
                  }
                } else if ( documentType === 'slide') {
                  url = googleSlideURL + documentURL + googleSlideParam;
                }

                $viewBody.addClass('loading');
                
                var $prevButton = $viewBody.find('.prev'),
                    $nextButton = $viewBody.find('.next'),
                    nextCount = 0,
                    prevCount = 0,
                    historyCurrent = 0,
                    historyArray = [],
                    historyCheck = function() {
                      if ( nextCount <= 0 ) {
                        nextCount = 0;
                        $nextButton.prop('disabled', true );
                      } else {
                        $nextButton.prop('disabled', false );
                      }
                      if ( prevCount <= 0 ) {
                        prevCount = 0;
                        $prevButton.prop('disabled', true );
                      } else {
                        $prevButton.prop('disabled', false );
                      }
                    };
                
                historyArray[historyCurrent] = url;
                $prevButton.on('click', function(){
                  nextCount++;
                  prevCount--;
                  historyCurrent--;
                  historyCheck();
                  $iframe.get(0).contentDocument.location.replace( historyArray[historyCurrent] );
                });
                $nextButton.on('click', function(){
                  prevCount++;
                  nextCount--;
                  historyCurrent++;
                  historyCheck();
                  $iframe.get(0).contentDocument.location.replace( historyArray[historyCurrent] );
                });
                $viewBody.find('.fullscreen-on, .fullscreen-off').on('click', function(){ toggleFullScreen( $viewDocument.get(0) ); });
                $viewBody.find('.outlink').on('click', function(){
                  if ( documentType === 'pdf') {
                    if ( documentURL.match(/^https:\/\//) ) {
                      window.open( pdfURL + documentURL, '_blank');
                    } else {
                      window.open( documentURL, '_blank');
                    }
                  } else {
                    window.open( url, '_blank');
                  }
                });
                
                $iframe.on('load', function(){
                  var $viewContent = $( this );
                  $viewBody.removeClass('loading').addClass('done');

                  // PDF内の別PDFリンクの調整
                  if ( documentType === 'pdf') {
                    $viewContent.contents().on('click', 'a[href$=".pdf"]', function( e ) {
                      e.preventDefault();
                      var pdfLink = pdfViewerURL + $( this ).attr('href');
                      nextCount = 0;
                      prevCount++;
                      historyCurrent++;
                      historyCheck();
                      historyArray[historyCurrent] = pdfLink;
                      // ブラウザの履歴に残さずにページ移動する
                      $iframe.get(0).contentDocument.location.replace( pdfLink );
                    });
                  }

                }).attr('src', url );

              });
              break;
          }
        }
      });
      

    }).fail( function(){

      // リストの読み込みに失敗したらConsoleにエラー出力
      window.console.error('Failed to load "' + ducumentsJsonUrl + '".');

    });

}