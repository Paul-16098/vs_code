/** @format */

function startTimer(
  s,
  fn = () => {
    console.log("計時器已觸發！");
  }
) {
  if (isNaN(s) || s === undefined) {
    console.error("無效的計時器設定時間: ", s);
    return;
  }
  let intervalId;
  let startTime = new Date().getTime();
  let endTime = startTime + s * 1000;

  intervalId = setInterval(function () {
    let currentTime = new Date().getTime();
    let timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      fn();
    } else {
      console.log("計時器剩餘時間：" + Math.floor(timeLeft / 1000) + " 秒");
    }
  }, 1000);
}

// startTimer(5);
