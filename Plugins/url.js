var url = (function() {
  return {
    Init: function() {
      $.each($('pre:not([nourl])').find('code'), function() {
        var block = $(this).html(),
            normal = '\\b((ftp|http(s)?)[\:][\/]{2}([\\w\\d\.]+)([\/\?\&\\w\\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\\b',
            custom = '[\\\[](.*?)[\\\]][\\\[](?=(.*?)(ftp|http(s)?)[\:])(.*?)[\\\]]';
        block = block.replace(new RegExp('('+custom+'|'+normal+')', 'gm'), function(match) {
          if (match.match(new RegExp('^'+normal+'$', 'gm')) != null) {
            return '<a id="url" href="'+match+'" target="_blank">'+match+'</a>';
          } else {
            var split = match.split(']['),
                title = split[0].split('[')[1],
                link = split[1].split(']')[0];
            return '<a id="url" href="'+link.trim()+'" target="_blank">'+title.trim()+'</a>';
          }
        });
        $(this).html(block);
      });
    },
    Colorize: function(object) {
      var block = $(object).find('code').html(),
          normal = '\\b((ftp|http(s)?)[\:][\/]{2}([\\w\\d\.]+)([\/\?\&\\w\\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\\b',
          custom = '[\\\[](.*?)[\\\]][\\\[](?=(.*?)(ftp|http(s)?)[\:])(.*?)[\\\]]';
      block = block.replace(new RegExp('('+custom+'|'+normal+')', 'gm'), function(match) {
        if (match.match(new RegExp('^'+normal+'$', 'gm')) != null) {
          return '<a id="url" href="'+match+'" target="_blank">'+match+'</a>';
        } else {
          var split = match.split(']['),
              title = split[0].split('[')[1],
              link = split[1].split(']')[0];
          return '<a id="url" href="'+link.trim()+'" target="_blank">'+title.trim()+'</a>';
        }
      });
      $(object).find('code').html(block);
    }
  };
})();
url.Init();
