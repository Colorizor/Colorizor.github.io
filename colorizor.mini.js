var clz = (function() {
  //================================================================================
  //=====================================Object=====================================
  //================================================================================
  //==============================Constant
  const regexp = [
    {pat: /\&/igm, rep: '&amp;'},
    {pat: /\</igm, rep: '&lt;'},
    {pat: /\>/igm, rep: '&gt;'},
    {pat: /\t/igm, rep: '\s\s\s\s'}
  ];
  //==============================Variable
  var code = '',
      language = '',
      theme = '',
      prepare = [],
      execute = [],
      finalise = [];
      
  //================================================================================
  //=====================================Private====================================
  //================================================================================
  //==============================LoadJS
  function loadJS(src, cb) {
    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    if (cb && typeof(cb) === 'function') {
      script.onload = cb;
    }
    return script;
  }
  //==============================LoadCSS
  function loadCSS(href, before, media, callback) {
    var ss = window.document.createElement('link');
    var ref = before || window.document.getElementsByTagName('script')[0];
    var sheets = window.document.styleSheets;
    ss.rel = 'stylesheet';
    ss.href = href;
    ss.media = 'only x';
    if (callback) {
      ss.onload = callback;
    }
    ref.parentNode.insertBefore(ss, ref);
    ss.onloadcssdefined = function(cb) {
      var defined;
      for (var i = 0; i < sheets.length; i++) {
        if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
          defined = true;
        }
      }
      if (defined) {
        cb();
      } else {
        setTimeout(function() {
          ss.onloadcssdefined(cb);
        });
      }
    };
    ss.onloadcssdefined(function() {
      ss.media = media || 'all';
    });
    return ss;
  }
  //==============================Initialize
  function Initialize(data) {
    language = data.language;
    prepare = data.prepare;
    execute = data.execute;
    finalise = data.finalise;
  }
  //==============================Process
  function Fetch(object) {
    code = $(object).html();
  }
  function Save(object) {
    $(object).html(code);
  }
  //==============================Core
  function Prepare(object) {
    //Escape
    $.each(regexp, function() {
      code = code.replace(this.pat, this.rep);
    });
    //Colorize
    $.each(prepare, function() {
      code = code.replace(this.pat, this.rep);
    });
  }
  function Execute(object) {
  }
  function Finalise(object) {
  }
  //==============================Function
  //==============================Feature
  function Feature() {
    //Language
    $.each($('pre[language], code[language]'), function() {
      var lang = $(this).attr('language');
      loadJS('https://colorizor.github.io/Languages/' + lang.toLowerCase() + '.js');
    });
    //Theme
    $.each($('script'), function() {
      var url = $(this).attr('src');
      var pat = /\/colorizor(|\.min)\.js\?theme\=/igm;
      if (pat.test(url)) {
        var theme = url.split('theme=')[1];
        loadCSS('https://colorizor.github.io/Themes/' + theme.toLowerCase() + '.css');
      }
    });
    //Selection
    $('code').click(function() {
      if (document.selection) {
        var block = document.body.createTextRange();
        block.moveToElementText($(this)[0]);
        block.select();
      } else {
        var block = document.createRange();
        block.setStartBefore($(this)[0]);
        block.setEndAfter($(this)[0]);
        window.getSelection().addRange(block);
      }
    });
  }
  
  //================================================================================
  //=====================================Public=====================================
  //================================================================================
  return {
    //==============================Configure
    Configure: function() {
      //Checking
      if (typeof jQuery == 'undefined') {
        loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
      }
      //Waiting
      var waitForLoad = function() {
        if (typeof jQuery != 'undefined') {
          Feature()
        } else {
          window.setTimeout(waitForLoad, 1);
        }
      };
      window.setTimeout(waitForLoad, 1);
    },
    //==============================Colorize
    Colorize: function(data) {
      //Initialize
      Initialize(data);
      //Procedure
      $.each($('code[language="' + language + '"]'), function() {
        //Sizing
        $(this).css({
          'height': 'auto', 'left': '0px', 'right': '0px', 'width': 'auto'
        });
        //Core
        Fetch($(this));
        Prepare($(this));
        Execute($(this));
        Finalise($(this));
        Save($(this));
      });
    }
  };
})();
clz.Configure();
