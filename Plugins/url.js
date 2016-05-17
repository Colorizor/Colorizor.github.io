//================================================================================
//=======================================URL======================================
//================================================================================
$.each($('pre:not([nourl])').find('code'), function() {
  var block = $(this).html();
  block = block.replace(/\[(.*?)\]\[(?=(.*?)(ftp|https|http)\:)(.*?)\]/igm, function(match) {
    var split = match.split('][');
    var title = $.trim(split[0].split('[')[1]);
    var link = $.trim(split[1].split(']')[0]);
    return '<a id="url" href="' + link + '" target="_blank">' + title + '</a>';
  });
  $(this).html(block);
});
