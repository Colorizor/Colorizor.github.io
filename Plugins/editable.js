//================================================================================
//====================================Editable====================================
//================================================================================
$('pre:not([noeditable])').dblclick(function() {
  var editable = $(this).attr('contenteditable');
  if (!editable) {
    $(this).attr('contenteditable', 'true');
  } else {
    $(this).attr('contenteditable', 'false');
  }
});
