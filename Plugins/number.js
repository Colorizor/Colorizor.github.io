$.each($('pre:not([nonumber])'), function() {
  var block = $(this).html(),
      line = $(this).find('code').html(),
      number = '';
  for (var a = 0; a < line.split('\n').length; a++) {
    number += '<span id="number">'+(a + 1)+'</span>\n';
  }
  block = '<span id="numbers">'+number+'</span><span id="coding">'+block+'</span>';
  $(this).html(block);
});
