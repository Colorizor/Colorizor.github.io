//================================================================================
//====================================Editable====================================
//================================================================================
$('pre:not([noeditable])').mousedown(function(event) {
  $(this).find('code').contextmenu(function() {
    return false;
  });
  switch (event.which) {
    case 3:
      if (!$(this).find('code').find('style').attr('contenteditable')) {
        $(this).find('code').html('<style spellcheck="false">' + $(this).find('code').html() + '</style>');
        $(this).find('code').find('style').attr('contenteditable', 'true');
      } else {
        $(this).find('code').find('style').removeAttr('contenteditable');
      }
      break;
    default:
      break;
  }
});
