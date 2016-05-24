//================================================================================
//=====================================RegEx======================================
//================================================================================
$.each($('pre:not([noregex])').find('code'), function() {
  var block = $(this).html(),
      comment = new RegExp('\<span id\=\"comment\"\>[\/][\/]', 'gm');
  block = block.replace(/.+/gm, function(line) {
    var temp = line;
    if (line.match(comment) != null) {
      temp = line.replace(comment, '//');
      temp = temp.replace(/[\/][\/](?![igmuy])(.*?)\<\/span\>$/gm, '<span id="comment">$&');
    }
    return temp.replace(/[\/]([\w\d\S]+)[\/]([gimuy]+)?/gm, function(match) {
      if (line.match(new RegExp('\<span id\=\"value\"\>(.*?)' + match + '(.*?)\<\/span\>', 'gm')) != null) {
        return match;
      } else {
        return '<span id="regex">' + match + '</span>';
      }
    });
  });
  $(this).html(block);
});
