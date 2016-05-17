//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  var lines = $(this).html().split('\n');
  var block = '<table id="number">';
  for (var a = 0; a < lines.length; a++) {
    block += '<tr><td id="unselect">' + (a + 1) + '</td><td id="select">' + lines[a] + '</td></tr>';
  }
  block += '</table>';
  $(this).html(block);
});
