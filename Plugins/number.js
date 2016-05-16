//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  var string = $(this).html();
  string = string.replace(/([\s\S]+)/igm, '<span id="numbers"></span><span id="coding">$&</span>');
  $(this).html(string);
});

$.each($('pre:not([nonumber])'), function() {
  var lines = $(this).find('code').html().split('\n');
  
  for (var a = 0; a < lines.length + 1; a++) {
    var string = $(this).find('span[id="numbers"]').html();
    $(this).find('span[id="numbers"]').html(string + '<span id="number">' + (a + 1) + '</span>\n');
  }
});


/*
//================================================================================
//=====================================Number=====================================
//================================================================================
$.each($('pre:not([nonumber])').find('code'), function() {
  var str = $(this).html();
  str = str.replace(/([\s\S]+)/igm, '<span id="numbers"></span><span id="coding">$&</span>');
  $(this).html(str);
});

$.each($('pre:not([nonumber])').find('span[id="coding"]'), function(line) {
  $(this).html(function(index, html) {
    return html.replace(/(^\n|.+)/igm, '<span id="code">$&</span>');
  });

  line = 0;

  $.each($(this).find('span[id="code"]'), function() {
    line++;
    var str = $($(this).parent().parent().find('span[id="numbers"]')).html();
    $($(this).parent().parent().find('span[id="numbers"]')).html(str + '<span id="number">' + line + '</span>\n');
  });
});
*/
