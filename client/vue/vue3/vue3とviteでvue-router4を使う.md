```bash
yarn add vue-router@4
```
`src/router.js`を作成し下記を記述
```js
import {createRouter,createWebHashHistory} from 'vue-router';
```
全体像サンプル
```js
import {createRouter,createWebHashHistory} from 'vue-router';

import BlogPage from "./components/pages/BlogPage.vue";

const routes = [
  {
    path: "/",
    name: "BlogList",
    component: BlogPage,
  },
  {
    path: "/blog/:pid",
    name: "BlogPost",
    component: () => import("./components/pages/parts/BlogContent.vue"),
    props: true
  },
  {
    path: "/product",
    name: "ProductPage",
    component: () => import("./components/pages/ProductPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
```
`main.js`に下記を記述
`.mount('#app')`の前に`.use(router)`を追加
```js
import router from "./router.js"

createApp(App)
  .use(router)
  .mount('#app')
```
`App.vue`などにリンクを記載
```html
<router-link to="/">BLOG</router-link> | 
<router-link to="/product">PRODUCT</router-link>
<!-- 以下に遷移ごとのコンポーネントが表示される -->
<router-view/>
```
route.jsの設定で`props:true`にするとページ遷移時にpropsとして渡せる。
もしくは`params`に含めることでデータを渡せる。
```html
<router-link :to="{name: 'BlogPost', params: {pid: blog.post_id, blog: JSON.stringify(blog)}}">
  <h5>{{ blog.post_title }}</h5>
</router-link>
```
遷移先での値の取り出し方
```js
import { useRoute } from 'vue-router';
const route = useRoute();

const post_id = route.params.pid
const post_blog = route.params.blog
```

## その他扱い方
### 意図的に画面遷移させたいとき
- useRouterを読み込んで使う
- router.push
  
### URLや値をとりたいとき
- useRouteを読み込んで使う
- route.query.[変数名]でurlの`?`部分がとれる
```js
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const blogId = route.query.id;router.push("/")
```
