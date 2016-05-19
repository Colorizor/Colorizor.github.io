(function() {
  const data = {
    language: 'markup',
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
      }/*,
      {
        begin: {pat: '&lt;(|[\/])', exclude: true},
        end: {pat: '(|[\/])&gt;', exclude: true},
        pat: /^([\w]+)/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        begin: {pat: '[\\s]', exclude: true},
        end: {pat: '[\\][\=]', exclude: true},
        pat: /([\w\-]+)/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        begin: {pat: '&lt;(|[\/])', exclude: true},
        end: {pat: '(|[\/])&gt;', exclude: true},
        pat: /([\s])([\w\-]+)([^\S\\\=]|(|[\/])&gt;)/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        custom: '(&lt;[\!][\-][\-])([\\s\\S]*?)([\-][\-]&gt;)',
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
        begin: {pat: '&lt;script(.*?)&gt;', exclude: true},
        end: {pat: '&lt;[\/]script&gt;', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '&lt;link(.*?)&gt;', exclude: true},
        end: {pat: '&lt;[\/]link&gt;', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '&lt;code(.*?)&gt;', exclude: true},
        end: {pat: '&lt;[\/]code&gt;', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '&lt;pre(.*?)&gt;', exclude: true},
        end: {pat: '&lt;[\/]pre&gt;', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }*/
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
