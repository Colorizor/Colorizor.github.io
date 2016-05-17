(function(header) {
  //Configure
  if (screen.width < 480) {
    header = 150;
  } else if (screen.width >= 480 && screen.width < 720) {
    header = 250;
  } else if (screen.width >= 720 && screen.width < 1024) {
    header = 250;
  } else {
    header = 400;
  }
  
  //Sizing
  $('header').css({
    'height': header + 'px'
  });
  $('#title-parent').css({
    'height': header + 'px'
  });
  $('footer').css({
    'height': (screen.height - header) + 'px',
    'top': header + 'px'
  });
  
  //Social
  function getFacebook() {
    $.getJSON('https://graph.facebook.com/fql?q=SELECT%20like_count,%20total_count,%20share_count,%20click_count,%20comment_count%20FROM%20link_stat%20WHERE%20url%20=%20%22https://colorizor.github.io%22', function(data) {
      var count = data.data[0].total_count;
      if (count !== '') {
        $('span#facebook').text(count);
      } else {
        $('span#facebook').text('Share');
      }
    });
  }
  function getTwitter() {
    $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=https://colorizor.github.io&callback=?', function(data) {
      var count = data.count;
      if (count !== '') {
        $('span#twitter').text(count);
      } else {
        $('span#twitter').text('Share');
      }
    });
  }
  function getPinterest() {
    $.getJSON('https://api.pinterest.com/v1/urls/count.json?callback%20&url=https://colorizor.github.io', function(data) {
      var count = data.count;
      if (count !== '') {
        $('span#pinterest').text(count);
      } else {
        $('span#pinterest').text('Share');
      }
    });
  }
  function getLinkedIn() {
    $.getJSON('https://www.linkedin.com/countserv/count/share?url=https://colorizor.github.io&callback=?', function(data) {
      var count = data.count;
      if (count !== '') {
        $('span#linkedin').text(count);
      } else {
        $('span#linkedin').text('Share');
      }
    });
  }
  
  //Call
  getFacebook();
  getTwitter();
  getPinterest();
  getLinkedIn();
})();
