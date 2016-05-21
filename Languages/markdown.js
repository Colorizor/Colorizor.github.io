(function() {
  const data = {
    language: 'markdown',
    prepare: [
      {
        pat: /[\=]/gm,
        rep: '\\$&'
      }
    ],
    execute: [
      {
        custom: '([\'](.*?)[\']|[\"](.*?)[\"])',
        pat: /.+/gm,
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
        custom: '(&lt;[\!][\-][\-]((|\\n+)&lt;[\!][\-][\-]|))([\\s\\S]*?)(([\-][\-]&gt;(\\n+|)|)[\-][\-]&gt;)',
        pat: /([\s\S]+)/gm,
        rep: '<span id="comment">$&</span>'
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
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>](&lt;[\!][\-][\-])', exclude: true},
        end: {pat: '([\-][\-]&gt;)[\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '&lt;(.*?)script(.*?)&gt;', exclude: true},
        end: {pat: '&lt;[\/](.*?)script(.*?)&gt;', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '&lt;(.*?)link(.*?)&gt;', exclude: true},
        end: {pat: '&lt;[\/](.*?)link(.*?)&gt;', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]block[\"][\>](&lt;(.*?)pre(.*?)&gt;((|\\n+)&lt;(.*?)code(.*?)&gt;|)|&lt;(.*?)code(.*?)&gt;)', exclude: true},
        end: {pat: '((&lt;[\/](.*?)code&gt;(\\n+|)|)&lt;[\/](.*?)pre&gt;|&lt;[\/](.*?)code&gt;)[\<][\/]span[\>]', exclude: true},
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
