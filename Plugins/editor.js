$('pre:not([noeditable])').find('code[contenteditable]').bind('contentchanged', function() {
  var lang = $(this).attr('language');
  window[lang.toLowerCase()]['Editorize']($(this));
});
