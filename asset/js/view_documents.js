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
      ja : ['フルスクリーン','別タブで開く'],
      en : ['Full screen','Open in new tab'],
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
                + '<li><button class="fullscreen touch"><i class="fas fa-expand"></i> ' + barText[language][0] + '</button></li>'
                + '<li><button class="outlink touch"><i class="fas fa-external-link-alt"></i> ' + barText[language][1] + '</button></li>'
              + '</ul></div></div>';
              
              $viewDocument.prepend( viewHTML ).find('.viewDocumentBody').one('click', function(){
                var $viewBody = $( this ),
                    $iframe = $viewBody.find('iframe');

                var url = '';
                if ( documentType === 'pdf') {
                  url = pdfViewerURL + pdfURL + documentURL + pdfViewerParam;
                } else if ( documentType === 'slide') {
                  url = googleSlideURL + documentURL + googleSlideParam;
                }

                $viewBody.addClass('loading');

                $iframe.one('load', function(){
                  var $viewContent = $( this );
                  $viewBody.removeClass('loading').addClass('done');
                  $viewBody.find('.fullscreen').on('click', function(){ toggleFullScreen( $viewDocument.get(0) ); });
                  $viewBody.find('.outlink').on('click', function(){ window.open( url, '_brank'); });

                  // PDF内の別PDFリンクの調整
                  if ( documentType === 'pdf') {
                    $viewContent.contents().on('click', 'a[href$=".pdf"]', function( e ) {
                      e.preventDefault();
                      window.location = pdfViewerURL + $( this ).attr('href');
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