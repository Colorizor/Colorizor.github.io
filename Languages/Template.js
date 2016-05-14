(function() {
  const data = {
    language: '',
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
        name: '',
        begin: {
          pat: '',
          exclude: true
        },
        end: {
          pat: '',
          exclude: true
        },
        pat: '',
        rep: ''
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
