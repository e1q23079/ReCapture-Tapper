// 音声読み込み
const Audio01 = new Audio("/contents/se/se01.mp3");
// 音声再生
Audio01.play();

// ランキングリスト取得
const requestOptions = {
    method: "GET",
    redirect: "follow"
};

fetch("/getRankList", requestOptions)
    .then((response) => response.json())
    .then((results) => {
        //console.log(results);
        const resultElem = document.getElementById("result");
        let html = '';
        let rank = 0;
        for (let result of results) {
            rank++;
            //console.log(result);
            let minutes = parseInt(result.time / 60);
            let seconds = result.time % 60;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (result.time == timeInfo) {
                html += `<p class="chose">${rank}位 ${minutes}分${seconds}秒</p>`;
            } else {
                html += `<p>${rank}位 ${minutes}分${seconds}秒</p>`;
            }
        }
        resultElem.innerHTML = html;
    })
    .catch((error) => console.error(error));

// ランキングを表示
function showRank(time) {
    fetch(`/getRank/${time}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            document.getElementById('rank').innerText = `${result[0].rank}位`;
        })
        .catch((error) => console.error(error));
}

// 成功時間を表示
function showTime(time) {
    let minutes = parseInt(time / 60);
    let seconds = time % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById('time').innerText = `${minutes}分${seconds}秒`;
}

// 成功時刻を取得
let timeInfo = location.search.substr(1);
showRank(timeInfo);

// 成功時刻を表示
window.onload = function () {
    showTime(timeInfo);
};

// 戻る
function back() {
    window.location.href = '/start.html';
}