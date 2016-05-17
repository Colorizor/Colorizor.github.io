(function(header) {
  //================================================================================
  //=====================================Setup======================================
  //================================================================================
  if (screen.width < 480) {
    header = 150;
  } else if (screen.width >= 480 && screen.width < 720) {
    header = 250;
  } else if (screen.width >= 720 && screen.width < 1024) {
    header = 250;
  } else {
    header = 400;
  }
  
  //================================================================================
  //=====================================Sizing=====================================
  //================================================================================
  //====================Header
  $('header').css({
    'height': header + 'px'
  });
  //====================Title
  $('#title-parent').css({
    'height': header + 'px'
  });
  //====================Footer
  $('footer').css({
    'height': (screen.height - header) + 'px',
    'top': header + 'px';
  });
  
  //================================================================================
  //=====================================Social=====================================
  //================================================================================
  //====================Facebook
  function getFacebook() {
    $.getJSON('https://graph.facebook.com/fql?q=SELECT%20like_count,%20total_count,%20share_count,%20click_count,%20comment_count%20FROM%20link_stat%20WHERE%20url%20=%20%22https://colorizor.github.io%22', function(data) {
      var share = data.data[0].total_count;
      if (share != 0) {
        $('span#facebook').text(share);
      } else {
        $('span#facebook').text('Share');
      }
    });
  }
  getFacebook();
  //====================Pinterest
  function getPinterest() {
    $.getJSON('https://api.pinterest.com/v1/urls/count.json?callback?&url=https://colorizor.github.io', function(data) {
      var share = data.count;
      if (share != 0) {
        $('span#pinterest').text(share);
      } else {
        $('span#pinterest').text('Share');
      }
    });
  }
  getPinterest();
  //====================LinkedIn
  function getLinkedIn() {
    $.getJSON('https://www.linkedin.com/countserv/count/share?url=https://colorizor.github.io&callback=?', function(data) {
      var share = data.count;
      if (share != 0) {
        $('span#linkedin').text(share);
      } else {
        $('span#linkedin').text('Share');
      }
    });
  }
  getLinkedIn();
})();
