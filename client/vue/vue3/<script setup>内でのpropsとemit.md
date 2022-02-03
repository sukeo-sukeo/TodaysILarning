## props
```js
const props = defineProps({
    name: String
  })
```

## emit
子の方
```js
  // 配列でイベント名を登録しておく
const emits = defineEmits(["親のイベント名A", "親のイベント名B"]);
const arg = "引数も渡せます"
emits("親のイベント名A", arg)
```
onchangeイベントでeventの渡し方
`e`とかじゃundefinedになるので注意。
```js
@change="emits('choice-file', $event)"
```
親の方
```vue
<template>
  <DDBox :name="name" @親のイベント名A="親内のscript内に書かれた関数名"/>
</template>
<script setup>
  const 親内のscript内に書かれた関数名 = (arg) => {
    alert(arg)
  }
  // →"引数も渡せます"とアラートが出ます
</script>
```