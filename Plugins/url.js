//================================================================================
//=======================================URL======================================
//================================================================================
$.each($('pre:not([nourl])').find('code'), function() {
  var block = $(this).html();
  block = block.replace(/\[(.*?)\]\[(?=(.*?)(ftp|https|http)\:)(.*?)\]/igm, function(match) {
    var split = match.split('][');
    var title = split[0].split('[')[1];
    var link = split[1].split(']')[0];
    return '<a id="url" href="' + link.trim() + '" target="_blank">' + title.trim() + '</a>';
  });
  $(this).html(block);
});
