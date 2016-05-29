$('pre:not([noeditor])').keydown(function() {
  var lang = $(this).find('code[contenteditable]').attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    console.log($(this).find('code[contenteditable]'));
    func.apply(null, $(this).find('code[contenteditable]'));
  } else {
    console.log('no');
  }
});
