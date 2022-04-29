## 結論 : 色々とむずい
### 関わったもの
- vue-router
- vue3
- axios

### 処理の流れ
1. "/"にアクセスするとsearver側からmaxpage数が返ってくる
2. pagenaitonコンポーネントでmaxpage分のボタンをv-forする(router-linkをかます)
3. 上記のrouter-linkに{query:{page}}を設定する
4. 上記をクリックすると`/?page=2`とかつく
5. {paramsu:{page}}でやるとurlにつかない。でもパラメータは送信される。違いはブラウザバックでのhistoryモードに対応できないっぽい。そんな気がする。なのでページネーションの場合はブラウザバック対応したいので`query`で渡す
6. `watch`でrouteオブジェクトの変更があったらqueryを取り出す、みたいな処理を書く


router.js
```js
import { createRouter, createWebHistory } from "vue-router";

import BlogList from "./components/BlogList.vue";

const routes = [
  {
    path: "/",
    name: "BlogList",
    component: BlogList
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
```

main.js
```js
// routerと.use(router)を追加
import { router } from "./router.js";

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
```

Pagination.vue
```vue
<script setup>
const props = defineProps({
  maxPage: [Number, String]
});

</script>

<template>
<div class="d-flex">
  <v-btn v-for="page in maxPage" :key="page">
    <router-link :to="{path: '/', query: {page}}">
      {{page}}
    </router-link>
  </v-btn>
</div>

</template>

<style>

</style>
```

BlogList.vue
```vue
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { BlogFinder } from "../lib/BlogFinder.js";

import BlogListCard from "./parts/BlogListCard.vue";
import Pagination from "./parts/Pagination.vue";

const route = useRoute();

const bf = new BlogFinder();
const blogDataList = ref("");
const maxPage = ref("");

onMounted(async () => [blogDataList.value, maxPage.value] = await bf.getFullData());

watch(route, async () => {
  const page = route.query.page;
  [blogDataList.value, maxPage.value] = await bf.getFullData(page);
});

</script>


<template>
  <v-app>
    <v-main>
      <h1>my blog site</h1>
      <ul>
        <li v-for="blogData in blogDataList" :key="blogData">
          <BlogListCard
           :blogData=blogData />
        </li>
      </ul>
      <Pagination
       :maxPage=maxPage />
    </v-main>
  </v-app>
</template>
```

App.vue
```vue
<script setup>
</script>

<template>
  <v-app>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>
```

BlogFinder.js
```js
import axios from "axios";
import { appOpt } from "../config/app.js";

const URL = appOpt.url;

class BlogFinder {
  async getFullData(page = 1, url = URL) {
    const result = await axios.get(url, { params: { page } });
    console.log(page, url);
    console.log(result.data);
    const blogs = result.data.result;
    const maxPage = result.data.maxPage;
    return [blogs, maxPage];
  }
}

export { BlogFinder };
```