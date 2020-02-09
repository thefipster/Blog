function setFontSize() {
    var title, dateOfTitle, fontSizeOfTitle, listOfA, listOfSmall, listOfArticlesDiv, divWidth;
    listOfArticlesDiv = document.getElementsByClassName("articles");

    for (i = 0; i < listOfArticlesDiv.length; i++) {
      listOfA = document.getElementsByClassName("articles")[i].getElementsByTagName("a");
      listOfSmall = document.getElementsByClassName("articles")[i].getElementsByTagName("small");
      divWidth = document.getElementsByClassName("articles")[i].offsetWidth;

      for (k = 0; k < listOfSmall.length; k++) {

        title = $(listOfA[k]);
        dateOfTitle = $(listOfSmall[k]);

        fontSizeOfTitle = startingFontSize;
        title.css("font-size", fontSizeOfTitle);

        while (title.width() + dateOfTitle.width() >= divWidth)
          title.css("font-size", fontSizeOfTitle -= 0.5);
      }
    }
  }

  function getStartFontSize() {
    try {
      startingFontSize = parseInt($(document.getElementsByClassName("articles")[0].getElementsByTagName("a")[0]).css("font-size"));
      setFontSize();
      window.addEventListener('resize', setFontSize, true);
    } catch (e) { }
  }

  getStartFontSize();