$('pre:not([noeditor])').find('code[contenteditable]').keydown(function() {
  console.log('hi');
  var lang = $(this).attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    func.apply($(this));
    console.log('yes');
  } else {
    console.log('no');
  }
});
