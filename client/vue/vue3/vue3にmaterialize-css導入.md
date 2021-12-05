# インストール
iconも使いたかったのでiconもインストール
このときはちょっと時間かかりました
```bash
yarn add materialize-css@next
yarn addmaterial-design-icons
```

# main.jsにインポート
```js
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
```

# App.vue内で初期化
これをしないとCSSは適用されるが、waveエフェクトなどが作動しない。
vueとの相性は良くない?ような記事を見かけますが今の所問題無く動いている。
```js
import M from "materialize-css";
import { onMounted } from "vue";

onMounted(() => M.AutoInit());
```