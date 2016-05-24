//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').mousedown(function(event) {
  switch (event.which) {
    case 1:
      var count = 0;
      if (!$(this).attr('block')) {
        count = $(this).html().split('\n').length - 1;
        $(this).attr('block', $(this).html());
        $(this).html('|---|');
      } else {
        $(this).html($(this).attr('block'));
        $(this).removeAttr('block');
      }
      Renumber($(this), count);
      break;
    default:
      break;
  }
});
function Renumber(object, count) {
  $(object).closest('pre:not([nonumber])').each(function() {
    var line = $(this).find('code').html(),
        number = '';
    for (var a = 0; a < line.split('\n').length - count; a++) {
      console.log(a);
      number += '<span id="number">' + (a + 1) + '</span>\n';
    }
    $(this).find('span#numbers').html(number);
  });
}
