//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  //Variable
  var lines = $(this).html().split('\n');
  //Opening
  var number = '<table id="numbering">';
  var code = '<table id="numbering" class="select">';
  //Table Data
  for (var a = 0; a < lines.length; a++) {
    number += '<tr id="line"><td id="number">' + (a + 1) + '</td></tr>';
    code += '<tr id="line"><td id="code">' + lines[a] + '</td></tr>';
  }
  //Closing
  number += '</table>';
  code += '</table>';
  var block = '<table><tr><td>' + number + '</td><td>' + code + '</td></tr></table>';
  //Save
  $(this).html(block);
});
