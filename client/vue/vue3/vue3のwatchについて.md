## propsで渡ってくるデータをwatchする
- propsオブジェクトに対して`ref`を使う
- watchの第一引数にpropsオブジェクトを入れる
- 第二引数はコールバック
- 第三引数に`deep`を指定する
```js
const props = defineProps({
  data: [String, Object, Array]
})

const data = ref(props);

watch(data, () => {
  console.log(data.value.data);
},{deep: true});

// 呼び出し方は変数.value.propsのキー
```