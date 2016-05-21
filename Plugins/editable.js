//================================================================================
//====================================Editable====================================
//================================================================================
$('pre:not([noeditable])').dblclick(function() {
  var editable = $(this).find('code').attr('contenteditable');
  if (!editable || editable != 'true') {
    $(this).find('code').attr('contenteditable', 'true');
  } else {
    $(this).find('code').attr('contenteditable', 'false');
  }
});
