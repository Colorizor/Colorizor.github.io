$('pre:not([noeditor])').bind('keypress keyup', function(event) {
  var lang = $(this).find('code[contenteditable]').attr('language'),
      func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    Keypress($(this).find('code[contenteditable]'), event);
    func.apply(null, $(this).find('code[contenteditable]'));
    SetCursor($(this).find('code[contenteditable]'));
  }
});
function Keypress(object, event) {
  var count = 0;
  if (event.type == 'keypress' && event.keyCode == 13) {
    event.preventDefault();
    count = 1;
    var space = Space(),
        block = '\n'+space;
    Insert($(object), block);
  } else if (event.type == 'keypress' && event.keyCode == 40) {
    Insert($(object), ')');
  } else if (event.type == 'keypress' && event.keyCode == 123) {
    var space = Space(),
        block = '\n'+space+'    \n'+space+'}';
    Insert($(object), block);
  } else if (event.type == 'keypress' && event.keyCode == 91) {
    Insert($(object), ']');
  } else if (event.type == 'keyup' && event.keyCode == 222 && !event.shiftKey) {
    Insert($(object), '\'');
  } else if (event.type == 'keyup' && event.keyCode == 222 && event.shiftKey) {
    Insert($(object), '"');
  }
  GetCursor($(object), count);
}
function Space() {
  var space = '';
  if (document.selection) {
    
  } else {
    var select = document.getSelection(),
        node = select.anchorNode,
        block = node.textContent.slice(0, select.focusOffset),
        lines = block.split('\n'),
        line = lines[lines.length - 1].match(/^([\s]+)/gm);
    if (line != null) {
      space = line[0];
    } else {
      space = '';
    }
  }
  return space;
}
function Insert(object, value) {
  if (document.selection) {
    document.selection.createRange().text = value;
  } else {
    var select = window.getSelection(),
        range = select.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(value));
  }
}
function GetCursor(object, count) {
  var offset = 0,
      element = $(object).get(0);
  if (document.selection) {
    var range = document.selection.createRange(),
        caret = document.body.createRange();
    caret.moveToElementText(element);
    caret.setEndPoint('EndToEnd', range);
    offset = caret.text.length + count;
  } else {
    var range = window.getSelection().getRangeAt(0),
        caret = range.cloneRange();
    caret.selectNodeContents(element);
    caret.setEnd(range.endContainer, range.endOffset);
    offset = caret.toString().length + count;
  }
  $(object).attr('cursor', offset.toString());
}
function SetCursor(object) {
  var offset = parseInt($(object).attr('cursor'), 10),
      element = $(object).get(0);
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.collapse(true);
    range.moveEnd('character', offset);
    range.moveStart('character', offset);
    range.select();
  } else {
    var range = document.createRange(),
        nodes = Nodes(element),
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
    var select = window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
  }
}
function Nodes(node) {
  var nodes = [];
  if (node.nodeType == 3) {
    nodes.push(node);
  } else {
    var children = node.childNodes;
    for (var a = 0; a < children.length; a++) {
      nodes.push.apply(nodes, Nodes(children[a]));
    }
  }
  return nodes;
}
//^([^\S\n]){1,}(?=[\S])
