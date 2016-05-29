var number = (function(object) {
  return {
    Colorize: function() {
      var block = $(object).html(),
          line = $(object).find('code').html(),
          number = '';
      for (var a = 0; a < line.split('\n').length; a++) {
        number += '<span id="number">'+(a + 1)+'</span>\n';
      }
      block = '<span id="numbers">'+number+'</span><span id="coding">'+block+'</span>';
      $(object).html(block);
    }
  };
})();
