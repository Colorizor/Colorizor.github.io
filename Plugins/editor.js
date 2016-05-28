$('pre:not([noeditable])').bind('contentchanged', function() {
  var lang = $(this).find('code[contenteditable]').attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    func.apply($(this).find('code[contenteditable]'));
    console.log('yes');
  } else {
    console.log('no');
  }
});
