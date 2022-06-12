全体としては`keyfile.json`を取得してapiを使用する流れとなります。
認証や権限周りであっちこっち行く感じでややこしく感じましたので、備忘も兼ねて全体の流れをまとめます。

私の状態
- GCPのコンソールにログインできる状態
- Google Driveを使用できる
- node.jsとnpmが使える状態
- エディタはvscode
- node-de-scrapeという名前でスクレイピングプログラムを作成しWEB上から画像を取得。これをAPIを使用してgoogle driveにアップロードするところまで自動化したい。

## GCPでプロジェクトを作成しAPIを有効にする
まずはGCPのコンソール画面で適当なプロジェクトを作成します。
![](./../../_image/image0001.png)

以下の手順でGoogle Drive APIを有効にします。
1. サイドパネルの`APIとサービス`から、画面上部の`＋APIをサービスの有効化`
2. `google drive`と検索して`Google Drive API`を選択し有効にする
3. サイドパネルの`認証情報`から、画面上部の`＋認証情報を作成`で`サービスアカウント`を選択
4. サービスアカウント名は適当で良いかと思いますがプロジェクト名を同じにしました。ロールはオーナーを選択します。
5. 作成したサービスアカウントのメールアドレスが表示されているのでクリックし画面上部のタブの`キー`を選択し`鍵を追加`から`新しい鍵を作成`、キーのタイプは`JSON`を選択
6. 認証情報が記されたjsonファイルがダウンロードされるのでこれをローカルのプロジェクトフォルダー内にドラッグ＆ドロップ(私はルート直下に`.private`フォルダを作成しそこに保存しました)※この情報は漏れないよう注意してください。

> 認証情報については例えばGoogleDrive上のファイルを取得するだけならAPI KEYだけでいけるっぽい。いわゆるGETリクエストはいける。今回はファイルを作成したりアップロードしたいので、そういった場合はサービスアカウントを作成する必要があるっぽい。いわゆるPOSTリクエストが必要な場合。ぽいぽい。

## keyfile.jsonを環境変数に登録
パスは適宣変更してください。
他の記事でこの方法が良く紹介されていますが、ターミナルを消すたびに登録する必要があり面倒臭いので、私は`dotenv`を使用して実行時に読み込むようにしました。

一応、環境変数に登録するコマンドも載せておきます。
```bash
export GOOGLE_APPLICATION_CREDENTIALS='/path/to/myProject/.private/keyfile.json'
```
## nodejsでプログラムを作成
googleapisが公式のライブラリっぽいです。
先ほど取得した`keyfile.json`のパスを記述するため`dotenv`もインストールします。
```js
npm i googleapis dotenv
```
> .env内の変数名は`GOOGLE_APPLICATION_CREDENTIALS`以外にしてください。先にターミナルから登録しているとそちらを優先的に読み込むようです。

### まずはインポート
```js
import { google } from "googleapis";
import { } from "dotenv/config";
```
> `ES module`形式で作成しているのでimport形式でやってますがrequireの場合は適宣置き換えてください。

### driveを取得 
```js
const getDrive = async () => {
  const auth = await google.auth.getClient({
    keyFile: process.env.CREDENTIALS,
    scopes: config.apiScope
  });

  const drive = google.drive({ version: 'v3', auth: auth });

  return drive;
}
```

### 指定したフォルダ内のファイル一覧を取得
```js
const getFiles = async () => {
  const query = { q: `'${config.folderId}' in parents and trashed = false` }
  const res = await drive.files.list(query);
  const files = res.data.files;
  console.log(files);
}
```

## Google Driveのフォルダの権限について
フォルダのアクセス権限が無いとパーミッションエラーでプログラムが正しくてもアクセスできません。

ですのでGoogle Driveを開き、アクセスしたいフォルダの`共有`にサービスアカウントのメールアドレスを追加します。
> keyfile.json内にメールアドレスが記載されている

そうすることでアクセスできるようになります。

以上です。
driveを取得できらたらフォルダを作成したり、ファイルをアップロードしたりいろいろ出来るようになります。

クエリーがいろいろあるようですが、改めてまとめ記事を作成できたらなと思っています。