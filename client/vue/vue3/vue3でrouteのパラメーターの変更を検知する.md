## urlパラメーターが変更したのに再描画されへん！
同じコンポーネント内でurlパラメーターの値によって再描画したい場面がありました。
```js
let hoge = ref(route.params.hoge)
```
上記はテンプレートにリアクティブに作用するのですが、`setup`内の処理は再度走らないため、APIでデータを取得してくるテンプレートの場合更新がされないことになります。

いずこかに居られるの達人様の記事で知識を得ました。
> 例えば`/page/1` から `/page/2` に移った時、Vue は同じコンポーネントのインスタンスを再利用しようとする
> 
> ライフサイクルフックが呼ばれない

**ライフサイクルフックが呼ばれない**、つまり`created`も呼ばれないということです。
<br>

そこで
`onBeforeRouteUpdate`の出番です。

パラメータが変更されたときに`onBeforeRouteUpdate`内の処理が発火します。

```js
import { onBeforeRouteUpdate } from 'vue-router';
onBeforeRouteUpdate(async (to, from) => {
  // 遷移後のpathの情報
  console.log(to);
  // 遷移前のpathの情報
  console.log(from);
});
```

やはりvueは**ライフサイクルフック**の理解が重要だな〜と改めて感じた一幕でした。

はぁ〜また知識が増えた。

以上。