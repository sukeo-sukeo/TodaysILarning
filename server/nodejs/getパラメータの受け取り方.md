## `req.query.[変数名]`で取得。
`req.params`では受け取れなかった。
違いは調べると書いてあるがいまいちわからん。

サーバー側(受け取り手)
```js
router.get("/", async (req, res) => {
  const page = req.query.page;
  console.log(page);
  res.send("this page count: " + page);
});
```
クライアント側からのgetの例（送り手）
```js
axios.get(url, {params: {page: 2}});
// http://localhost3000/?page=2
```
nodejs側で「２」と表示される。