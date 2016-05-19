(function() {
  const data = {
    language: 'colorize',
    execute: [
      {
        custom: '([\'](.*?)[\']|[\"](.*?)[\"])',
        pat: /.+/gm,
        rep: '<span id="string">$&</span>'
      },
      {
        custom: '[\:][\:].+',
        pat: /.+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: '[\:]([\\w]+)',
        pat: /([\w]+)/gm,
        rep: '<span id="keywork">$&</span>'
      }
    ]
  };
  clz.Colorize(data);
})();
