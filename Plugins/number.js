//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  var string = $(this).html();
  string = string.replace(/([\s\S]+)/igm, '<span id="numbers"></span><span id="coding">$&</span>');
  $(this).html(string);
});

$.each($('pre:not([nonumber])').find('code'), function() {
  var lines = $(this).find('span[id="coding"]').html().split('\n');
  
  for (var a = 0; a < lines.length; a++) {
    var string = $(this).find('span[id="numbers"]').html();
    $(this).find('span[id="numbers"]').html(string + '<span id="number">' + (a + 1) + '</span>\n');
  }
});
