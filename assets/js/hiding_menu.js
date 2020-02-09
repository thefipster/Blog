var didScroll;
var lastScrollTop = 0;
var delta = 5;
var menuElement = document.getElementsByClassName("menu-buttom")[0];
var navbarHeight = getAbsoluteHeight(menuElement);

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
    menuElement.classList.add("nav-up");
  } else {
    if (st + window.outerHeight < document.height) {
      menuElement.classList.remove("nav-up");
    }
  }

  lastScrollTop = st;
}

function getAbsoluteHeight(el) {
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

startScrollDetection();
window.addEventListener('scroll', function(e) {
  didScroll = true;
});