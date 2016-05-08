(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&\/', /[\'\"\<\>]/igm],
    ['\:\/\\\/', /\:\/\//igm],
    //Syntax
    ['<span id="parameter">$&</span>', /\b(alias|application|boolean|class|constant|date|file|integer|list|number|real|record|string|text|activate|beep|count|delay|launch|log|offset|read|round|run|say|summarize|write|character|characters|contents|day|frontmost|id|item|length|month|name|paragraph|paragraphs|rest|reverse|running|time|version|weekday|word|words|year)\b/igm],
    ['<span id="value">$&</span>', /(\\\'\/(.*?)\\\'\/|\\\"\/(.*?)\\\"\/)/igm],
    ['<span id="attribute">$&</span>', /\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog)|^\s*return|text item delimiters|current application|missing value)\b/igm],
    ['<span id="reserved">$&</span>', /\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference)|POSIX file|POSIX path|(date|time) string|quoted form)\b/igm],
    ['<span id="parameter">$&</span>', /\b(about|above|after|against|and|around|as|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|0|then|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without|AppleScript|false|linefeed|return|pi|quote|result|space|tab|true)\b/igm],
    ['<span id="comment">$&</span>', /\(\*([\s\S]+)\*\)/igm],
    ['<span id="comment">$&</span>', /\-\-([\s\S]+)\$/igm],
    ['<span id="unit">$&</span>', /([\d]|\-[\d]|\.\d)+/igm],
    //Clean
    ['', /(?:(?!([\s\S]+)\(\*))(\<span(.*?)\>|\<\/span\>)(?=([\s\S]*?)\*\))/igm],
    ['', /(?:(?!([\s\S]+)\-\-))(\<span(.*?)\>|\<\/span\>)(?=([\s\S]*?)\$)/igm],
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
  $.each($('code[language="applescript"]'), function() {
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
