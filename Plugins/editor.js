$('pre:not([noeditable])').change(function() {
  var lang = $(this).find('code[contenteditable]').attr('language');
  window[lang.toLowerCase()]['Editorize']($(this).find('code[contenteditable]'));
});
