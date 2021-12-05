## router.jsに`scrollBehvior`を定義します
`to`と`from`はurl変更を伴う画面遷移時に常にデータが入ります。
`savedPosition`はブラウザバック時にデータが入ります。直前の画面遷移時のスクロール位置が`{left: 0, top: 453}`みたいな形で入っています。
```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
  }
})
```

### 常にTOPへ戻る
```js
scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
```

### ブラウザバック時は遷移前の位置に戻りたい
```js
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
```

### 非同期パターン
ページ内データをapiなどで取得している場合、画面が出来上がった後にスクロール位置を戻したいことがあります。
そんな時は下記のように記述します。
`setTimeout`で設定した時間後に`savedPosition`の位置情報へのスクロールが発動します。
ローダーやトランジションなどと組み合わせて自然な挙動に見せられると良いと思います。
```js
scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition);
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        setTimeout(() => {
          resolve(savedPosition);
        }, 100)
      } else {
        resolve({ left: 0, top: 350 });
      }
    });
  }
```