//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])'), function() {
  var block = $(this).html(),
      line = $(this).find('code').html(),
      number = '';
  for (var a = 0; a < line.split('\n').length; a++) {
    number += '<span id="number">' + (a + 1) + '</span>\n';
  }
  block = '<span id="numbers">' + number + '</span><span id="coding">' + block + '</span>';
  $(this).html(block);
});
var clznumber = (function() {
  return {
    Renumber: function() {
      $.each($('pre:not([nonumber])'), function() {
        var line = $(this).find('code').html(),
            number = '';
        for (var a = 0; a < line.split('\n').length; a++) {
          number += '<span id="number">' + (a + 1) + '</span>\n';
        }
        $(this).find('span#numbers').html(number);
      });
    }
  };
})();
