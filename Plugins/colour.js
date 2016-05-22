//================================================================================
//=====================================Colour=====================================
//================================================================================
$.each($('pre:not([nocolour])').find('code'), function() {
  var block = $(this).html();
  block = block.replace(/[\#]([a-fA-F\d]{6}|[a-fA-F\d]{3})/gm, '<span style="color:$&;">$&</span>');
  block = block.replace(/[Rr][Gg][Bb][\(](((([\d]{1,3})[\,]{0,1})[\s]*){3})[\)]/gm, '<span style="color:$&;">$&</span>');
  block = block.replace(/[Rr][Gg][Bb][Aa][\(](((([\d]{1,3}|[\d\.]{1,3})[\,]{0,1})[\s]*){4})[\)]/gm, '<span style="color:$&;">$&</span>');
  block = block.replace(/[Hh][Ss][Ll][\(](((([\d]{1,3}|[\d\%]{2,4})[\,]{0,1})[\s]*){3})[\)]/gm, '<span style="color:$&;">$&</span>');
  block = block.replace(/[Hh][Ss][Ll][Aa][\(](((([\d]{1,3}|[\d\%]{2,4}|[\d\.]{1,3})[\,]{0,1})[\s]*){4})[\)]/gm, '<span style="color:$&;">$&</span>');
  $(this).html(block);
});
