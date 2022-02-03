```js
import {getCurrentInstance} from "vue";
import path from "path";

const filePath = getCurrentInstance().type.__file;
console.log(filePath);
// src/components/hogehoge.vue
const componentName = path.basename(filePath).split(".")[0];
// hogehoge
```