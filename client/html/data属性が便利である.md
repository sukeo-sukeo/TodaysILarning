`data-`でその要素に表示する値と別の値をもたせることができる。
```html
data-path="hogehoge"
```

例えばoptionタグに`data-path="hogehoge"`みたいな画像パスをもたせ、jsで下記のようにアクセスができる。
```js
thumnailSelect.options[1].dataset.path
```