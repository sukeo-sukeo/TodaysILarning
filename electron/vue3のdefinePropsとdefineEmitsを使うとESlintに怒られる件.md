## よくわからんが
怒られる

propsやemitに関わるコードを変更してホットリロードするタイミングで怒られる

serveでリビルドするときは怒られない

突然怒るようになったのでよくわからんので
vite.config.jsに下記でESlintを無効化
```js
chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
```
