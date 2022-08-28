# データ収集方法
メインURLにアクセス
シャンパーニュ
https://www.wine-searcher.com/regions-champagne

- regions以降を変更することでクロール先を変えられる設計にする
- サイトの表示ページ数が２０ページまでのため、人気のある上位約５００アイテムのデータ収集となる(24アイテム＊20ページ)

### 一段階のクロール
- 24アイテムのリストから画像、商品名、品種、平均売価を取得
- ページURL取得 -> .next-pageを踏んで行く、.next-pageのouterにdislableがあれば終了
- 一覧ページのみへのアクセスだとdescriptionが手に入らない
### 二段階のクロール
- もう一階層入るとdescriptionが手に入る

### 三段階のクロール
- さらにもう一階層入るとメゾンの詳細なdescriptionが手に入る

# 画像データについて
https://www.wine-searcher.com/images/labels/28/40/11242840.jpg?width=32&height=48&fit=cover

上記をのクエリ部分を削除することで高解像度の画像を入手可能
https://www.wine-searcher.com/images/labels/28/40/11242840.jpg

# 翻訳について
DeepL APIを使用
目視チェックをすればより精度があがるが...

# 制作中のトピック
サンプルデータを`src/assets/images/`に入れてあり、それの読み込み方にひとくせがある。
`new URL`を使いURLを生成する。
サンプルデータに書くpathは絶対パスです。
```js
const generateImgPath = (imgPath) => {
  return new URL(imgPath, import.meta.url).href
}
// numは乱数を生成して使いました

<template>
  <v-img width="200" :src="generateImgPath(sampledata[num].img)"></v-img>
</template>
```
### 画面遷移時にオブジェクトを渡したい
`router.push`でURLに載せることができるが、上限が2000文字くらいのため多分破綻する。

なので、
emitsで引数としていったんApp.vueにわたし、それをpropsで渡すという形で成功。
router-viewで渡すので`<router-view>`内に`@`と`:`を記述した。`script`内にemitsでうけた引数を用意しておいた変数に入れる。そいつをporpsとして渡す。少し面倒だがemitsとpropsで完結できた。
