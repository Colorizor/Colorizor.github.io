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
        custom: '([\/][\*]((|\\n+)[\/][\*]|))([\\s\\S]*?)(([\*][\/](\\n+|)|)[\*][\/])',
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
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\*]', exclude: true},
        end: {pat: '[\*][\/][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '\<', exclude: true},
        end: {pat: '\>', exclude: true},
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
