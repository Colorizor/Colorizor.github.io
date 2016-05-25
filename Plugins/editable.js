$('pre:not([noeditable])').mousedown(function(event) {
  $(this).find('code').contextmenu(function() {
    return false;
  });
  switch (event.which) {
    case 3:
      if (!$(this).find('code').attr('contenteditable')) {
        $(this).find('code').attr('contenteditable', 'true');
        $(this).find('code').attr('spellcheck', 'false');
      } else {
        $(this).find('code').removeAttr('contenteditable');
      }
      break;
    default:
      break;
  }
});
