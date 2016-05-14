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
        pat: //igm,
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
