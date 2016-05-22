(function() {
  const data = {
    language: 'css',
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
        keyword: /([\w\-]+)(?=(\n{0,}.*?)[\{])/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        begin: {pat: '[\{](\\n{0,}.+)', exclude: true},
        end: {pat: '[\}]', exclude: true},
        pat: /([\w\-]+)(?=(.*?)[\:])/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        begin: {pat: '[\{](\\n{0,}.+)', exclude: true},
        end: {pat: '[\}]', exclude: true},
        pat: /(?!(.*?)[\:])([\w\-]+[\(]|[\)])/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        begin: {pat: '[\{](\\n{0,}.+)', exclude: true},
        end: {pat: '[\}]', exclude: true},
        pat: /(?!(.*?)[\:])([\w\-]+)/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        custom: '([\-]?)(\\b[0][Xx][a-fA-F\\d]+|([\#]?\\b[\\d]+([\.][\\d]*)?\\b|[\.][\\d]+)([Ee][\-\+]?[\\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
        pat: /.+/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        nested: 'comment',
        begin: '[\/][\*]',
        end: '[\*][\/]'
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
        custom: '[\\\[](.*?)[\\\]]',
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]attribute[\"][\>]', exclude: true},
        end: {pat: '[\(][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '([\(][\*])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\*][\)])', exclude: true},
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
