//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').mousedown(function(event) {
  $(this).contextmenu(function() {
    return false;
  });
  switch (event.which) {
    case 1:
      if (!$(this).attr('block')) {
        $(this).attr('block', $(this).html());
        $(this).html('|---|');
      } else {
        $(this).html($(this).attr('block'));
        $(this).removeAttr('block');
      }
      break;
    default:
      break;
  }
});
