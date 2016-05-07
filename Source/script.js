//--------------------------------------------------LOADING MAIN
(function(position, opacity, header) {
  if (screen.width < 480) {
    header = 150;
  } else if (screen.width >= 480 && screen.width < 720) {
    header = 250;
  } else if (screen.width >= 720 && screen.width < 1024) {
    header = 250;
  } else {
    header = 400;
  }

  $('header').css({
    'height': header + 'px'
  });
  
  $('#title-parent').css({
    'height': header + 'px'
  });

  $(window).scrollTop(0);

  $(window).scroll(function() {
    //Parallax Image
    position = ($(window).scrollTop() / 3) * -1;
    
    if ($(window).scrollTop() > 0) {
      $('#parallax').css({
        'background-position': 'center ' + position + 'px'
      });
      
      $('#title-parent').css({
        'top': position + 'px'
      });
    } else {
      $('#parallax').css({
        'background-position': 'center 0px'
      });
      
      $('#title-parent').css({
        'top': '0px'
      });
    }
    
    //Title Opacity
    opacity = $(window).scrollTop() / (header - (header / 4));
    
    if ($(window).scrollTop() < (header - (header / 4))) {
      $('#title-child').css({
        'opacity': (1 - opacity)
      });
    } else {
      $('#title-child').css({
        'opacity': '0'
      });
    }
      
    //Hide Image
    if ($(window).scrollTop() > header) {
      $('header').css({
        'visibility': 'hidden'
      });
    } else {
      $('header').css({
        'visibility': 'visible'
      });
    }
  });
})();
