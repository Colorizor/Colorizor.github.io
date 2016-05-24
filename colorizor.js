var clz = (function() {
  //================================================================================
  //=====================================Object=====================================
  //================================================================================
  //==============================Constant
  const regexp = [
    {pat: /\<br(.*?)(|\/)\>/gm, rep: '\n'},
    {pat: /[\<]/gm, rep: '&lt;'},
    {pat: /[\>]/gm, rep: '&gt;'},
    {pat: /[\t]/gm, rep: '\s\s\s\s'}
  ];
  //==============================Variable
  var code = '',
      language = '',
      theme = '',
      plugin = [],
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
    script.src = Trim(src);
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
    ss.href = Trim(href);
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
    //Language
    if (Exist(data.language)) {
      language = Trim(data.language);
    } else {
      language = '';
    }
    //Prepare
    if (Exist(data.prepare)) {
      prepare = data.prepare;
    } else {
      prepare = [];
    }
    //Execute
    if (Exist(data.execute)) {
      execute = data.execute;
    } else {
      execute = [];
    }
    //Finalise
    if (Exist(data.finalise)) {
      finalise = data.finalise;
    } else {
      finalise = [];
    }
  }
  //==============================Process
  function Fetch(object) {
    code = $(object).html().replace(/(\<span(.*?)\>|\<\/span\>)/gm, '');
  }
  function Save(object) {
    $(object).html(Trim(code));
  }
  //==============================Core
  function Prepare() {
    //Escape
    $.each(regexp, function() {
      code = code.replace(this.pat, this.rep);
    });
    //Colorize
    $.each(prepare, function() {
      code = code.replace(this.pat, this.rep);
    });
  }
  function Execute() {
    $.each(execute, function() {
      //Detect
      if (Exist(this.nested)) {
        //Setup
        var nested = this.nested;
        var begin = this.begin;
        var end = this.end;
        //Configuration
        Nested(nested, begin, end);
      } else if (Exist(this.begin) && Exist(this.end)) {
        //Setup
        var begin = this.begin.pat;
        var excludeBegin = this.begin.exclude;
        var end = this.end.pat;
        var excludeEnd = this.end.exclude;
        var pat = this.pat;
        var rep = this.rep;
        //Configuration
        if (excludeBegin && excludeEnd) {
          BeginEnd(begin, end, pat, rep);
        } else if (excludeBegin && !excludeEnd) {
          BeginNotEnd(begin, end, pat, rep);
        } else if (!excludeBegin && excludeEnd) {
          NotBeginEnd(begin, end, pat, rep);
        } else {
          NotBeginNotEnd(begin, end, pat, rep);
        }
      } else if (Exist(this.custom)) {
        //Setup
        var custom = this.custom;
        var pat = this.pat;
        var rep = this.rep;
        //Configuration
        Custom(custom, pat, rep);
      } else if (Exist(this.keyword)) {
        //Setup
        var keyword = this.keyword;
        var rep = this.rep;
        //Configuration
        Keyword(keyword, rep);
      }
    });
  }
  function Finalise() {
    $.each(finalise, function() {
      code = code.replace(this.pat, this.rep);
    });
  }
  //==============================Function
  //Exclude: Begin & End
  function BeginEnd(begin, end, pat, rep) {
    //Setup
    var pattern = begin + '([\\s\\S]*?)' + end;
    var reg = new RegExp(pattern, 'gm');
    var regCutBegin = new RegExp(begin, 'gm');
    var regCutEnd = new RegExp(end, 'gm');
    //Colorize
    code = code.replace(reg, function(match) {
      var cut = match.replace(regCutBegin, '').replace(regCutEnd, '');
      var temp = cut.replace(pat, rep);
      return match.replace(cut, temp);
    });
  }
  //Exclude: Begin & Not End
  function BeginNotEnd(begin, end, pat, rep) {
    //Setup
    var pattern = begin + '([\\s\\S]*?)' + end;
    var reg = new RegExp(pattern, 'gm');
    var regCut = new RegExp(begin, 'gm');
    //Colorize
    code = code.replace(reg, function(match) {
      var cut = match.replace(regCut, '');
      var temp = cut.replace(pat, rep);
      return match.replace(cut, temp);
    });
  }
  //Exclude: Not Begin & End
  function NotBeginEnd(begin, end, pat, rep) {
    //Setup
    var pattern = begin + '([\\s\\S]*?)' + end;
    var reg = new RegExp(pattern, 'gm');
    var regCut = new RegExp(end, 'gm');
    //Colorize
    code = code.replace(reg, function(match) {
      var cut = match.replace(regCut, '');
      var temp = cut.replace(pat, rep);
      return match.replace(cut, temp);
    });
  }
  //Exclude: Not Begin & Not End
  function NotBeginNotEnd(begin, end, pat, rep) {
    //Setup
    var pattern = begin + '([\\s\\S]*?)' + end;
    var reg = new RegExp(pattern, 'gm');
    //Colorize
    code = code.replace(reg, function(match) {
      return match.replace(pat, rep);
    });
  }
  //Nested
  function Nested(nested, begin, end) {
    //Setup
    var open = 0,
        close = 0,
        busy = false;
    //Colorize
    code = code.replace(/(^\n|.+)/gm, function(match) {
      //Open
      var object = match.match(new RegExp(begin, 'gm'));
      if (object != null) {
        if (!busy) {
          match = match.replace(new RegExp(begin, 'm'), '<span id="' + nested + '">$&<span id="block">');
          busy = true;
        }
        open += object.length;
      }
      //Close
      var object = match.match(new RegExp(end, 'gm'));
      if (object != null) {
        close += object.length;
      }
      //Check
      if (open == close) {
        open = 0;
        close = 0;
        busy = false;
        match = match.replace(new RegExp(end + '(?!(.*?)' + end + ')', 'm'), '</span>$&</span>');
      }
      //Replace
      return match;
    });
  }
  //Custom
  function Custom(pattern, pat, rep) {
    //Setup
    var reg = new RegExp(pattern, 'gm');
    //Colorize
    code = code.replace(reg, function(match) {
      return match.replace(pat, rep);
    });
  }
  //Keyword
  function Keyword(keyword, rep) {
    //Colorize
    code = code.replace(keyword, rep);
  }
  //Exist
  function Exist(value) {
    return value != null;
  }
  //Contain
  function Contain(array, value) {
    return array.indexOf(value) > -1;
  }
  //Escape
  function Escape(value) {
    return value.replace(/[\-\/\\\^\$\*\+\?\.\(\)\|\[\]\{\}]/gm, '\\$&');
  }
  //Trim
  function Trim(value) {
    return value.trim();
  }
  //Validate
  function Validate(value) {
    if (value != null) {
      return value;
    }
  }
  //URL Parameters
  function Parameter(url) {
    //Setup
    var urlReg = /((\?|\&)(theme|plugin)\=((\,)?([\w]+)){1,}){1,}/igm,
        themeReg = [/(\?|\&)(theme(s)?)\=(.*?)(?=(\&|$))/igm, /([\w]+)(?!(.*?)\=)/igm],
        pluginReg = [/(\?|\&)(plugin(s)?)\=(.*?)(?=(\&|$))/igm, /([\w]+)(?!(.*?)\=)/igm];
    //Prepare
    var urlPar = '',
        themePar = '',
        pluginPar = [];
    //Check
    if (Validate(url.match(urlReg))) {
      //Parameters
      urlPar = url.match(urlReg)[0];
      //Theme
      if (Validate(urlPar.match(themeReg[0]))) {
        themePar = urlPar.match(themeReg[0])[0];
        if (Validate(themePar.match(themeReg[1]))) {
          themePar = themePar.match(themeReg[1])[0];
        }
      } else {
        themePar = 'default';
      }
      //Plugin
      if (Validate(urlPar.match(pluginReg[0]))) {
        pluginPar = urlPar.match(pluginReg[0])[0];
        if (Validate(pluginPar.match(pluginReg[1]))) {
          pluginPar = pluginPar.match(pluginReg[1]);
        }
      } else {
        pluginPar = [];
      }
    }
    //Return
    return {theme: themePar, plugin: pluginPar};
  }
  //==============================Feature
  function Feature() {
    //Language
    $.each($('pre'), function() {
      //Setup
      var block = $(this).find('code')[0];
      //Process
      if (!block) {
        //Setup
        var lang = $(this).attr('language');
        //Checking
        if (lang) {
          $(this).html('<code language="' + Trim(lang.toLowerCase()) + '">' + $(this).html() + '</code>');
          loadJS('https://colorizor.github.io/Languages/' + Trim(lang.toLowerCase()) + '.js');
        } else {
          $(this).html('<code language="none">' + $(this).html() + '</code>');
          loadJS('https://colorizor.github.io/Languages/none.js');
        }
      } else {
        //Setup
        var langPre = $(this).attr('language'),
            langBlock = $(this).find('code').attr('language');
        //Checking
        if (langPre) {
          $(this).find('code').attr('language', langPre);
          loadJS('https://colorizor.github.io/Languages/' + Trim(langPre.toLowerCase()) + '.js');
        } else if (langBlock) {
          loadJS('https://colorizor.github.io/Languages/' + Trim(langBlock.toLowerCase()) + '.js');
        } else {
          $(this).find('code').attr('language', 'none');
          loadJS('https://colorizor.github.io/Languages/none.js');
        }
      }
    });
    //Theme & Plugin
    $.each($('script'), function() {
      var url = $(this).attr('src');
      var pattern = /\/colorizor(|\.min)\.js/igm;
      if (pattern.test(url)) {
        var data = Parameter(url);
        theme = data.theme;
        plugin = data.plugin;
        //Theme
        loadCSS('https://colorizor.github.io/Themes/' + Trim(theme.toLowerCase()) + '.css');
        //Plugin
        $.each(plugin, function() {
          loadJS('https://colorizor.github.io/Plugins/' + Trim(this.toLowerCase()) + '.js');
        });
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
        loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js');
      }
      //Waiting
      var waitForLoad = function() {
        if (typeof jQuery != 'undefined') {
          Feature();
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
        Prepare();
        Execute();
        Finalise();
        Save($(this));
      });
    }
  };
})();
clz.Configure();
