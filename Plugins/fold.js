//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').mousedown(function(event) {
  switch (event.which) {
    case 1:
      if (!$(this).attr('block')) {
        $(this).attr('block', $(this).html());
        $(this).html('|---|');
      } else {
        $(this).html($(this).attr('block'));
        $(this).removeAttr('block');
      }
      clznumber.Renumber();
      break;
    default:
      break;
  }
});
