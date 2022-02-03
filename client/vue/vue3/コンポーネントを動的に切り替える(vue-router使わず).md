# componentディレクティブを使う
`ref`だとwarnが出たので調べったところ`shallowRef`を使ったら出なくなった。

script
```js
import Editer from "./components/Editer.vue";
import Viewer from "./components/Viewer.vue";
import { shallowRef } from "vue";
const currentView = shallowRef(Viewer)
```
template
```html
<component :is="currentView"></component>

<button @click="currentView = Editer">edit</button>
<button @click="currentView = Viewer">viewr</button>
```