var keyword = (function() {
  return {
    Init: function() {
      $.each($('pre:not([nokeyword])').find('code'), function() {
        var block = $(this).html();
        block = block.replace(/[\@]clz[\-]/gm, '<span id="none">');
        block = block.replace(/[\-]clz[\@]/gm, '</span>');
        $(this).html(block);
      });
    },
    Colorize: function(object) {
      var block = $(object).find('code').html();
      block = block.replace(/[\@]clz[\-]/gm, '<span id="none">');
      block = block.replace(/[\-]clz[\@]/gm, '</span>');
      $(object).find('code').html(block);
    }
  };
})();
keyword.Init();
