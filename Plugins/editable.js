//================================================================================
//====================================Editable====================================
//================================================================================
$('pre:not([noeditable])').dblclick(function() {
  var editable = $(this).attr('contenteditable');
  if (!editable || editable != 'true') {
    $(this).attr('contenteditable', 'true');
  } else {
    $(this).attr('contenteditable', 'false');
  }
});
