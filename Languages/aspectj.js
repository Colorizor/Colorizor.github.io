(function() {
  const data = {
    language: 'aspectj',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      },
      {
        pat: /[\\][\']/gm,
        rep: '$SQ$'
      },
      {
        pat: /[\\][\"]/gm,
        rep: '$DQ$'
      }
    ],
    execute: [
      {
        custom: '([\\w]+)[\@]',
        pat: /[\@]/gm,
        rep: '@$'
      },
      {
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /[\@]([\w]+)/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        keyword: /\b(false|synchronized|int|abstract|float|private|char|boolean|static|null|if|const|for|true|while|long|throw|strictfp|finally|protected|import|native|final|return|void|enum|else|extends|implements|break|transient|new|catch|instanceof|byte|super|volatile|case|assert|short|package|default|double|public|try|this|switch|continue|throws|privileged|aspectOf|adviceexecution|proceed|cflowbelow|cflow|initialization|preinitialization|staticinitialization|withincode|target|within|execution|getWithinTypeName|handler|thisJoinPoint|thisJoinPointStaticPart|thisEnclosingJoinPointStaticPart|declare|parents|warning|error|soft|precedence|thisAspectInstance|get|set|args|call)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /\b(extends|implements|pertypewithin|perthis|pertarget|percflowbelow|percflow|issingleton)\b/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /([\w]+)(?=[\(])/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /[\/][\/].+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        nested: 'comment',
        begin: '[\/][\*][\*]',
        end: '[\*][\/]'
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
        begin: {pat: '([\/][\*])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\*][\/])', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      },
      {
        pat: /[\$][S][Q][\$]/gm,
        rep: '\\\''
      },
      {
        pat: /[\$][D][Q][\$]/gm,
        rep: '\\\"'
      },
      {
        pat: /[\@][\$]/gm,
        rep: '@'
      }
    ]
  };
  clz.Colorize(data);
})();
