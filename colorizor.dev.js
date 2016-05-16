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
    {pat: /\<br(.*?)(|\/)\>/gm, rep: '\n'},
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
      plugin = [],
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
    //Built-in function that will be called when the ccs file is being defined
    ss.onloadcssdefined = function(cb) {
      var defined;
      //Loop through each stylesheet and check if the requisted one has loaded
      for (var i = 0; i < sheets.length; i++) {
        //It will return a value higher that -1 if it exists
        if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
          defined = true;
        }
      }
      //If defined is true call function else wait a bit and check again
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
    //Adding the configured link tag to the head tag
    return ss;
  }
  //==============================Initialize
  /*
    This will be called once the language scripts have been loaded into the website
    It has a data parameter which is the iterated dictionary of each language script.
    These dictionaries contain the language configurations, prepare-, execute- and finalise configurations.
    It will test if the dictionary keys exist and will process the given return result.
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
    Here is were the fetching and saving of the iterated code blocks happens
  */
  function Fetch(object) {
    code = $(object).html();
  }
  function Save(object) {
    $(object).html(code);
  }
  //==============================Core
  /*
    The main processing and work gets done here.
    The Core section is broken up into prepare, execute and finalise.
    The replacement of the regex solutions get replaced straight away in the prepare and finalise.
    Because there aren't really complicated search patterns.
    
    Prepare:
      Here the current iterated code block sorts out the escape charactes. These characters would sometimes not appear in the pre tag.
      e.g. < and >.
      
    Execute:
      It will check if certain keys exist in the dicrionary and call a function that falls under it criteria of keys.
      The three groups
      
    Finalise:
      Just cleaning up if needed.
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
    This category in the code contains the functions that are divided in the execute initialize division.
    It allows for the different features in the service.
    e.g. Like searching for an instance between two characters and then excluding the two characters used to search it.
  */
  //Exclude: Begin & End
  function BeginEnd(begin, end, pat, rep) {
    //Setup
    //Creating a string based regex
    var pattern = begin + '([\\s\\S]*?)' + end;
    //Converting the string based regex to regex
    var reg = new RegExp(pattern, 'gm');
    //The regex that will be used to cut off the begin- and end instance
    var regCutBegin = new RegExp(begin, 'gm');
    var regCutEnd = new RegExp(end, 'gm');
    //Colorize
    //Setting the code variable to the new code results
    code = code.replace(reg, function(match) {
      //Cutting off the begin- and end instances
      var cut = match.replace(regCutBegin, '').replace(regCutEnd, '');
      //Creating a temparary replace result variable that will be used to replace the original result
      var temp = cut.replace(pat, rep);
      //Replacing the original search pattern with the colorized one and returning it
      return match.replace(cut, temp);
    });
  }
  //Exclude: Begin & Not End
  function BeginNotEnd(begin, end, pat, rep) {
    //Setup
    //Creating a string based regex
    var pattern = begin + '([\\s\\S]*?)' + end;
    //Converting the string based regex to regex
    var reg = new RegExp(pattern, 'gm');
    //Creating the regex to cut of the begin pattern
    var regCut = new RegExp(begin, 'gm');
    //Colorize
    //Replacing the old code with the new code
    code = code.replace(reg, function(match) {
      //This is the pattern with the cut off begin pattern
      var cut = match.replace(regCut, '');
      //Temp variable that has the colorized result
      var temp = cut.replace(pat, rep);
      //Returning the match by replacing the cut off result with the colorized result
      return match.replace(cut, temp);
    });
  }
  //Exclude: Not Begin & End
  function NotBeginEnd(begin, end, pat, rep) {
    //Setup
    //Creating a string based regex
    var pattern = begin + '([\\s\\S]*?)' + end;
    //Converting the string based regex to regex
    var reg = new RegExp(pattern, 'gm');
    //Creating the regex to cut of the end pattern
    var regCut = new RegExp(end, 'gm');
    //Colorize
    //Replacing the old code with the new code
    code = code.replace(reg, function(match) {
      //This is the pattern with the cut off end pattern
      var cut = match.replace(regCut, '');
      //Temp variable that has the colorized result
      var temp = cut.replace(pat, rep);
      //Returning the match by replacing the cut off result with the colorized result
      return match.replace(cut, temp);
    });
  }
  //Exclude: Not Begin & Not End
  function NotBeginNotEnd(begin, end, pat, rep) {
    //Setup
    //Creating a string based regex
    var pattern = begin + '([\\s\\S]*?)' + end;
    //Converting the string based regex to regex
    var reg = new RegExp(pattern, 'gm');
    //Colorize
    //Replacing the old code with the new code
    code = code.replace(reg, function(match) {
      //Returning the match by replacing the cut off result with the colorized result
      return match.replace(pat, rep);
    });
  }
  //Custom
  function Custom(pattern, pat, rep) {
    //Setup
    //Converting the string based regex to regex
    var reg = new RegExp(pattern, 'gm');
    //Colorize
    //Replacing the old code with the new code
    code = code.replace(reg, function(match) {
      //Returning the match by replacing the cut off result with the colorized result
      return match.replace(pat, rep);
    });
  }
  //Keyword
  function Keyword(keyword, rep) {
    //Colorize
    //Returning the match by replacing the cut off result with the colorized result
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
  //URL Parameters
  function Parameter(url) {
    //Setup
    var option1 = /\/colorizor(|\.min|\.dev)\.js\?(theme|plugin)\=(?=(.*?)\&(theme|plugin)\=)/igm;
    var option2 = /\/colorizor(|\.min|\.dev)\.js\?theme\=(?!(.*?)\&plugin\=)/igm;
    var option3 = /\/colorizor(|\.min|\.dev)\.js\?plugin\=(?!(.*?)\&theme\=)/igm;
    var option4 = /\/colorizor(|\.min|\.dev)\.js(?!\?(theme|plugin)\=)/igm;
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
  /*
    Extra features that are used in the scripts functions
    It will use the language feature to load in the requested languages
    The theme feature to fetch the requested theme
    The selection feature that will select all the code in the selected code block
  */
  function Feature() {
    //Language
    $.each($('pre[language], code[language]'), function() {
      var lang = $(this).attr('language');
      loadJS('https://colorizor.github.io/Languages/' + lang.toLowerCase() + '.js');
    });
    //Theme & Plugin
    $.each($('script'), function() {
      var url = $(this).attr('src');
      var pattern = /\/colorizor(|\.min|\.dev)\.js/igm;
      if (pattern.test(url)) {
        var data = Parameter(url);
        theme = data.theme;
        plugin = data.plugin;
        //Theme
        loadCSS('https://colorizor.github.io/Themes/' + theme.toLowerCase() + '.css');
        //Plugin
        $.each(plugin, function() {
          loadJS('https://colorizor.github.io/Plugins/' + this.toLowerCase() + '.js');
        });
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
