//------------------------------------------------------------------------------------------------------------
      //---------------------------------------------------NUMBERING----------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      $.each($('pre').find('code'), function() {
        var str = $(this).html();
        str = str.replace(/([\s\S]+)/igm, '<span class="numbers"></span><span class="coding">$&</span>');
        $(this).html(str);
      });
      
      $.each($('pre[number]').find('span[class="coding"]'), function(line) {
        $(this).html(function(index, html) {
          return html.replace(/(^\n|.+)/igm, '<span class="code">$&</span>');
        });
    
        line = 0;
    
        $.each($(this).find('span[class="code"]'), function() {
          line++;
          var str = $($(this).parent().parent().find('span[class="numbers"]')).html();
          $($(this).parent().parent().find('span[class="numbers"]')).html(str + '<span class="number">' + line + '</span>\n');
        });
      });
