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
        begin: {'\\<span(.*?)comment(.*?)\\>', exclude: true},
        end: {'\\<\\/span\\>', exclude: true},
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
