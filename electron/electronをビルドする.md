## 環境
- vue-cli
- electron-builder
- macos

### mac用
初期登録のscriptsで簡単ビルド
```
yarn electron:build
```

### win用
いろいろ設定がいる模様
ちょっとよくわからない。模索中。
```
npx electron-builder --win --x64
```
- `"main":`を`background.js`から`src/background.js`に変更
- `"files":`にまとめるファイルを記述
- package.jsonに`build`プロパティを追加
```json
"build": {
    "appId": "sukeo.jisseki-viewr",
    "productName": "jisseki-viewr",
    "files": [
      "package.json",
      "package-lock.json",
      "src/**/*",
      "public/**/*"
    ],
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "zip"
    }
  }
```
## もしくは...
`vue-cli-plugin-electron-builder`が入っている場合は`vue.config.js`にオプションを記載する。
```js
pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.example.app",
        win: {
          target: "portable",
          icon: "resources/icon.png"
        },
        mac: {
          target: "dmg",
          icon: "resources/icon.png"
        },
      }
    }
  },
```
あとはpackage.jsonのscriptsに
```json
"electron:build-win": "vue-cli-service electron:build --win"
```
こんな感じでコマンドを追加。
```bash
yarn electron:build-win
```
を実行するとmacとwindows両方の実行ファイルが作られた

## preload.jsの配置場所
これの答えを模索中
```js
 preload: path.join(__dirname, "preload.js")

// 開発中は下記のpathに切り替えている
 preload: path.join(__dirname, "..", "src","preload.js")
```
これでビルド後は`~/resources/app.asar/preload.js`となる。
今のところpreload.jsが.asarに含まれない。

### 確認方法
`resources`フォルダに移動してから
```bash
asar extract ./app.asar output
```
asarコマンドが無い場合
```bash
npm i -g asar
```
これでoutputフォルダにファイルが解凍される。

## 解決方法(模索中)
- ビルド前にpublicフォルダに入れる (publicフォルダ内はそのままコピーされるらしい)
- vue.config.jsに下記を追加する
  
```js
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js"
    }
  },
```

多分この方法だと思うのだがpathが悪いのか今のところ上手くいっていない...