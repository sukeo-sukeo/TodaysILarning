- firebaseでプロジェクトを作成する
- プロジェクトの概要からアプリを追加する
- yarn add firebase か npm i firebase
- 初期化プログラムをコピペする
  
main.js
```js
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // コンソールからコピペしてくる
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

```