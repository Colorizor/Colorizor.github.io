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
          exclude: true
        },
        end: {
          pat: '$',
          exclude: true
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
