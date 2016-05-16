var clz = (function() {
  //================================================================================
  //=====================================Object=====================================
  //================================================================================
  //==============================Constant
  /*
    This will remove the characters that wouldn't normally show in the <pre></pre> tag.
    The \t will be replaced by 4x\s (white-space) to even the spacing between all code blocks.
  */
  const regexp = [
    {pat: /[\<]/gm, rep: '&lt;'},
    {pat: /[\>]/gm, rep: '&gt;'},
    {pat: /[\t]/gm, rep: '\s\s\s\s'}
  ];
  //==============================Variable
  /*
    Declaired the global variables here.
    The code will be the variable that will hold each coding block's code in. The code will also be edited from it.
    
    The language will be used for identifing which pre tag it should colorize for.
    The theme will be determined by the ?theme=... parameter in the CDN (Content Delivery Network) url.
    
    The prepare will contain all the regular expressions that are needed to prepare the main regex from finding the incorrect values.
    For example in JavaScript you can comment with //, but a url contains // after the :. so it will see it as comment.
    
    Execute contains the main regular expressions. It contains groups of parameters.
      Group 1:
        Begin ->
          Pattern = String
          Exclude = Bool
        End ->
          Pattern = String
          Exclude = Bool
        Pattern -> 
          Pattern = RegEx
        Replace -> 
          Replace = String
      Group 2:
        Custom ->
          Pattern = RegEx
        Pattern -> 
          Pattern = RegEx
        Replace -> 
          Replace = String
      Group 3:
        Keyword -> 
          Pattern = RegEx
        Replace -> 
          Replace = String
    
    Finalise would contain regex that will do the finishing touches and clean up if needed
  */
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
  /*
    This will load the language scripts async into the website.
    It dynamically creates a script tag and sets it to load async.
    It will insert the newly created script tag right at the top so that it loads it first.
  */
  function loadJS(src, cb) {
    //Getting first script tag
    var ref = window.document.getElementsByTagName('script')[0];
    //Creating the new script tag
    var script = window.document.createElement('script');
    //Setting its source
    script.src = src;
    //Making sure it's async
    script.async = true;
    //Adding the script tag before the first script tag
    ref.parentNode.insertBefore(script, ref);
    //Checking if the calling method is valid and if it is in the form of a function
    if (cb && typeof(cb) === 'function') {
      //Making sure the function is called when it loads
      script.onload = cb;
    }
    //Adding the script to the head tag
    return script;
  }
  //==============================LoadCSS
  /*
    This will be used to load the theme script async into the website.
    It creates a link tag dynamically that will be added before the first script tag.
    This will minimize the loading time by allowing it to load the style first without it having to wait for the script tags to finish.
  */
  function loadCSS(href, before, media, callback) {
    //Creating the link tag dynamically
    var ss = window.document.createElement('link');
    //Getting the first script tag
    var ref = before || window.document.getElementsByTagName('script')[0];
    //Setting the properties for the link tag
    var sheets = window.document.styleSheets;
    ss.rel = 'stylesheet';
    ss.href = href;
    ss.media = 'only x';
    //If the url has a callback it will set it to the onload
    if (callback) {
      ss.onload = callback;
    }
    //Setting it to be inserted before the first script tag
    ref.parentNode.insertBefore(ss, ref);
    //Built 
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
  /*
    
  */
  function Initialize(data) {
    //Language
    if (Exist(data.language)) {
      language = data.language;
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
  /*
    
  */
  function Fetch(object) {
    code = $(object).html();
  }
  function Save(object) {
    $(object).html(code);
  }
  //==============================Core
  /*
    
  */
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
  /*
    
  */
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
  //==============================Feature
  /*
    
  */
  function Feature() {
    //Language
    $.each($('pre[language], code[language]'), function() {
      var lang = $(this).attr('language');
      loadJS('https://colorizor.github.io/Languages/' + lang.toLowerCase() + '.js');
    });
    //Theme
    $.each($('script'), function() {
      var url = $(this).attr('src');
      var pat = /\/colorizor(|\.min|\.dev)\.js\?theme\=/igm;
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
    /*
      
    */
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
    /*
      
    */
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
