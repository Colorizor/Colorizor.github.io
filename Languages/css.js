(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&', /[\'\"]/igm],
    //Syntax
    ['<span class="value">$&</span>', /(?:(?!.*?[\]]))(\\(\'|\")([\s\S]*?)\\(\'|\"))/igm],
    ['<span class="selector">$&</span>', /([\#\.\w\-]+)(?:((?!.*?(\/\*|[\;\}]))|(?=.*?[\{])))/igm],
    ['<span class="reserved">$&</span>', /(?:(?!.*?[\{]))([\w\-]+)(?=[\:])/igm],
    ['<span class="attribute">$&</span>', /(([^\w\:]|[\w])+)(?=[\;])/igm],
    ['<span class="comment">$&</span>', /\/\*([\s\S]*?)\*\//igm],
    ['<span class="unit">$&</span>', /([\d\.]+)(em|ex|\%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm],
    //Clean
    ['', /(?:(?!.*?\/\*))(\<span(.*?)\>|\<\/span\>)(?=.([\s\S]*?)\*\/)/igm],
    ['', /(?:(?!.*?[\[]))(\<span(.*?)\>|\<\/span\>)(?=.*?[\]])/igm],
    //Fix Characters
    ['\'', /\\\'/igm],
    ['\"', /\\\"/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="css"]'), function() {
    //--------------------------------------------------SIZING
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //--------------------------------------------------FIND
    for (a = 0; a < regex.length; a++) {
      var str = $(this).html();
      str = str.replace(regex[a][1], regex[a][0]);
      $(this).html(str);
    }
  });
})();
