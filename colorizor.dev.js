var clzdev = (function() {
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
    code = $(object).html();
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
  //==============================Feature
  function Feature() {
    //Language
    $.each($('pre'), function() {
      //Setup
      var block = $(this).find('code')[0];
      //Process
      if (!block) {
        //Setup
        var lang = $(this).attr('language'),
            file = $(this).attr('file');
        //Checking
        if (lang && file) {
          $(this).html('<code language="' + Trim(lang.toLowerCase()) + '">' + $(this).html() + '</code>');
          loadJS(Trim(file));
        } else {
          $(this).html('<code language="none">' + $(this).html() + '</code>');
          loadJS('https://colorizor.github.io/Languages/none.js');
        }
      } else {
        //Setup
        var langPre = $(this).attr('language'),
            filePre = $(this).attr('file'),
            langBlock = $(this).find('code').attr('language'),
            fileBlock = $(this).find('code').attr('file');
        //Checking
        if (langPre && filePre) {
          $(this).find('code').attr('language', langPre);
          loadJS(Trim(filePre));
        } else if (langBlock && fileBlock) {
          loadJS(Trim(fileBlock));
        } else {
          $(this).find('code').attr('language', 'none');
          loadJS('https://colorizor.github.io/Languages/none.js');
        }
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
clzdev.Configure();
