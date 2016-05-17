//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  //Variable
  var lines = $(this).html().split('\n');
  //Opening
  var first = '<table>';
  var second = '<table>';
  //Table Data
  for (var a = 0; a < lines.length; a++) {
    first += '<tr><td>' + (a + 1) + '</td></tr>';
    second += '<tr><td>' + lines[a] + '</td></tr>';
  }
  //Closing
  first += '</table>';
  second += '</table>';
  var string = '<table id="numbering"><tr id="line"><td id="number">' + first + '</td><td id="code">' + second + '</td></tr></table>';
  //Save
  $(this).html(string);
});
