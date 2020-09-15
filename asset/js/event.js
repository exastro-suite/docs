// JavaScript Document

function eventOverviewSlide() {

  var $window = $( window );

  $window.on('load', function(){
    var $eventOverview = $('#eventOverview'),
        headerHeight = $('#header').height(),
        eventOverviewPadding = 32,
        eventOverviewPositionY = $eventOverview.offset().top - eventOverviewPadding,
        eventPageHeight = $('#eventPage').outerHeight(),
        eventOverviewHeight = $eventOverview.outerHeight(),
        maxScrollTop = eventPageHeight - eventOverviewHeight - eventOverviewPositionY - ( eventOverviewPadding * 2 ),
        scrollTimer;
    
    $window.on('scroll', function(){
      clearTimeout( scrollTimer );
      scrollTimer = setTimeout( function(){
        if ( eventOverviewPositionY < $window.scrollTop() - eventOverviewPadding ) {
          var scrollPosition = $window.scrollTop() - eventOverviewPositionY + headerHeight;
          if ( scrollPosition < maxScrollTop ) {
            $eventOverview.css('top', scrollPosition );
          } else {
            $eventOverview.css('top', maxScrollTop );
          }
        } else {
          $eventOverview.css('top', 0 );
        }
      }, 200 );
    });
  });
}
// eventOverviewSlide(); 

function googleCalenderEvent() {

var googleCalenderURL = '',
    userAgent = navigator.userAgent;

}