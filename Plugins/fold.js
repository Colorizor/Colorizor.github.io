//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').click(function() {
  console.log(!$(this).attr('block') == true);
  if (!$(this).attr('block')) {
    console.log(!$(this).attr('block') == true);
    $(this).attr('block', $(this).html());
    $(this).html(' ... ');
  } else {
    $(this).html($(this).attr('block'));
    $(this).removeAttr('block');
  }
});
