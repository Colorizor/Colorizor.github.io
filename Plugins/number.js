var number = (function() {
  return {
    Init: function() {
      $.each($('pre:not([nonumber])'), function() {
        var block = $(this).html(),
            block = block.replace(/\<span(.*?)numbers(.*?)\>([\s\S]*?)\<\/span\>\<span(.*?)coding(.*?)\>/gm, ''),
            block = block.replace(/\<\/code\>\<\/span\>/gm, '</code>'),
            line = $(this).find('code').html(),
            number = '';
        for (var a = 0; a < line.split('\n').length; a++) {
          number += '<span id="number">'+(a + 1)+'</span>\n';
        }
        block = '<span id="numbers">'+number+'</span><span id="coding">'+block+'</span>';
        $(this).html(block);
      });
    },
    Colorize: function(object) {
      var block = $(object).html(),
          block = block.replace(/\<span(.*?)numbers(.*?)\>([\s\S]*?)\<\/span\>\<span(.*?)coding(.*?)\>/gm, ''),
          block = block.replace(/\<\/code\>\<\/span\>/gm, '</code>'),
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
number.Init();
