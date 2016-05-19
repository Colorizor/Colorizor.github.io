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
      if (Exist(this.begin) && Exist(this.end)) {
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
  //URL Parameters
  function Parameter(url) {
    //Setup
    var option1 = /\/colorizor(|\.min)\.js\?(theme|plugin)\=(?=(.*?)\&(theme|plugin)\=)/igm;
    var option2 = /\/colorizor(|\.min)\.js\?theme\=(?!(.*?)\&plugin\=)/igm;
    var option3 = /\/colorizor(|\.min)\.js\?plugin\=(?!(.*?)\&theme\=)/igm;
    var option4 = /\/colorizor(|\.min)\.js(?!\?(theme|plugin)\=)/igm;
    //Configure
    if (option1.test(url)) {
      var tail = url.split('\?')[1];
      var style = tail.split('\&')[0];
      var extraTemp = tail.split('\&')[1];
      style = style.split('\=')[1];
      var extra = [],
          temp = extraTemp.split('\=')[1];
      if ((temp || '').split('\,').length > 1) {
        extra = temp.split('\,');
      } else {
        extra.push(temp);
      }
      return {theme: style, plugin: extra};
    } else if (option2.test(url)) {
      var style = url.split('\=')[1];
      return {theme: style, plugin: []};
    } else if (option3.test(url)) {
      var extra = [],
          temp = url.split('\=')[1];
      if ((temp || '').split('\,').length > 1) {
        extra = temp.split('\,');
      } else {
        extra.push(temp);
      }
      return {theme: 'salmon', plugin: extra};
    } else if (option4.test(url)) {
      return {theme: 'salmon', plugin: []};
    }
  }
  //==============================Feature
  function Feature() {
    //Language
    $.each($('pre[language], code[language]'), function() {
      var lang = $(this).attr('language');
      loadJS('https://colorizor.github.io/Languages/' + Trim(lang.toLowerCase()) + '.js');
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
      $.each($('pre[language="' + language + '"], code[language="' + language + '"]'), function() {
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
