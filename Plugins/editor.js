$('pre:not([noeditor])').keyup(function() {
  var lang = $(this).find('code[contenteditable]').attr('language'),
      func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    GetCursor($(this).find('code[contenteditable]'));
    func.apply(null, $(this).find('code[contenteditable]'));
    SetCursor($(this).find('code[contenteditable]'));
  }
});
function GetCursor(object) {
  var offset = 0,
      element = $(object).get(0);
  if (document.selection) {
    var range = document.selection.createRange(),
        caret = document.body.createRange();
    caret.moveToElementText(element);
    caret.setEndPoint('EndToEnd', range);
    offset = caret.text.length;
  } else {
    var range = window.getSelection().getRangeAt(0),
        caret = range.cloneRange();
    caret.selectNodeContents(element);
    caret.setEnd(range.endContainer, range.endOffset);
    offset = caret.toString().length;
  }
  $(object).attr('cursor', offset.toString());
}
function SetCursor(object) {
  var offset = parseInt($(object).attr('cursor'), 10),
      element = $(object).get(0),
      nodes = [];
  function Nodes(current) {
    for (var a = 0; a < current.childNodes.length; a++) {
      var child = current.childNodes[a];
      if (child.nodeType == 3) {
        nodes.push(child.nodeValue);
      } else {
        Nodes(child);
      }
    }
  }
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.collapse(true);
    range.moveEnd('character', offset);
    range.moveStart('character', offset);
    range.select();
  } else {
    Nodes(element);
    var range = document.createRange(),
        count = 0,
        endCount = 0,
        started = false;
    range.collapse(true);
    range.selectNodeContents(element);
    for (var a = 0; a < nodes.length; a++) {
      var node = nodes[a];
      endCount = count + node.length;
      if (!started && offset >= count && (offset < endCount || (offset == endCount && a <= nodes.length))) {
        range.setStart(node, offset - count);
        started = true;
      }
      if (started && offset <= endCount) {
        range.setEnd(node, offset - count);
        break;
      }
      count = endCount;
    }
    window.getSelection().removeAllRanges().addRange(range);
  }
}
//^([^\S\n]){1,}(?=[\S])
