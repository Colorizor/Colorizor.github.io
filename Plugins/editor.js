$('pre:not([noeditable])').find('code[contenteditable]').change(function() {
  var lang = $(this).attr('language');
  window[lang.toLowerCase()]['Editorize']($(this));
});
