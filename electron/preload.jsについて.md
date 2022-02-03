## バックグラウンドとレンダラーの橋渡し
`import`だとエラーに
`require`で正常に読み込み
```js
const { contextBridge, ipcRenderer, ipcMain } = require("electron");

// "myapi"にコンテキスト名
// mama: メソッド名
// invoke("mama")でメインプロセスに登録してある関数を呼び出す→nodejsの機能を呼び出せる
contextBridge.exposeInMainWorld("myapi", {
  mama: async (data) => await ipcRenderer.invoke("mama", data),
  foo: async (data) => await ipcRenderer.invoke("foo", data)
});
```