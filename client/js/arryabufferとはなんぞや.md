これまでも何となく使うことはありましたが、オレオレ業務システム作成にあたりブラウザ上でExcelファイルを扱う必要が出てきたため改めて学習。

## バイナリデータとは？
WEB上でファイルを処理する時に出くわすもの。

## javascriptで処理可能
ただ、`ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`...いろいろあって難しい印象。

下記サイトが非常に勉強になりました。
[現代の JavaScript チュートリアル](https://ja.javascript.info/arraybuffer-binary-arrays)
引用させてもらいながら勉強を進めます。

### 基本はArrayBuffer
- 固定長の連続したメモリ領域への参照。
- 何かの配列ではない(専用のviewオブジェクトで見る)
- 単に生のバイト列
- `ArrayBuffer`でデータの塊をつくってviewで解釈を与えて見る！

下記はviewオブジェクトの例。
私がよく使うのは、というか使ったことがあるのは`Unit8Array`です。これがviewオブジェクトで`ArrayBuffer`をみるメガネなんだね！って認識できればとりあえずOKかな。進歩進歩。

- Uint8Array – `ArrayBuffer`にある各バイトを、0から255(1バイトは8ビット)までの値となる、別々の数として扱います。このような値は “8ビット符号なし整数(8-bit unsigned integer)”と呼ばれます。
- Uint16Array – 各2バイトを、0から65535までの値となる整数として扱います。これは “16ビット符号なし整数”と呼ばれます。
- Uint32Array – 各4バイトを0から4294967295までの値となる整数として扱います。これは“32ビット符号なし整数”と呼ばれます。
- Float64Array – 各8バイトを5.0x10-324から1.8x10308までの値となる浮動小数点として扱います。


>**バイト列**
バイト列とは、文字や数値といった特定の形式や意味が与えられていない、任意のビットパターンからなる1バイトのデータが並んだデータ集合のこと。
8ビットで1バイト(0~255までの256通りの組み合わせ)
1ビット・・・0か1の2進数

>**viewオブジェクト**
これはただのメガネ。
ArrayBufferに格納されたバイトへの解釈を与えるメガネ。

### <u>ArrayBuffer はコアとなるオブジェクト、すべてのもののルート、生のバイナリデータです。</u>
>そこに書き込んだり反復しようとする場合、基本的にほぼすべての操作に対して、ビューを使用する必要があります。

うむ。これだけでも大分整理されてきた。

最後に実践的なコードを備忘。
ブラウザ上のinputタグからExcelファイルを読みこみ`File api`で読み込み、JSON化して表示。
JSON化したあとはブラウザで表示したり、サーバーに送ってデータベースに登録したり、煮るなり焼くなり。
有名なExcelライブラリ`Sheet.js`をCDNで使用。
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.11.19/xlsx.full.min.js"></script>
```

```js
// eにinputからのファイルデータが来る
const inputSheet = (e) => {
    const file = e.target.files[0];
    const filename = file.name;
    parseSheet(file, showJson);
};

// ここがキモ
const parseSheet = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const unit8 = new Uint8Array(data);
    const wb = XLSX.read(unit8, { type: "array" });
    const sheetNames = wb.SheetNames;
    const sheetName = sheetNames[0];
    const json = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
      header: 1,
    });
    callback(json);
  };
  reader.readAsArrayBuffer(file);
}

const showJson = (json) => {
  console.log(json);
}
```

## ざっくり解説
- FileReaderのonloadメソッドでExcelファイル内データをボコッと読み取り・・・生データ？、ArrayBuffer?
- viewオブジェクトである`new Unit8Array()`にいれて`ArrayBuffer`を分割する感じにする
  
コンソールログでみると下記のように表示される。
この時点では人間では読み取れないデータ。
> buffer: ArrayBuffer(1520128)

> unit8: Uint8Array(1520128) [208, 207, 17, 224, 161, 177, 26, 225, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 3, 0, 254, 255, 9, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 151, 11, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 254, 255, 255, 255, 0, 0, 0, 0, 254, 255, 255, 255, 0, 0, 0, 0, 127, 11, 0, 0, 128, 11, 0, 0, 129, 11, 0, 0, 130, 11, 0, 0, 131, 11, 0, 0, 132, 11, 0, 0, …]

上記をXLXSライブラリを使ってJSONデータに変換している。
ここの処理は本当はライブラリを使わずに構築した方が勉強になると思いますが、一気にやろうとすると結局わからなくなるので。
また追々ライブラリ無しバージョンでやってみたいと思います。

## 引き続き
オレオレ業務システム制作に邁進します。
しかし最近のブラウザはつえーですね。

