# 目から鱗
:keyが変更される度にコンポーネントが破棄・再マウントされるという特性を利用する。
- 再描画させたい要素に`:key`を設置
- key.valueに++する
- 再描画される
```html
<template>
  <div>
    <child :key="resetKey" ref="component" />
    <button @reset="reset">reset</button>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  setup() {
    const resetKey = ref(0)
    const reset = () => {
      resetKey.value++
    }
    return {
      resetKey,
      reset
    }
  }
}
</script>
```