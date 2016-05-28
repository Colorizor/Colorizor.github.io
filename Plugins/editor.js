$('code').html().change(function() {
  var lang = $(this).attr('language');
  var func = window[lang.toLowerCase()]['Editorize'];
  if (typeof func === 'function') {
    func.apply($(this));
    console.log('yes');
  } else {
    console.log('no');
  }
});
