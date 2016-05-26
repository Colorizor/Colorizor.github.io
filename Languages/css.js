(function() {
  const data = {
    language: 'css',
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
        keyword: /([\w\-]+)(?=(\n{0,}.*?)[\{])/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        begin: {pat: '[\{](((\\s{0,}.*?)?)[\{])?', exclude: true},
        end: {pat: '([\}]((\\s{0,}.*?)?))?[\}]', exclude: true},
        pat: /([\w\-]+)(?=.?[\:])/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        begin: {pat: '[\{](((\\s{0,}.*?)?)[\{])?', exclude: true},
        end: {pat: '([\}]((\\s{0,}.*?)?))?[\}]', exclude: true},
        pat: /([\w\-]+[\(]|[\)])/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        begin: {pat: '[\{](((\\s{0,}.*?)?)[\{])?', exclude: true},
        end: {pat: '([\}]((\\s{0,}.*?)?))?[\}]', exclude: true},
        pat: /[\:](.*?)(?=[\;\n\}])/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        nested: 'comment',
        begin: '[\/][\*]',
        end: '[\*][\/]'
      },
      {
        keyword: /[\<]span[\s]id[\=][\"]parameter[\"][\>][\:]/gm,
        rep: ':<span id="parameter">'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /\<(\/)?span(.*?)?\>/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /\<(\/)?span(.*?)?\>/gm,
        rep: ''
      },
      {
        custom: '[\\\[](.*?)[\\\]]',
        pat: /\<(\/)?span(.*?)?\>/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]attribute[\"][\>]', exclude: true},
        end: {pat: '[\(][\<][\/]span[\>]', exclude: true},
        pat: /\<(\/)?span(.*?)?\>/gm,
        rep: ''
      },
      {
        begin: {pat: '([\(][\*])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\*][\)])', exclude: true},
        pat: /\<(\/)?span(.*?)?\>/gm,
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
  clz.Colorize(data);
})();
