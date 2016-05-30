var regex = (function() {
  function Escape(value) {
    return value.replace(/[\-\/\\\^\$\*\+\?\.\(\)\|\[\]\{\}]/gm, '\\$&');
  }
  return {
    Init: function() {
      $.each($('pre:not([noregex])').find('code'), function() {
        var block = $(this).html(),
            comment = new RegExp('\<span id\=\"comment\"\>[\/][\/]', 'gm');
        block = block.replace(/[\:][\/][\/]/gm, ':\\\\');
        block = block.replace(/.+/gm, function(line) {
          var temp = line;
          if (line.match(comment) != null) {
            temp = line.replace(comment, '//');
            temp = temp.replace(/[\/][\/](?![igmuy])(.*?)\<\/span\>$/gm, '<span id="comment">$&');
          }
          return temp.replace(/[\/](?![\/][^gimuy])(?!([\w]+)(\>|\&gt\;))([\w\d\S]+)?[\/](?!([\w]+)(\>|\&gt\;))([gimuy]+)?/gm, function(match) {
            if (line.match(new RegExp('\<span id\=\"value\"\>(.*?)'+Escape(match)+'(.*?)\<\/span\>', 'gm')) != null) {
              return match;
            } else {
              return '<span id="regex">'+match+'</span>';
            }
          });
        });
        block = block.replace(/[\:][\\][\\]/gm, '://');
        $(this).html(block);
      });
    },
    Colorize: function(object) {
      var block = $(object).find('code').html(),
          comment = new RegExp('\<span id\=\"comment\"\>[\/][\/]', 'gm');
      block = block.replace(/[\:][\/][\/]/gm, ':\\\\');
      block = block.replace(/.+/gm, function(line) {
        var temp = line;
        if (line.match(comment) != null) {
          temp = line.replace(comment, '//');
          temp = temp.replace(/[\/][\/](?![igmuy])(.*?)\<\/span\>$/gm, '<span id="comment">$&');
        }
        return temp.replace(/[\/](?![\/][^gimuy])(?!([\w]+)(\>|\&gt\;))([\w\d\S]+)?[\/](?!([\w]+)(\>|\&gt\;))([gimuy]+)?/gm, function(match) {
          if (line.match(new RegExp('\<span id\=\"value\"\>(.*?)'+Escape(match)+'(.*?)\<\/span\>', 'gm')) != null) {
            return match;
          } else {
            return '<span id="regex">'+match+'</span>';
          }
        });
      });
      block = block.replace(/[\:][\\][\\]/gm, '://');
      $(object).find('code').html(block);
    }
  };
})();
regex.Init();
