//================================================================================
//=====================================Number=====================================
//================================================================================
/*$.each($('pre:not([nonumber])').find('code'), function() {
  var lines = $(this).html().split('\n');
  var block = '<table id="number">';
  for (var a = 0; a < lines.length; a++) {
    if (lines[a] != '') {
      block += '<tr><td id="unselect">' + (a + 1) + '</td><td id="select">' + lines[a] + '</td></tr>';
    } else {
      block += '<tr><td id="unselect">' + (a + 1) + '</td><td id="select"> </td></tr>';
    }
  }
  block += '</table>';
  $(this).html(block);
});
*/

$.each($('pre:not([nonumber])'), function() {
  var block = $(this).find('code').html(),
      number = '';
  for (var a = 0; a < lines.split('\n').length; a++) {
    number += '<span id="number">' + (a + 1) + '</span>\n';
  }
  block = '<span id="numbers">' + number + '</span><span id="coding">' + block + '</span>';
  $(this).html(block);
});
