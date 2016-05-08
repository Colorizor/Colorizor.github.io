(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&\/', /[\'\"\<\>]/igm],
    ['\:\/\\\/', /\:\/\//igm],
    //Syntax
    ['<span id="value">$&</span>', /(\\\'\/(.*?)\\\'\/|\\\"\/(.*?)\\\"\/)/igm],
    ['<span id="reserved">$&</span>', /\b(as|break|case|catch|class|const|continue|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with|true|false|null|undefined)\b/igm],
    ['<span id="parameter">$&</span>', /([\w]+)(?=\:)/igm],
    ['<span id="selector">$&</span>', /([\w]+)(?=[\(])/igm],
    ['<span id="comment">$&</span>', /\/\*([\s\S]+)\*\//igm],
    ['<span id="comment">$&</span>', /\/\/.+/igm],
    ['<span id="unit">$&</span>', /([\d]|\-[\d]|\.\d)+/igm],
    //Clean
    ['', /(?:(?!([\s\S]+)\/\*))(\<span(.*?)\>|\<\/span\>)(?=([\s\S]*?)\*\/)/igm],
    ['', /(?:(?!.*?\/\/))(\<span(.*?)\>|\<\/span\>)(?=(.*?)\<\/span\>$)/igm],
    ['', /(?:(?!.*?\\\'\/.+\'\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\\'\/)/igm],
    ['', /(?:(?!.*?\\\"\/.+\"\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\\"\/)/igm],
    //Fix Characters
    ['\'', /\\\'\//igm],
    ['\"', /\\\"\//igm],
    ['&lt;', /\\\<\//igm],
    ['&gt;', /\\\>\//igm],
    ['\:\/\/', /\:\/\\\//igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="actionscript"]'), function() {
    //--------------------------------------------------SIZING
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //--------------------------------------------------FIND
    for (a = 0; a < regex.length; a++) {
      var str = $(this).html();
      str = str.replace(regex[a][1], regex[a][0]);
      $(this).html(str);
    }
  });
})();
