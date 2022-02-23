# デフォルトで`.env`ファイルを読む
ただし`VITE_`接頭詞が必要
```.env
VITE_BASE_URL=https://hoge
```
呼び出し型はちょっと特殊
```js
import.meta.env.VITE_BASE_URL
```

# envファイルを読み出し分ける方法
.envファイルの末尾に任意の名前をつける
今回は開発用(.dev)と本番用(.product)にわける
```bash
.env.dev
.env.product
```

yarnで起動するときに`--mode [ファイルの末尾名]`とする
```bash
yarn dev --mode dev
```
```bash
yarn dev --mode product
```