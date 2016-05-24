//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').mousedown(function(event) {
  switch (event.which) {
    case 1:
      if (!$(this).attr('block')) {
        $(this).attr('block', $(this).html());
        $(this).html('|---|');
      } else {
        $(this).html($(this).attr('block'));
        $(this).removeAttr('block');
      }
      break;
    default:
      break;
  }
});
function Renumber() {
  $.each($('pre:not([nonumber])'), function() {
    var line = $(this).find('code').html(),
        number = '';
    for (var a = 0; a < line.split('\n').length; a++) {
      number += '<span id="number">' + (a + 1) + '</span>\n';
    }
    $(this).find('span#numbers').html(number);
  });
}
