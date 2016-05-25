$(window).load(function() {
  $.each($('pre:not([nokeyword])').find('code'), function() {
    var block = $(this).html();
    block = block.replace(/[\@]clz[\-]/gm, '<span id="none">');
    block = block.replace(/[\-]clz[\@]/gm, '</span>');
    $(this).html(block);
  });
});
