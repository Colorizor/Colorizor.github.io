//================================================================================
//=====================================Select=====================================
//================================================================================
$('pre:not([noselect])').mousedown(function(event) {
  $(this).find('code').contextmenu(function() {
    return false;
  });
  switch (event.which) {
    case 1:
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
      break;
    default:
      break;
  }
});
