- input属性をつくる
- domに加える
- valueを入れる
- selectさせる
- copyを実行する
- 要素を削除
```js
const input = document.createElement("input");
// input.setAttribute("type", "hidden");
document.body.appendChild(input);
input.value = copyさせたいtext;
input.select();
document.execCommand("copy");
document.body.removeChild(input);
```
### ポイント
- hidden属性をつけると動作しない
- 表示させたくない時はcreateElementでつくり追加してすぐに消す
  
そんな感じです。