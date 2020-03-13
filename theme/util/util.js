const moment = require("moment");

export function utcToTime(utc) {
  return moment(utc)
    .utcOffset(8)
    .format("YYYY-MM-DD HH:mm:ss");
}

export function changeShowStatus(screenWidth) {
  let flag = false;
  if (screenWidth >= 510 && screenWidth < 1200) {
    flag = true;
  } else if (screenWidth < 510) {
    flag = true;
  } else {
    flag = false;
  }
  if (flag) {
    let headElement = document.getElementsByClassName("head")[0];
    let headClass = headElement.getAttribute("class");
    if (headClass.search("head_hide") == -1) {
      headElement.setAttribute("class", headClass.concat(" head_hide"));
    }
    let noteListElement = document.getElementsByClassName("note-list")[0];
    if (noteListElement) {
      let noteListClass = noteListElement.getAttribute("class");
      if (noteListClass.search("note-list_hide") == -1) {
        noteListElement.setAttribute(
          "class",
          noteListClass.concat(" note-list_hide")
        );
      }
    }
  } else {
    let headElement = document.getElementsByClassName("head")[0];
    let headClass = headElement.getAttribute("class");
    if (headClass.search("head_hide") != -1) {
      headElement.setAttribute("class", headClass.replace("head_hide", ""));
    }
    let noteListElement = document.getElementsByClassName("note-list")[0];
    if (noteListElement) {
      let noteListClass = noteListElement.getAttribute("class");
      if (noteListClass.search("note-list_hide") != -1) {
        noteListElement.setAttribute(
          "class",
          noteListClass.replace("note-list_hide", "")
        );
      }
    }
  }
}

export function changeStyle(screenWidth) {
  if (screenWidth >= 510 && screenWidth < 1200) {
    // 隐藏左侧栏和博客列表，样式不发生变化
    let headElement = document.getElementsByClassName("head")[0];
    let headClass = headElement.getAttribute("class");
    if (headClass.search("head_1200") == -1) {
      headElement.setAttribute("class", headClass.concat(" head_1200"));
    }
    let noteListElement = document.getElementsByClassName("note-list")[0];
    if (noteListElement) {
      let noteListClass = noteListElement.getAttribute("class");
      if (noteListClass.search("note-list_1200") == -1) {
        noteListElement.setAttribute(
          "class",
          noteListClass.concat(" note-list_1200")
        );
      }
      if (noteListClass.search("note-list_510") != -1) {
        noteListElement.setAttribute(
          "class",
          noteListClass.replace("note-list_510", "")
        );
      }
    }
  } else if (screenWidth < 510) {
    // 改变左侧栏的样式
    let headElement = document.getElementsByClassName("head")[0];
    let headClass = headElement.getAttribute("class");
    if (headClass.search("head_1200") == -1) {
      headElement.setAttribute("class", headClass.concat(" head_1200"));
    }
    let noteListElement = document.getElementsByClassName("note-list")[0];
    if (noteListElement) {
      let noteListClass = noteListElement.getAttribute("class");
      if (noteListClass.search("note-list_510") == -1) {
        noteListElement.setAttribute(
          "class",
          noteListClass.concat(" note-list_1200 note-list_510")
        );
      }
    }
  } else {
    let headElement = document.getElementsByClassName("head")[0];
    let headClass = headElement.getAttribute("class");
    if (headClass.search("head_1200") != -1) {
      headElement.setAttribute("class", headClass.replace("head_1200", ""));
    }

    let noteListElement = document.getElementsByClassName("note-list")[0];
    if (noteListElement) {
      let noteListClass = noteListElement.getAttribute("class");
      if (noteListClass.search("note-list_1200") != -1) {
        noteListElement.setAttribute(
          "class",
          noteListClass.replace("note-list_1200", "")
        );
      }
    }
  }
}
