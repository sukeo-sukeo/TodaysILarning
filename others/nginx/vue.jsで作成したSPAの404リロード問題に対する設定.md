nginx側の設定ファイル`default.conf`の`serverディレクティブ`内に下記を追加すればOK。
```bash
error_page 404 /;
```

ただしgetエラーは返ってくる。
サイトの見た目上の問題は解決。
