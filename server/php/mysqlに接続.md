## 接続
```php
$db = new mysqli('localhost:8889', 'root', 'root', 'testdb');
```

## query実行
```php
$db -> query('drop table if exists test');
$db -> query('create table test(id INT)');
echo 'tableを削除して作成しました';
```

## errorの表示
mysqlのエラーは画面に表示されない
```php
$success = $db->query('creat table test(id INT)');

if ($success) {
  echo 'tableを削除して作成しました';
} else {
  echo 'SQL失敗';
  echo $db->error;
}
```

## dataを取り出す
fetch_assoc()で取り出す
```php
$db = new mysqli('localhost:8889', 'root', 'root', 'testdb');
$records = $db->query('select * from my_items'); // スペルミスなどあるとfalseが返る

if ($records) {
  while ($record = $records->fetch_assoc()) {
    echo $record['item_name'] . '<br>';
  } // カラム名で取り出す
}
var_dump($records); // object
```

## dataを挿入する
簡単なメモ帳作成を例にサンプルを掲載。
resultにはBool値が入る
```php
$db = new mysqli('localhost:8889', 'root', 'root', 'testdb');
$result = $db->query('insert into memos (memo) values("PHPからのメモです")');

if ($result) {
  echo 'データを挿入しました';
} else {
  echo $db->error;
}
var_dump($result);
```

### stmt,prepareを使う
ユーザーから受け取った値を安全に保存

**bind_paramについて**
?の数とbind_param内の変数の数は等しくなる。
bind_paramの第一引数はs=string、i=intで`si`-とすると変数の場所と対応したstringとintと型を設定できる。

この形で処理する
```php
$message = 'フォームからの値です';
$stmt = $db->prepare('insert into memos (memo) values(?)');
$stmt->bind_param('s', $message);
$result = $stmt->execute();
```

全体
```php
$db = new mysqli('localhost:8889', 'root', 'root', 'testdb');
$message = 'フォームからの値です';
$stmt = $db->prepare('insert into memos (memo) values(?)');

// sqlスペルミスなどを捕捉
if (!$stmt) {
  die($db->error);
}

$stmt->bind_param('s', $message);
$result = $stmt->execute();

if ($result) {
  echo 'データを挿入しました';
} else {
  echo $db->error;
}
var_dump($result);
```

## formからDB登録のサンプル
送信
```html
<form action="input_do.php" method="POST">
  <textarea name="memo" id="" cols="50" rows="10" placeholder="メモを入力してください"></textarea><br>
  <button type="submit">登録する</button>
</form>
```

受信
```php
$memo = filter_input(INPUT_POST, 'memo', FILTER_SANITIZE_SPECIAL_CHARS);

$db = new mysqli('localhost:8889', 'root', 'root', 'testdb');
$stmt = $db->prepare('insert into memos(memo) values(?)');

if (!$stmt) {
  die($db->error);
};

$stmt->bind_param('s', $memo);
$result = $stmt->execute();

if ($result) {
  echo '登録されました';
} else {
  $db->error;
}
```

## dbからのデータ取得サンプル
一覧画面
```html
<?php
$db = new mysqli('localhost:8889', 'root', 'root', 'testdb');
$memos = $db->query('select * from memos order by id desc');
if (!$memos) {
  die($db->error);
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メモ帳</title>
</head>
<body>
  <h1>メモ帳</h1>
  
  <?php while ($memo = $memos->fetch_assoc()): ?>
    <div>
      <h2><a href="#"><?php echo htmlspecialchars($memo['memo']); ?></a></h2>
      <time><?php echo htmlspecialchars($memo['created']); ?></time>
    </div>
    <hr>
  <?php endwhile; ?>

</body>
</html>
```