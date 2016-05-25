(function() {
  const data = {
    language: 'dos',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: '[\"]([\\s\\S]*?)[\"]',
        pat: /[\%](?=([\w]+)[\%])(.*?)[\%]/gm,
        rep: '\"$&\"'
      },
      {
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(if|else|goto|for|in|do|call|exit|not|exist|errorlevel|defined|equ|neq|lss|leq|gtr|geq)\b/igm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        keyword: /\b(prn|nul|lpt3|lpt2|lpt1|con|com4|com3|com2|com1|aux|shift|cd|dir|echo|setlocal|endlocal|set|pause|copy|append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|date|dir|diskcomp|diskcopy|doskey|erase|fs|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|print|popd|pushd|promt|rd|recover|rem|rename|replace|restore|rmdir|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|ping|net|ipconfig|taskkill|xcopy|ren|del)\b/igm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /([\%][\%]|[\%](?=([\w]+)[\%])|[\!](?=([\w]+)[\!]))([\w]+)([\%]|[\!])?/igm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /^[\:]([\w]+)/igm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /(([\@])?[Rr][Ee][Mm]|[\:]{2,}).+/gm,
        rep: '<span id="comment">$&</span>'
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
        custom: '[\"][\<][\/]span[\>][\%]',
        pat: /[\"][\<][\/]span[\>]/gm,
        rep: '<\/span>'
      },
      {
        custom: '[\%][\<]span(.*?)[\>][\"]',
        pat: /[\<]span(.*?)[\>][\"]/gm,
        rep: '<span id="value">'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>](([\@])?[Rr][Ee][Mm]|[\:]{2,})', exclude: true},
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
