//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').click(function() {
  $.each($(this), function() {
    if (!$(this).attr('block') || $(this).attr('block') == '') {
      $(this).attr('block', $(this).html());
      $(this).html(' ... ');
    } else {
      $(this).html($(this).attr('block'));
      $(this).removeAttr('block');
    }
  });
});
