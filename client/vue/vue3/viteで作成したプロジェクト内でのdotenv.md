# デフォルトで`.env`ファイルを読む
ただし`VITE_`接頭詞が必要
```.env
VITE_BASE_URL=https://hoge
```
呼び出し型はちょっと特殊
```js
import.meta.env.VITE_BASE_URL
```