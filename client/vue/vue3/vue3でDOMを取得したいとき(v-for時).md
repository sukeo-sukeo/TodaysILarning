# refを応用する
`ref`をつけるだけではv-forで生成した要素の取得ができなかったため調べたところ

`:ref="el => { if (el) divs[i] = el }"`

の記述でいけました。
公式ドキュメントにもv-forのときはこうするんやでとちゃんと書いてありました。
[vue3 公式ドキュメント](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-with-jsx)

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // make sure to reset the refs before each update
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```

また`onBeforeUpdate`についてもどんな動きをするのか、今回で掴めましたのでまた別の記事にてまとめたいと思います。