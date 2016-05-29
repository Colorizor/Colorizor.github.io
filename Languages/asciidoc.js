var asciidoc = (function() {
  const data = {
    language: 'asciidoc',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        keyword: /^[\.]([\w]+).+/gm,
        rep: '<span id="title">$&</span>'
      },
      {
        keyword: /^[\/][\/].+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        nested: 'comment',
        begin: '^[\/]{4,}\n',
        end: '\n[\/]{4,}$'
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      }
    ]
  };
  return {
    Colorize: function() {
      clz.Colorize(data);
    },
    Editorize: function(object) {
      clz.Colorize(data, $(object));
    }
  };
})();
asciidoc.Colorize();
