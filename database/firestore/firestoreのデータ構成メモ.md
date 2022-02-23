![](../../_image/firestore_sample.png)

# わかりにくいfirestoreを自分なりのわかりやすいイメージで書き記す

|firestore||イメージ|サンプル|
|-|-|-|-|
|コレクション|⇨|フォルダ|items|
|ドキュメント|⇨|ファイル|一意のid|
|コレクション|⇨|データ|さまざまなデータ形式|

### 補足
- 一意のid => inodeみたいなイメージ？
- オブジェクト形式はスキーマを統一する必要あり？

# 前準備
ウェブバージョン９ではimportで必要な関数をimportして使用できる。とっても簡単
```js
import { doc, getFirestore, collection, addDoc, getDoc, setDoc, query, where, getDocs, updateDoc, deleteField, serverTimestamp } from "firebase/firestore";
```

# データの追加
```js
const db = getFirestore(); //初期化
const folder = "items" //第一コレクション

const res = await addDoc(collection(db, folder), {data}); //オブジェクトが返ってくる
console.log(res[0].id) //ドキュメントid
``` 
- resに返ってくるオブジェクトはmapやfilterメソッドは持っていない。forEarchはもっている。
- 複数データをループしてデータ追加する際、async/awaitを使いたい場合はfor...ofを使用すると良さげ

### タイムスタンプ
タイムスタンプはファイアーストア専用のメソッドがあるのでそいつをデータに含める。事前にimport。
```js
const date = serverTimestamp()
```

# データ取得
```js
const docs = await getDocs(query(itemsRef, where("uid", "==", uid)));
  docs.forEach((d) => data.push(d.data()));
  console.log(data);
  return data
```