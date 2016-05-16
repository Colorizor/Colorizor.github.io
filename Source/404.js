//--------------------------------------------------LOADING MAIN
(function(header) {
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
  
  $('footer').css({
    'height': (screen.height - header) + 'px',
    'top': header + 'px'
  });
})();
