//================================================================================
//=====================================RegEx======================================
//================================================================================
$.each($('pre:not([noregex])'), function() {
  var block = $(this).html();
  
  $(this).html(block);
});
