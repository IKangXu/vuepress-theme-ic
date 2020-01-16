const moment = require("moment");

export function utcToTime(utc) {
  return moment(utc)
    .utcOffset(8)
    .format("YYYY-MM-DD HH:mm:ss");
}

export function getSizeType(screenWidth) {
  if (screenWidth > 430 && screenWidth < 1200) {
    // 隐藏左侧栏和博客列表，样式不发生变化
  } else if (screenWidth < 430) {
    // 改变左侧栏的样式
  }
}
