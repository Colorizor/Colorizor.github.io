(function() {
  const data = {
    language: 'accesslog',
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
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"]|[\[](.*?)[\]])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)\b/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\\\[]', exclude: true},
        end: {pat: '[\\\]][\<][\/]span[\>]', exclude: true},
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
