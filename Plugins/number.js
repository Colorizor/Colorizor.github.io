//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  //Variable
  var lines = $(this).html().split('\n');
  //Opening
  var number = '<table class="line-height">';
  var code = '<table class="line-height" id="select">';
  //Table Data
  for (var a = 0; a < lines.length; a++) {
    number += '<tr><td>' + (a + 1) + '</td></tr>';
    code += '<tr><td>' + lines[a] + '</td></tr>';
  }
  //Closing
  number += '</table>';
  code += '</table>';
  var block = '<table class="line-height" id="numbering"><tr id="line"><td id="number">' + number + '</td><td id="code">' + code + '</td></tr></table>';
  //Save
  $(this).html(block);
});
