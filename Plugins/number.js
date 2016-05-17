//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  var lines = $(this).html().split('\n');
  var string = '<table id="numbering">';
  
  for (var a = 0; a < lines.length; a++) {
    string += '<tr id="line"><td id="number">' + (a + 1) + '</td><td id="code">' + lines[a] + '</td></tr>';
  }
  
  string += '</table>';
  $(this).html(string);
});
