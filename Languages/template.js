(function() {
  const data = {
    language: 'template',
    prepare: [
      {
        pat: /\:\/\//igm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        begin: {
          pat: '[\\\"]',
          exclude: false
        },
        end: {
          pat: '[\\\"]',
          exclude: false
        },
        pat: /.+/igm,
        rep: '<span id="value">$&</span>'
      },
      {
        begin: {
          pat: '[\\\']',
          exclude: false
        },
        end: {
          pat: '[\\\']',
          exclude: false
        },
        pat: /.+/igm,
        rep: '<span id="value">$&</span>'
      },
      {
        begin: {
          pat: '\\/\\/',
          exclude: false
        },
        end: {
          pat: '.+',
          exclude: false
        },
        pat: /.+/igm,
        rep: '<span id="comment">$&</span>'
      },
      {
        begin: {
          pat: '[\\\']',
          exclude: true
        },
        end: {
          pat: '[\\\']',
          exclude: true
        },
        pat: /(\<span(.*?)\>|\<\/span\>)/igm,
        rep: ''
      },
      {
        begin: {
          pat: '[\\\"]',
          exclude: true
        },
        end: {
          pat: '[\\\"]',
          exclude: true
        },
        pat: /(\<span(.*?)\>|\<\/span\>)/igm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//igm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();
