$('pre:not([noeditor])').keyup(function() {
  var lang = $(this).find('code[contenteditable]').attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    func.apply(null, $(this).find('code[contenteditable]'));
    Cursor($(this));
  }
});
function Cursor(object) {
  var offset = 0;
  object = $(object).get(0);
  if (document.selection) {
    var range = document.selection.createRange();
    var caret = document.body.createRange();
    caret.moveToElementText(object);
    caret.setEndPoint('EndToEnd', range);
    offset = caret.text.length;
  } else {
    var range = window.getSelection().getRangeAt(0);
    var caret = range.cloneRange();
    caret.selectNodeContents(object);
    caret.setEnd(range.endContainer, range.endOffset);
    offset = caret.toString().length;
  }
  alert(offset);
}
//^([^\S\n]){1,}(?=[\S])
