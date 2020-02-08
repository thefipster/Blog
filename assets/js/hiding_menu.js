var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.menu-button').outerHeight();

function startScrollDetection() {
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);
}

function hasScrolled() {
  var st = $(this).scrollTop();
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  if (st > lastScrollTop && st > navbarHeight) {
    $('.menu-button').addClass('nav-up');
  } else {
    if (st + $(window).height() < $(document).height()) {
      $('.menu-button').removeClass('nav-up');
    }
  }

  lastScrollTop = st;
}

$(document).ready(startScrollDetection);
$(window).scroll(function (event) {
  didScroll = true;
});