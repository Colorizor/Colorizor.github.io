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
$('pre:not([noeditable])').mousedown(function(event) {
  $(this).find('code').contextmenu(function() {
    return false;
  });
  switch (event.which) {
    case 3:
      var editable = $(this).find('code').attr('contenteditable');
      if (!editable) {
        $(this).find('code').attr('contenteditable', 'true');
      } else {
        $(this).find('code').removeAttr('contenteditable');
      }
      break;
    default:
      break;
  }
});
