## ネット接続まで
- ネットワークのアダプター１をNATにしておく（最初からなってるかも）
- nmtuiでenp0s3を編集
- ip6をignore オートコネクトにチェック
- `ping google.com`とかで疎通確認してみる
- `systemctl restart NetworkManeger`
- `systemctl restart network` とかしてみる
- ここまででこのゲストOSから外へ繋げられる

## いつものmacからssh接続まで
- ファイル ホストネットワークマネージャー 作成 DHCPは無効
- アダプター２にホストオンリーアダプター 作成したネットワークを割り当て ipアドレスを控えておく
- nmtuiでenp0s8を編集
- ip4に上で作成したipアドレスを入力(**末尾は1以外の0~255**、`/24`まで入力)
- ip6をignore オートコネクトにチェック

## ubuntuの場合
- `sudo apt install net-tools`でnmtuiのインストールが必要