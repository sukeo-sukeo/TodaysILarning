# cronはrootで実行される
タイトルの通りなのですがMacOSやLinuxに搭載されているプログラム自動実行ツール`cron`ですが、`/root/`で実行されます。

例えば`/home/hoge/hogehoge.py`を毎日３時に実行するcronを書いたとします。
```bash
00 3 * * * /bin/python3 /home/hoge/hogehoge.py
```
`/home/hoge/hogehoge.py`のプログラム中に`./hoge.csv`という相対pathでの記述があった場合、cronは`/root/hoge.csv`と読み取ります。
そこにファイルはありませんので当然エラーとなりプログラムは動きません。
ですので明示的に`/home/hoge/hoge.csv`としてやる必要があります。
<br>

## 変更箇所がたくさんあってしんどい場合の対処法
cronの記述を変更することでも対応可能です。
```bash
00 3 * * * cd /home/hoge/; bash -l -c '/bin/python3 /home/hoge/hogehoge.py'
```
実行ディレクトリに`cd`してから実行する、という記述をしてやると`./hoge.csv`のままで動かすことが可能です。
<br>

## まとめ
- cronは`/root`で実行される
- cronで動かくプログラムは絶対pathで記述する
- もしくはcornの記述で`cd`でディレクトリ移動を指示する
<br>

## おまけ
ログ監視は`less F(shift+f)` は便利