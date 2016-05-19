(function() {
  const data = {
    language: 'accesslog',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: '([\'](.*?)[\']|[\"](.*?)[\"]|[\\\[](.*?)[\\\]])',
        pat: /.+/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)\b/gm,
        rep: '<span id="selector">$&</span>'
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
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\\\[]', exclude: true},
        end: {pat: '[\\\]][\<][\/]span[\>]', exclude: true},
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
