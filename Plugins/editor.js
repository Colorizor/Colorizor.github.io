$('pre:not([noeditor])').keyup(function() {
  var lang = $(this).find('code[contenteditable]').attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    func.apply(null, $(this).find('code[contenteditable]'));
    GetCursor($(this).find('code[contenteditable]'));
    SetCursor($(this).find('code[contenteditable]'));
  }
});
function GetCursor(object) {
  var offset = 0;
  var element = $(object).get(0);
  if (document.selection) {
    var range = document.selection.createRange();
    var caret = document.body.createRange();
    caret.moveToElementText(element);
    caret.setEndPoint('EndToEnd', range);
    offset = caret.text.length;
  } else {
    var range = window.getSelection().getRangeAt(0);
    var caret = range.cloneRange();
    caret.selectNodeContents(element);
    caret.setEnd(range.endContainer, range.endOffset);
    offset = caret.toString().length;
  }
  $(object).attr('cursor', offset.toString());
}
function SetCursor(object) {
  var offset = parseInt($(object).attr('Cursor'), 10);
  var element = $(object).get(0);
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.moveStart('character', offset);
    range.moveEnd('character', offset);
    range.select();
  } else {
    var range = document.createRange();
    range.setStart(element, offset);
    range.setEnd(element, offset);
    window.getSelection().addRange(range);
  }
}
//^([^\S\n]){1,}(?=[\S])
