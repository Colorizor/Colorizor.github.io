(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&\/', /[\'\"]/igm],
    [':\/\\\/', /\:\/\//igm],
    //Syntax
    ['<span class="value">$&</span>', /\\(\'|\")\/([\s\S]*?)\\(\'|\")\//igm],
    ['<span class="reserved">$&</span>', /\b(abstract|arguments|boolean|break|byte|case|catch|char|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)\b/igm],
    ['<span class="reserved">$&</span>', /\b(alert|all|anchor|anchors|area|assign|blur|button|checkbox|clearInterval|clearTimeout|clientInformation|close|closed|confirm|constructor|crypto|decodeURI|decodeURIComponent|defaultStatus|document|element|elements|embed|embeds|encodeURI|encodeURIComponent|escape|event|fileUpload|focus|form|forms|frame|innerHeight|innerWidth|layer|layers|link|location|mimeTypes|navigate|navigator|frames|frameRate|hidden|history|image|images|offscreenBuffering|open|opener|option|outerHeight|outerWidth|packages|pageXOffset|pageYOffset|parent|parseFloat|parseInt|password|plugin|prompt|propertyIsEnum|radio|reset|screenX|screenY|scroll|secure|select|self|setInterval|setTimeout|status|submit|taint|text|textarea|top|unescape|untaint|window)\b/igm],
    ['<span class="parameter">$&</span>', /\b(Array|Date|eval|function|hasOwnProperty|Infinity|isFinite|isNaN|isPrototypeOf|length|Math|NaN|name|Number|Object|prototype|String|toString|undefined|valueOf)\b/igm],
    ['<span class="parameter">$&</span>', /\b(onblur|onclick|onerror|onfocus|onkeydown|onkeypress|onkeyup|onmouseover|onload|onmouseup|onmousedown|onsubmit)\b/igm],
    ['<span class="selector">$&</span>', /([\w]+)(?=[\(])/igm],
    ['<span class="comment">$&</span>', /\/\/.+/igm],
    ['<span class="unit">$&</span>', /([\d]|\-[\d]|\.\d)+/igm],
    //Clean
    ['', /(?:(?!.*?\/\/))(\<span(.*?)\>|\<\/span\>)(?=(.*?)\<\/span\>$)/igm],
    ['', /(?:(?!.*?\\[\'\"]\/.+[\'\"]\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\[\'\"]\/)/igm],
    //Fix Characters
    ['\'', /\\\'\//igm],
    ['\"', /\\\"\//igm],
    ['\:\/\/', /\:\/\\\//igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="javascript"]'), function() {
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
