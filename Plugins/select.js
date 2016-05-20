//================================================================================
//=====================================Select=====================================
//================================================================================
$('pre:not([noselect])').find('code:not([contenteditable="false"])').click(function() {
  if (document.selection) {
    var block = document.body.createTextRange();
    block.moveToElementText($(this)[0]);
    block.select();
  } else {
    var block = document.createRange();
    block.setStartBefore($(this)[0]);
    block.setEndAfter($(this)[0]);
    window.getSelection().addRange(block);
  }
});
