// JavaScript Document

function footerBanner() {

var title = 'システムライフサイクルをデジタル化するExastro活用術',
    linkURL = 'https://exastro-suite.github.io/docs/event/20200911.html',
    bannerPC = 'https://exastro-suite.github.io/docs/asset/banner/banner20200911pc.jpg',
    bannerSP = 'https://exastro-suite.github.io/docs/asset/banner/banner20200911sp.jpg',
    bannerHTML = '<div id="announceArea">'
    + '<div class="announceAreaInner">'
      + '<div class="bannerClose touch" title="Close"><i class="fas fa-times"></i></div>'
      + '<a class="bannerLink touch" href="' + linkURL + '" title="' + title + '">'
        + '<div class="bannerPC"><img class="bannerImage" src="' + bannerPC + '" alt="PC Banner"></div>'
        + '<div class="bannerSP"><img class="bannerImage" src="' + bannerSP + '" alt="SP Banner"></div>'
      + '</a>'
    + '</div>'
  + '</div>';
  
  $('body').append( bannerHTML );

  $( window ).on('load', function(){
    var $announceArea = $('#announceArea'),
        closeTime = 10000;
    $announceArea.addClass('open');

    $announceArea.find('.bannerClose').on('click', function(){
      $announceArea.removeClass('open');
    });

    setTimeout( function(){
      $announceArea.removeClass('open');
    }, closeTime );
  });
}
footerBanner();