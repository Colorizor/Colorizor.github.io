//================================================================================
//====================================Editable====================================
//================================================================================
/*$('pre:not([noeditable])').find('code').dblclick(function() {
  var editable = $(this).find('code').attr('contenteditable');
  if (!editable || editable != 'true') {
    $(this).find('code').attr('contenteditable', 'true');
  } else {
    $(this).find('code').attr('contenteditable', 'false');
  }
});*/
$('pre:not([noeditable])').find('code').mousedown(function(event) {
  $(this).contextmenu(function() {
    return false;
  });
  switch (event.which) {
    case 3:
      var editable = $(this).attr('contenteditable');
      if (!editable) {
        $(this).attr('contenteditable', 'true');
      } else {
        $(this).removeAttr('contenteditable');
      }
      break;
    default:
      break;
  }
});
