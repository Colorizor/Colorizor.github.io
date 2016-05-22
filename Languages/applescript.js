(function() {
  const data = {
    language: 'applescript',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: '([\'](.*?)[\']|[\"](.*?)[\"])',
        pat: /.+/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(about|above|after|against|and|around|as|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|0|then|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without|AppleScript|false|linefeed|return|pi|quote|result|space|tab|true)\b/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        keyword: /\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference)|POSIX file|POSIX path|(date|time) string|quoted form)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog)|^\s*return|text item delimiters|current application|missing value)\b/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /\b(alias|application|boolean|class|constant|date|file|integer|list|number|real|record|string|text|activate|beep|count|delay|launch|log|offset|read|round|run|say|summarize|write|character|characters|contents|day|frontmost|item|length|month|name|paragraph|paragraphs|rest|reverse|running|time|version|weekday|word|words|year)\b/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        custom: '((([\(][\*]((|\\n+)[\(][\*]|))([\\s\\S]*?)(([\*][\)](\\n+|)|)[\*][\)])|[\-][\-].+)',
        pat: /([\s\S]+)/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: '([\-]?)(\\b[0][Xx][a-fA-F\\d]+|([\#]?\\b[\\d]+([\.][\\d]*)?\\b|[\.][\\d]+)([Ee][\-\+]?[\\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
        pat: /.+/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\(][\*]', exclude: true},
        end: {pat: '[\*][\)][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\-][\-]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();
