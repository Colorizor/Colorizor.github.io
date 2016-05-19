(function() {
  const data = {
    language: 'actionscript',
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
        keyword: /\b(as|break|case|catch|class|const|continue|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with|true|false|null|undefined)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        custom: '([\\w]+)(?=[\:])',
        pat: /([\w]+)/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        custom: '([\\w]+)(?=[\(])',
        pat: /([\w]+)/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        custom: '([\/][\*]([\\s\\S]*?)[\*][\/]|[\/][\/].+)',
        pat: /([\s\S]+)/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: '((\\d|[\-]\\d|[\.]\\d)+)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
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
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\*]', exclude: true},
        end: {pat: '[\*][\/][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\/]', exclude: true},
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
