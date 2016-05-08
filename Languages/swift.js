(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&\/', /[\'\"]/igm],
    ['\:\/\\\/', /\:\/\//igm],
    //Syntax
    ['<span class="value">$&</span>', /(\\\'\/(.+)\\\'\/|\\\"\/(.+)\\\"\/)/igm],
    ['<span class="attribute">$&</span>', /\@\b(IB(?:Outlet|Designable|Action|Inspectable)|class\_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto\_closure)\b/igm],
    ['<span class="reserved">$&</span>', /\b(as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|Protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|\_\_(?:COLUMN\_\_|FILE\_\_|FUNCTION\_\_|LINE\_\_))\b/igm],
    ['<span class="parameter">$&</span>', /\b(abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/igm],
    ['<span class="parameter">$&</span>', /\b(UI([\w]+))\b/igm],
    ['<span class="selector">$&</span>', /([\w]+)(?=\:)/igm],
    ['<span class="comment">$&</span>', /\/\*([\s\S]+)\*\//igm],
    ['<span class="comment">$&</span>', /\/\/.+/igm],
    ['<span class="unit">$&</span>', /([\d]|\-[\d]|\.\d)+/igm],
    //Clean
    ['', /(?:(?!([\s\S]+)\/\*))(\<span(.*?)\>|\<\/span\>)(?=([\s\S]*?)\*\/)/igm],
    ['', /(?:(?!.*?\/\/))(\<span(.*?)\>|\<\/span\>)(?=(.*?)\<\/span\>$)/igm],
    ['', /(?:(?!(.+)\\[\'\"]\/(.+)[\'\"](.+)\/))(\<span(.*?)\>|\<\/span\>)(?=(.+)\\[\'\"]\/)/igm],
    ['</span>$&<span class="value">', /(?:(?!(.+)\\[\'\"]\/(.+)[\'\"](.+)\/))(\\\((.*?)\))(?=(.+)\\[\'\"]\/)/igm],
    //Fix Characters
    ['\'', /\\\'\//igm],
    ['\"', /\\\"\//igm],
    ['\:\/\/', /\:\/\\\//igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="javascript"]'), function() {
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
