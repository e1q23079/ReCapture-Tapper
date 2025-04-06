// Expressを利用
const express = require('express');
// MySQLを利用
const mysql = require('mysql2');
// ポート番号を指定
const port = process.env.PORT || 3000;

const app = express();

// SQLへの接続情報
const connection = mysql.createConnection({
    host: process.env.HOST, // 環境変数：HOST
    user: process.env.USER, // 環境変数：USER
    password: process.env.PASSWORD, // 環境変数：PASSWORD
    database: process.env.DATABASE  // 環境変数：DATABASE
});

// データベースへ接続
connection.connect();

// JSON形式に設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// publicフォルダーを公開
app.use(express.static('public'));

// timeを指定して，ランキングを取得（GET）
app.get('/getRank/:time', (req, res) => {
    connection.query('SELECT DISTINCT time FROM record ORDER BY time;', (error, response) => {
        if (error) throw error;
        //console.log(response);
        //res.json(response);
        //console.log(req.params.time);
        let rank = "データなし";
        for (let i in response) {
            //console.log(response[i].time);
            if (response[i].time == req.params.time) {
                rank = parseInt(i) + 1;
            }
        }
        const rankJson = [{ rank: rank }]
        res.json(rankJson);
    });
});

// 上位100名のランキングリストを取得（GET）
app.get('/getRankList', (req, res) => {
    connection.query('SELECT DISTINCT time FROM record ORDER BY time LIMIT 100;', (error, response) => {
        if (error) throw error;
        //console.log(response);
        res.json(response);
    });
});

// 登録されているデータをすべて取得（GET）
app.get('/showList', (req, res) => {
    connection.query('SELECT time FROM record ORDER BY time;', (error, response) => {
        if (error) throw error;
        //console.log(response);
        res.json(response);
    });
});

// 時刻を記録する（POST）
app.post('/registration', (req, res) => {
    connection.query(`INSERT INTO record(time) VALUES (${req.body.time});`, (error, response) => {
        if (error) throw error;
    });
    res.send(req.body);
    //console.log(req.body);
});

app.listen(port, () => {
    console.log("Server is running!!");
});