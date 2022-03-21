## 自分自身のページに遷移してエラーチェックを行う
formタグのaction属性を空にすると現在のファイルに遷移する。
入力内容のバリデーションに使用する
```html
 <form action="" method="post" enctype="multipart/form-data">
```

## formの値の受け取り方
```php
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
```

## dbから該当データをとってくるときのtips
sqlに`limit 1`をつけるクセ
誤って全データ流出を避けるため（完璧ではない）

## パスワードの整合
$password=ユーザーからの入力
$hash=dbからとってきた暗号化されたパスワード
```php
password_verify($password, $hash)
```
便利だにゃー

## login後、会員ページへ遷移するとき
セキュリティの観点からsessionidを振り直す
```php
session_regenerate_id();
```

## cokkieの中にsessionidが保存される