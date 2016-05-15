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
        custom: /(\'(.*?)\'|\"(.*?)\")/igm,
        pat: /.+/igm,
        rep: '<span id="value">$&</span>'
      },
      {
        custom: /\/\/.+/igm,
        pat: /.+/igm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: /(\'(.*?)\'|\"(.*?)\")/igm,
        pat: /(\<span(.*?)\>|\<\/span\>)/igm,
        rep: ''
      },
      {
        begin: {pat: '\\<span(.*?)comment(.*?)\\>', exclude: true},
        end: {pat: '\\<\\/span\\>', exclude: false},
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
