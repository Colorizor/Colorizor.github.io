(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    ['<span comment>$&</span>', /\/\*([\s\S]*?)\*\//igm],
    ['<span value>$&</span>', /(\'|\")([\s\S]*?)(\'|\")/igm],
    ['<span reserved>$&</span>', /([\w\d\.\#].+)(?=\{)/igm],
    ['<span selector>$&</span>', /([\w\d\-\[\]\(\)]+)(?!.*?(\{))(?=\:)/igm],
    ['<span attribute>$&</span>', /(?:[^\:\W\d])([\w]+)(?=(\;|\,))/igm],
    ['<span digit>$&</span>', /([\d\.]+)(em|ex|\%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm],
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=[\s\'\"\(\)\{\}\[\]])/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb|hsla|hsl)\(([\s\S]*?)\)|\#([\w\d]){6})(?!.*?\{)/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="css"]'), function() {
    //--------------------------------------------------FETCH
    var str = $(this).html();
    //--------------------------------------------------SIZING
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //--------------------------------------------------FIND
    for (a = 0; a < regex.length; a++) {
      str = str.replace(regex[a][1], regex[a][0]);
    }
    //--------------------------------------------------SAVE
    $(this).html(str);
  });
})();
