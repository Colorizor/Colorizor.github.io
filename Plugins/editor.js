$('pre:not([noeditor])').keydown(function() {
  var lang = $(this).find('code[contenteditable]').attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    func.apply(null, $(this).find('code[contenteditable]'));
  }
});
