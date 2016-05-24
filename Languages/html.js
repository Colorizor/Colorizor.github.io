(function() {
  const data = {
    language: 'html',
    prepare: [
      {
        pat: /[\=]/gm,
        rep: '\\$&'
      }
    ],
    execute: [
      {
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        begin: {pat: '&lt;([\/]|)', exclude: true},
        end: {pat: '(|[\/])&gt;', exclude: true},
        pat: /^([\w]+)/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        custom: '([\\w\-]+)[\\\\][\=]',
        pat: /([\w\-]+)/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        nested: 'comment',
        begin: '&lt;[\!][\-][\-]',
        end: '[\-][\-]&gt;'
      },
      {
        nested: 'script',
        begin: '&lt;(?![\/])(.*?)script(.*?)&gt;',
        end: '(&lt;[\/](.*?)script(.*?)&gt;|&lt;(.*?)script(.*?)[\/]&gt;)'
      },
      {
        nested: 'link',
        begin: '&lt;(?![\/])(.*?)link(.*?)&gt;',
        end: '(&lt;[\/](.*?)link(.*?)&gt;|&lt;(.*?)link(.*?)[\/]&gt;)'
      },
      {
        nested: 'pre',
        begin: '(&lt;(?![\/])(.*?)pre(.*?)&gt;((([\\s\\W]{0,}.*?)?)&lt;(?![\/])(.*?)code(.*?)&gt;)?)',
        end: '((&lt;[\/](.*?)code(.*?)&gt;(([\\s\\W]{0,}.*?)?))?&lt;[\/](.*?)pre(.*?)&gt;)'
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
        begin: {pat: '(&lt;[\!][\-][\-]|&gt;)\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>(&lt;[\/]|[\-][\-]&gt;)', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /[\\][\=]/gm,
        rep: '='
      }
    ]
  };
  clz.Colorize(data);
})();
