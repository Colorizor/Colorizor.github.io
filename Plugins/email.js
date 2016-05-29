var email = (function() {
  return {
    Init: function() {
      $.each($('pre:not([noemail])').find('code'), function() {
        var block = $(this).html(),
            normal = '\\b(([\\w\\d\.\_\%\+\-]+)[\@]([\\w\\d\.\-]+)([\.][\\w]{2,}))\\b',
            custom = '[\\\[](.*?)[\\\]][\\\[](?=(.*?)([\\w]+)[\@])(.*?)[\\\]]';
        block = block.replace(new RegExp('('+custom+'|'+normal+')', 'gm'), function(match) {
          if (match.match(new RegExp('^'+normal+'$', 'gm')) != null) {
            return '<a id="url" href="mailto:'+match+'">'+match+'</a>';
          } else {
            var split = match.split(']['),
                title = split[0].split('[')[1],
                email = split[1].split(']')[0];
            return '<a id="url" href="mailto:'+email.trim()+'">'+title.trim()+'</a>';
          }
        });
        $(this).html(block);
      });
    },
    Colorize: function(object) {
      var block = $(object).find('code').html(),
          normal = '\\b(([\\w\\d\.\_\%\+\-]+)[\@]([\\w\\d\.\-]+)([\.][\\w]{2,}))\\b',
          custom = '[\\\[](.*?)[\\\]][\\\[](?=(.*?)([\\w]+)[\@])(.*?)[\\\]]';
      block = block.replace(new RegExp('('+custom+'|'+normal+')', 'gm'), function(match) {
        if (match.match(new RegExp('^'+normal+'$', 'gm')) != null) {
          return '<a id="url" href="mailto:'+match+'">'+match+'</a>';
        } else {
          var split = match.split(']['),
              title = split[0].split('[')[1],
              email = split[1].split(']')[0];
          return '<a id="url" href="mailto:'+email.trim()+'">'+title.trim()+'</a>';
        }
      });
      $(object).find('code').html(block);
    }
  };
})();
email.Init();
