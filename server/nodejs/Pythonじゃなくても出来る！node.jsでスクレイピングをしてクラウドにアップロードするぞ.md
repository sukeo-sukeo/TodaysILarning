スクレイピングといえばやっぱりpython！
そんな記事が良く見られますが、javascriptでも十分簡単に目的を果たす事ができます。

長年にわたり蓄積された素晴らしいパッケージたちがnpmにはありますので、それらを活用してスクレイピングのプログラムを書いていきたいと思います。

## やりたいこと
あるチラシ掲載サイトからチラシ画像をダウンロードして、GoogleDriveにアップロードします。

## ざっくり手順
1. ターゲットサイトからチラシ画像のURLを収集する
2. ダウンロードしてサーバーに保存する
3. apiを使用してGoogleDriveにアップロードする
4. メールで完了通知を送信する
5. 上記をcronで定期実行させる

以上、順にやっていきます。

## 環境
開発環境はmacbook、エディタはvscodeです。
本番環境はLinuxのCentOS7、webサーバーはnginxです。
タイトルの通りpythonではなくjavascript(node.js)で作っていきます。

## つくっていく
まずはpackage.json。
> GoogleDrive, GCPコンソール, node.js、npmは使えるものとして進めます

```json
{
  "name": "node-de-scrape",
  "type": "module",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@aternus/csv-to-xlsx": "^1.0.19",
    "csv-parse": "^5.1.0",
    "csv-writer": "^1.6.0",
    "dotenv": "^16.0.1",
    "google-auth-library": "^8.0.2",
    "googleapis": "^101.0.0",
    "jsdom": "^19.0.0",
    "node-fetch": "^3.2.5",
    "sleep": "^6.3.0"
  }
}

```

### まずはGoogleDriveにアクセスできるようにする
[こちら](https://sukeo.net/content?id=19)の記事でGCPコンソールからGoogleDriveアクセスの認証の仕方について記載しています。

GoogleDriveにプログラムからアクセス出来るよう認証を取得してください。
具体的には認証キーとなるjsonファイルをダウンロードします。

といってもポチポチやっていくだけで簡単ですので記事を参考にやってください。

### 必要なパッケージをインストール
認証ファイルが取得できたらいよいよプログラムからGoogleDriveへアクセスしていきます。

```bash 
npm i @aternus/csv-to-xlsx csv-parse csv-writer dotenv google-auth-library googleapis jsdom node-fetch sleep
```
重要なのは`jsdom`と`googleapis`。

