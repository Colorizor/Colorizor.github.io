$.each($('pre:not([noemail])').find('code'), function() {
  var block = $(this).html(),
  normal = '\\b(([\\w\\d\.\_\%\+\-]+)[\@]([\\w\\d\.\-]+)([\.][\\w]{2,}))\\b',
  custom = '[\\\[](.*?)[\\\]][\\\[](?=(.*?)([\\w]+)[\@])(.*?)[\\\]]';
  block = block.replace(new RegExp('('+custom+'|'+normal+')', 'gm'), function(match) {
    if (match.match(new RegExp('^'+normal+'$', 'gm')) != null) {
      return '<a id="url" href="mailto:'+match+'">'+match+'</a>';
    } else {
      var split = match.split('][');
      var title = split[0].split('[')[1];
      var email = split[1].split(']')[0];
      return '<a id="url" href="mailto:'+email.trim()+'">'+title.trim()+'</a>';
    }
  });
  $(this).html(block);
});
