(function() {
  const data = {
    language: 'apache',
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
        keyword: /\b(order|deny|allow|setenv|rewriterule|rewriteengine|rewritecond|documentroot|sethandler|errordocument|loadmodule|options|header|listen|serverroot|servername|on|off|all)\b/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        begin: {pat: '([\$\%][\{])', exclude: true},
        end: {pat: '[\}]', exclude: true},
        pat: /([\w]+)/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        begin: {pat: '\\s[\\[]', exclude: true},
        end: {pat: '[\\]]', exclude: true},
        pat: /([\w]+)/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /[\$\%]\\d+/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /[\#].+/gm,
        rep: '<span id="comment">$&</span>'
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
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\#]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
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
  clz.Colorize(data);
})();
