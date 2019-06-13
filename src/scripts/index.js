// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};

let maxScrollSize = 400;
let minScrollSize = 100;
let lastScrollPosition = 0;
let scrollSize = 3;
let scrollVar = 5;

function scrollFunction() {
  var pageHeight=document.documentElement.offsetHeight;
  var windowHeight=window.innerHeight;
  var scrollPosition=window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

  if (pageHeight <= windowHeight + scrollPosition) {
    return;
  }

  let element = document.getElementById("header");
  let size = element.style.height;
  let sizeCount = parseInt(size.substring(0, size.length - 2));
  if ( isNaN(sizeCount)) {
    sizeCount = maxScrollSize ;
  }

  let scrollDif = scrollPosition - lastScrollPosition;
  let scrollAmount = scrollDif * scrollSize;
  sizeCount -= scrollAmount;

  if (sizeCount  > maxScrollSize ) {
    sizeCount  = maxScrollSize;
  }
  if (sizeCount  < minScrollSize ) {
    sizeCount  = minScrollSize;
  }

  let sizeStr = sizeCount + "px";
  document.getElementById("header").style.height = sizeStr;

  lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
}
