//================================================================================
//=====================================Select=====================================
//================================================================================
$('pre:not([noselect])').click(function() {
  if (!$(this).find('code').attr('contenteditable')) {
    if (document.selection) {
      var block = document.body.createTextRange();
      block.moveToElementText($(this).find('code')[0]);
      block.select();
    } else {
      var block = document.createRange();
      block.setStartBefore($(this).find('code')[0]);
      block.setEndAfter($(this).find('code')[0]);
      window.getSelection().addRange(block);
    }
  }
});
