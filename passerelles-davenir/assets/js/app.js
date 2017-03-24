$(document).foundation();

$(document).ready( function() {

  $('.arrow.down').click( function() {
    $(this).css('visibility','hidden');
    $(this).next('.hidden').slideDown( "slow", function() {
    });
  });
  $('.arrow.up').click( function() {
    $(this).parent().slideUp( "slow", function() {
      $(this).prev().css('visibility','visible');
    });
  });

});
$(window).resize( function() {

});
