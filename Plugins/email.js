$.each($('pre:not([noemail])').find('code'), function() {
  var block = $(this).html();
  block = block.replace(/\b(([\w\d\.\_\%\+\-]+)[\@]([\w\d\.\-]+)([\.][\w]{2,}))\b/gm, '<a id="url" href="mailto:$&">$&</a>');
  $(this).html(block);
});
