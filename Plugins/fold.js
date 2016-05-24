//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span[id="block"]').click(function() {
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
