## これは知らなかった！
これは良く使う
```js
console.log(e.target);
```
これは知らなかった
```js
console.log(e.currentTarget);
```

前者はイベントを取得する
後者はイベントを設定した要素を取得する

data属性を取得したいときなどは後者を使うことで違う要素がとれてくることを防げる

これは実際に使って見たほうがわかりやすいと思う。

深い深いHTMLとJavascript。