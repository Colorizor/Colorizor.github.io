(function() {
  const data = {
    language: '',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: '([\'](.*?)[\']|[\"](.*?)[\"])',
        pat: /.+/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(order|deny|allow|setenv|rewriterule|rewriteengine|rewritecond|documentroot|sethandler|errordocument|loadmodule|options|header|listen|serverroot|servername|on|off|all)\b/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        begin: {pat: '([\$\%][\{])', exclude: true},
        end: {pat: '[\}]', exclude: true},
        pat: /([\w]+)/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        begin: {pat: '\\s[\\[]', exclude: true},
        end: {pat: '[\\]]', exclude: true},
        pat: /([\w]+)/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        custom: '[\#].+',
        pat: /.+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: '[\$\%]\\d+',
        pat: /.+/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        custom: '[\/](?!([\*]|span))(.*?)(?![\*])[\/](?!span)([igmuy]+|)',
        pat: /.+/gm,
        rep: '<span id="regex">$&</span>'
      },
      {
        custom: '[\/](?!([\*]|span))(.*?)(?![\*])[\/](?!span)([igmuy]+|)',
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\/]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\*]', exclude: true},
        end: {pat: '[\*][\/][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();



(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&\/', /[\'\"\<\>]/igm],
    ['\:\/\\\/', /\:\/\//igm],
    //Syntax
    ['<span id="value">$&</span>', /(\\\'\/(.*?)\\\'\/|\\\"\/(.*?)\\\"\/)/igm],
    ['<span id="attribute">$&</span>', /\b(order|deny|allow|setenv|rewriterule|rewriteengine|rewritecond|documentroot|sethandler|errordocument|loadmodule|options|header|listen|serverroot|servername|on|off|all)\b/igm],
    ['<span id="selector">$&</span>', /(?:(?!(.*?)([\$\%]\{)))([\w]+)(?!(.*?)[\:])(?=(.*?)\})/igm],
    ['<span id="comment">$&</span>', /\#.+/igm],
    ['<span id="unit">$&</span>', /[\$\%]\d+/igm],
    //Clean
    ['', /(?:(?!.*?\#))(\<span(.*?)\>|\<\/span\>)(?=(.*?)\<\/span\>$)/igm],
    ['', /(?:(?!.*?\\\'\/.+\'\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\\'\/)/igm],
    ['', /(?:(?!.*?\\\"\/.+\"\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\\"\/)/igm],
    ['', /(?:(?!([\s\S]*?)(\\\<\/(.*?)\\\>\/)([\s\S]*?)\\\<\/\/(.*?)\\\>\/))(\<span(.*?)\>|\<\/span\>)(?=([\s\S]*?)(\\\<\/\/(.*?)\\\>\/))/igm],
    //Fix Characters
    ['\'', /\\\'\//igm],
    ['\"', /\\\"\//igm],
    ['&lt;', /\\\<\//igm],
    ['&gt;', /\\\>\//igm],
    ['\:\/\/', /\:\/\\\//igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="apache"]'), function() {
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
