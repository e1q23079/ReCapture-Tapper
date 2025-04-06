// 音声
const Audio02 = new Audio("/contents/se/se02.mp3");
const Audio03 = new Audio("/contents/se/se03.mp3");

// データを送信（POST）
async function sendData(time) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("time", time);

    const request = new Request("/registration", {
        method: "POST",
        body: urlencoded,
    });

    await fetch(request);
}

// 成功回数
let count = 0;

// カウント（秒）
let time = 0;

// 成功状況確認
async function check() {
    // クリア時
    if (count >= 5) {
        clearInterval(intervalID);
        //alert("クリア");
        // 音を鳴らす
        await sendData(time);
        window.location.href = `/result.html?${time}`;
    }
};

// 秒数カウント関数
const stopWatch = () => {
    time++;
    let minutes = parseInt(time / 60);
    let seconds = time % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById('time').innerText = `${minutes}分${seconds}秒`
};

// タイマーID
let intervalID;

// 最初判定フラグ
let firstFlag = false;

// Recapture API を読み込み完了時
var onloadCallback = function () {
    if (!firstFlag) {
        Audio03.play();
        intervalID = setInterval(stopWatch, 1000);
        firstFlag = true;
    }
}

// 認証成功時
var clear = function () {
    count++;
    //alert("完了");
    Audio02.play();
    setTimeout(check, 1000);
};

// 認証タイムアウト時
var out = function () {
    count--;
    //alert("タイムアウト");
};

// 戻る
function back() {
    if(window.confirm("本当に終了しますか？")){
        window.location.href = '/start.html';
    }
}