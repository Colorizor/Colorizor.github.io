//================================================================================
//=====================================Select=====================================
//================================================================================
$('pre:not([noselect])').find('code').click(function() {
  var select = $(this).attr('contenteditable');
  if (!select || select == 'false') {
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
  }
});
