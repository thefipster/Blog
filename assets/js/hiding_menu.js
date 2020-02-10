var didScroll;
var lastScrollTop = 0;
var delta = 5;
var menuElement = document.getElementsByClassName("menu-button")[0];
var navbarHeight = getAbsoluteHeight();

function startScrollDetection() {
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);
}

function hasScrolled() {
  var st = window.scrollY;
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  if (st > lastScrollTop && st > navbarHeight) {
    menuElement.classList.add("nav-up");
  } else {
    if (st < lastScrollTop) {
      menuElement.classList.remove("nav-up");
    }
  }

  lastScrollTop = st;
}

function getAbsoluteHeight() {
  var styles = getComputedStyle(menuElement);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(menuElement.offsetHeight + margin);
}

startScrollDetection();
window.addEventListener('scroll', function(e) {
  didScroll = true;
});