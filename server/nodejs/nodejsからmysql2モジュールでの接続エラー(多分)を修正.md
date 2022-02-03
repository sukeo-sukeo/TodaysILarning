## 変なエラーが出てページ内容が表示されない
vue+node+mysqlで作成したこのブログサイトを公開しましたが、何回かのアクセスもしくは時間経過のち下記のようなメッセージがターミナル上に表示され...

```bash
got packets out of order. Expected 29 but received 0
```
この状態でアクセスすると...
```bash
Can't add new command when connection is in closed state
```
となります。

## これは何？
サイトへアクセスするとサイト自体は表示されます。
ただ中身が表示されません。正確にはブログ記事です。
データベースからブログデータをとってくる仕組みにしてあるので、そのデータベースのデータが表示されていない所をみると

- MySqlの問題
- expressサーバーで使用している`mysql2`モジュールの実装に問題
  
いずれにせよデータベース周りの問題だと思いました。

## google先生に聞きまくる
エラーメッセージを貼り付け聞きまくった結果実装方法に問題がある可能性が出てきました。
- dbインスタンスをグローバル変数で受けている点?
- もしかして不要なコードがある?

この２点が怪しそうということになりました。
```js
let db; //これが怪しい...
(async () => {
  try {
    db = await mysql.createConnection({
      host: dbconfig.HOST,
      user: dbconfig.USERNAME,
      port: dbconfig.PORT,
      password: dbconfig.PASSWORD,
      database: dbconfig.DATABASE,
    });
    await db.connect(); //これも怪しい...
    console.log("database connection success!");
  } catch (err) {
    console.log(err);
  }
})();
```

## どうなった？
`await db.connect`をコメントアウトしました。
しばらくアクセスし、時間経過のち確認してみます。

`await db.connect`の記述はスタックオーバーフローなどを調べた際に記述がなく、npmのmysql2公式をみても記述がありませんでした。
なので一度コメントアウトしてみました。

うまく動いてくれることを祈ります...

## しばらくすると...
朝メンテナンスし、夜サイトにアクセスしてみるとやはりデータベースが機能していないようでした。
サーバーのコンソールには例のエラーが。
```bash
got packets out of order. Expected 29 but received 0

Can't add new command when connection is in closed state
```

これで接続回数ではなく、時間が経つとDBが閉じる的な動きをしているとの予測が固まりました。

## 対策を調べる
時間でクローズしているという予測なのでmysqlのtimeout関連の設定を確認してみる。

```sql
show variables like "%timeout%";
```
こんな表が出力されます。
```sql
+-----------------------------------+----------+
| Variable_name                     | Value    |
+-----------------------------------+----------+
| connect_timeout                   | 10       |
| delayed_insert_timeout            | 300      |
| have_statement_timeout            | YES      |
| innodb_flush_log_at_timeout       | 1        |
| innodb_lock_wait_timeout          | 50       |
| innodb_rollback_on_timeout        | OFF      |
| interactive_timeout               | 28800    |
| lock_wait_timeout                 | 31536000 |
| mysqlx_connect_timeout            | 30       |
| mysqlx_idle_worker_thread_timeout | 60       |
| mysqlx_interactive_timeout        | 28800    |
| mysqlx_port_open_timeout          | 0        |
| mysqlx_read_timeout               | 30       |
| mysqlx_wait_timeout               | 28800    |
| mysqlx_write_timeout              | 60       |
| net_read_timeout                  | 30       |
| net_write_timeout                 | 60       |
| replica_net_timeout               | 60       |
| rpl_stop_replica_timeout          | 31536000 |
| rpl_stop_slave_timeout            | 31536000 |
| slave_net_timeout                 | 60       |
| wait_timeout                      | 28800    |
+-----------------------------------+----------+
```
調べていくとこの中の
`wait_timeout`が怪しそうでした。
> ### wait_timeout
>アプリケーションなどから接続された非対話型の接続に対してのアイドルタイムアウト時間（秒）となります。コネクションステータスがSleep（アイドル）の状態がこのタイムアウト値を超えると切断されます。デフォルトは28800秒（8時間）で，オンラインでの変更可能です。


この値が28800秒(8時間)になっていた。
なんとなく午前中は正常に動いてて、夜にエラーが出る挙動と一致する時間のように思えます。