vue3でこのブログサイトを作り直す際にCSSライブラリとして`materialize`を選択。

ほんとは`vuetify`を使いたかったのですが、vue3への対応が記事投稿時現在は微妙だったので...

## インストール
ちょっと時間かかりました。
```bash
yarn add materialize-css@next
yarn addmaterial-design-icons
```
iconも使いたかったのでiconもインストール

## main.jsにインポート
```js
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
```

## App.vue内で初期化
これをしないとCSSは適用されるが、waveエフェクトなどが作動しない。
内部でJQueryを使用しているためvueとの相性は良くない?というような記事を見かけますが今の所問題無く動いている。(ように見えるのでオケ)
```js
import M from "materialize-css";
import { onMounted } from "vue";

onMounted(() => M.AutoInit());
```

以上です。