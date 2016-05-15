(function() {
  const data = {
    language: 'template',
    prepare: [
      {
        pat: /[\'\"]/igm,
        rep: '\\$&\/'
      },
      {
        pat: /\:\/\//igm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
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
      }
    ],
    finalise: [
      {
        pat: /\\\'\//igm,
        rep: '\''
      },
      {
        pat: /\\\"\//igm,
        rep: '\"'
      },
      {
        pat: /\:\/\\\//igm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();
