# ReCapture-Tapper
```
npm run start
```
## 環境変数
- HOST
- USER
- PASSWORD
- DATABASE
## データベース
```
CREATE TABLE record(
	id INT AUTO_INCreMENT NOT NULL PRIMARY KEY,
	time int(11) NOT NULL
);
```

```
--
-- データベース: `gameRecord`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `record`
--

CREATE TABLE `record` (
  `id` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `time`
--
--
-- INSERT INTO `time` (`id`, `time`) VALUES
-- (1, 12);
--
--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `time`
--
ALTER TABLE `time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```