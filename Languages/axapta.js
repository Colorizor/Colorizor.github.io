var axapta = (function() {
  const data = {
    language: 'axapta',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      },
      {
        pat: /[\\][\']/gm,
        rep: '$SQ$'
      },
      {
        pat: /[\\][\"]/gm,
        rep: '$DQ$'
      }
    ],
    execute: [
      {
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        custom: '[\#]([\\w]+)',
        pat: /([\w]+)/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        custom: '[\(](.*?)[\)]',
        pat: /([\w]+)/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /\b(false|int|abstract|private|char|boolean|static|null|if|for|true|while|long|throw|finally|protected|final|return|void|enum|else|break|new|catch|byte|super|case|short|default|double|public|try|this|switch|continue|reverse|firstfast|firstonly|forupdate|nofetch|sum|avg|minof|maxof|count|order|group|by|asc|desc|index|hint|like|dispaly|edit|client|server|ttsbegin|ttscommit|str|real|date|container|anytype|common|div|mod)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /([\w]+)(?=[\(])/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /[\/][\/].+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        nested: 'comment',
        begin: '[\/][\*]',
        end: '[\*][\/]'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\/]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      },
      {
        begin: {pat: '([\/][\*])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\*][\/])', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      },
      {
        pat: /[\$][S][Q][\$]/gm,
        rep: '\\\''
      },
      {
        pat: /[\$][D][Q][\$]/gm,
        rep: '\\\"'
      }
    ]
  };
  return {
    Colorize: function() {
      clz.Colorize(data);
    },
    Editorize: function(object) {
      clz.Colorize(data, $(object));
    }
  };
})();
axapta.Colorize();
