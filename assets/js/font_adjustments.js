function setFontSize() {
    var title, dateOfTitle, fontSizeOfTitle, listOfA, listOfSmall, listOfArticlesDiv, divWidth;
    listOfArticlesDiv = document.getElementsByClassName("articles");

    for (i = 0; i < listOfArticlesDiv.length; i++) {
      listOfA = document.getElementsByClassName("articles")[i].getElementsByTagName("a");
      listOfSmall = document.getElementsByClassName("articles")[i].getElementsByTagName("small");
      divWidth = document.getElementsByClassName("articles")[i].offsetWidth;

      for (k = 0; k < listOfSmall.length; k++) {
        title = listOfA[k];
        
        if (title === undefined) {
          continue;
        }

        dateOfTitle = listOfSmall[k];
        fontSizeOfTitle = startingFontSize;
        title.style.fontSize = fontSizeOfTitle + "px";

        while (title.offsetWidth + dateOfTitle.offsetWidth >= divWidth) {
          fontSizeOfTitle -= 0.5;
          title.style.fontSize = fontSizeOfTitle + "px";
          if (fontSizeOfTitle < 16) {
            break;
          }
        }

      }
    }
  }

  function getStartFontSize() {
    try {
      var firstLink = document.getElementsByClassName("articles")[0].getElementsByTagName("a")[0];
      var fontSize = getComputedStyle(firstLink).fontSize;
      startingFontSize = parseInt(fontSize);
      setFontSize();
      window.addEventListener('resize', setFontSize);
    } catch (e) { }
  }

  getStartFontSize();