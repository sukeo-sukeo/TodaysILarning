```bash
yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome@prerelease @fortawesome/free-brands-svg-icons
```
```js
// main.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, fab);

const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.mount("#app")
```
`brands`アイコンを使用する場合は`:icon`としてiconをバインド。
`{prefix: 'fab', iconName: 'markdown'}`を記述する。
```html
<fa icon="leaf"/>
<fa :icon="{prefix: 'fab', iconName: 'markdown'}"/>
```