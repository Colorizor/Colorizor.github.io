(function() {
  const data = {
    language: 'template',
    prepare: [
      {
        pat: /\:\/\//igm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: /(\'(.*?)\'|\"(.*?)\")/igm,
        pat: /.+/igm,
        rep: '<span id="value">$&</span>'
      },
      {
        custom: /\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)\b/gm,
        pat: /.+/igm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        custom: /\b(alert|all|anchor|anchors|area|assign|blur|button|checkbox|clearInterval|clearTimeout|clientInformation|close|closed|confirm|constructor|crypto|decodeURI|decodeURIComponent|defaultStatus|document|element|elements|embed|embeds|encodeURI|encodeURIComponent|escape|event|fileUpload|focus|form|forms|frame|height|innerHeight|innerWidth|layer|layers|link|location|mimeTypes|navigate|navigator|frames|frameRate|hidden|history|image|images|offscreenBuffering|open|opener|option|outerHeight|outerWidth|packages|pageXOffset|pageYOffset|parent|parseFloat|parseInt|password|plugin|prompt|propertyIsEnum|radio|reset|screen|screenX|screenY|scroll|secure|select|self|setInterval|setTimeout|status|submit|taint|text|textarea|top|unescape|untaint|width|window)\b/gm,
        pat: /.+/igm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        custom: /\b(Array|Date|eval|function|hasOwnProperty|Infinity|isFinite|isNaN|isPrototypeOf|length|Math|NaN|name|Number|Object|prototype|String|toString|undefined|valueOf)\b/gm,
        pat: /.+/igm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        custom: /\b(onblur|onclick|onerror|onfocus|onkeydown|onkeypress|onkeyup|onmouseover|onload|onmouseup|onmousedown|onsubmit)\b/gm,
        pat: /.+/igm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        custom: /\/\/.+/igm,
        pat: /.+/igm,
        rep: '<span id="comment">$&</span>'
      },/*
      {
        custom: /([\w]+)(?=[\(])/igm,
        pat: /.+/igm,
        rep: '<span id="selector">$&</span>'
      },*/
      {
        custom: /([\d]|\-[\d]|\.\d)+/igm,
        pat: /.+/igm,
        rep: '<span id="unit">$&</span>'
      },
      {
        begin: {pat: '\\<span(.*?)value(.*?)\\>\\\'', exclude: true},
        end: {pat: '\\\'\\<\\/span\\>', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/igm,
        rep: ''
      },
      {
        begin: {pat: '\\<span(.*?)value(.*?)\\>\\\"', exclude: true},
        end: {pat: '\\\"\\<\\/span\\>', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/igm,
        rep: ''
      },
      {
        begin: {pat: '\\<span(.*?)comment(.*?)\\>', exclude: true},
        end: {pat: '\\<\\/span\\>$', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/igm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//igm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();
