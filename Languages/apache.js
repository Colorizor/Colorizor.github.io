(function() {
  const data = {
    language: 'apache',
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
        custom: '[\#].+',
        pat: /.+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: '[\$\%]\\d+',
        pat: /.+/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        custom: '[\/](?!([\*]|span))(.*?)(?![\*])[\/](?!span)([igmuy]+|)',
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
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
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\#]', exclude: true},
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
