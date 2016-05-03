(function() {
  //----------------------------------------------------------------------------------------------------------
  //--------------------------------------------------LoadJS--------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------------------------
  //--------------------------------------------------LoadCSS-------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------------------------
  //-----------------------------------------Load jQuery If Not Present---------------------------------------
  //----------------------------------------------------------------------------------------------------------
  if (typeof jQuery == 'undefined') {
    loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
  }
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------Wait For jQuery---------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  var waitForLoad = function() {
    if (typeof jQuery != 'undefined') {
      //----------------------------------------------------------------------------------------------------------
      //-----------------------------------------------Load Language----------------------------------------------
      //----------------------------------------------------------------------------------------------------------
      $.each($('pre'), function() {
        var language = $(this).attr('language');
        loadJS('https://colorizor.github.io/Languages/' + language.toLowerCase() + '.js');
      });
      //----------------------------------------------------------------------------------------------------------
      //------------------------------------------Checking URL Parameters-----------------------------------------
      //----------------------------------------------------------------------------------------------------------
      $.each($('script'), function() {
        var url = $(this).attr('src');
        var path = /\/colorizor\.js\?theme\=/igm;
        if (path.test(url)) {
          var theme = url.split('theme=')[1];
          loadCSS('https://colorizor.github.io/Themes/' + theme.toLowerCase() + '.css');
        }
      });
      
      /*//------------------------------------------------------------------------------------------------------------
      //---------------------------------------------------NUMBERING----------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      $.each($('pre[number]'), function() {
        var str = $(this).html();
        str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
        $(this).html(str);
      });
      
      $.each($('pre[number]').find('span[id="all-code"]'), function(line) {
        $(this).html(function(index, html) {
          return html.replace(/(^\n|.+)/igm, '<span id="code">$&</span>');
        });
    
        line = 0;
    
        $.each($(this).find('span[id="code"]'), function() {
          line++;
          var str = $($(this).parent().parent().find('span[id="all-number"]')).html();
          $($(this).parent().parent().find('span[id="all-number"]')).html(str + '<span id="number">' + line + '</span>\n');
        });
      });*/
  
      //------------------------------------------------------------------------------------------------------------
      //--------------------------------------------------FEATURES--------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      $('pre').find('code').click(function() {
        var range, selection;

        if (window.getSelection && document.createRange) {
          selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents($(this)[0]);
          selection.removeAllRanges();
          selection.addRange(range);
        } else if (document.selection && document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText($(this)[0]);
          range.select();
        }
      });
    } else {
      window.setTimeout(waitForLoad, 60);
    }
  };
  window.setTimeout(waitForLoad, 60);
})();
