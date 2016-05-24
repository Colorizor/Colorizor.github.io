//================================================================================
//=====================================RegEx======================================
//================================================================================
$.each($('pre:not([noregex])').find('code'), function() {
  var block = $(this).html();
  block = block.replace(/.+/gm, function(line) {
    return line.replace(/[\/]([\w\d\S]*?)[\/]([gimuy]+)/gm, function(match) {
      var comment = new RegExp('\<span id\=\"comment\"\>[\/][\/]', 'gm'),
          value = new RegExp('\<span id\=\"value\"\>(.*?)' + match + '(.*?)\<\/span\>', 'gm');
      if (line.match(comment) != null) {
        var temp = line.replace(comment, '//');
        return temp.replace(/[\/][\/](?![igmuy])(.*?)\<\/span\>$/gm, '<span id="comment">$&');
      } else if (line.match(value) != null) {
        return match;
      } else {
        return '<span id="regex">' + match + '</span>';
      }
    });
  });
  $(this).html(block);
});
