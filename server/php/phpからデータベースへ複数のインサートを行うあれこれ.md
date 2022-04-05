## いかにqueryを生成するかということになります
`$items`に連想配列で`カラム名=>値`が渡ってくる状況です。
各変数の内容を記します。

### $columns
連想配列のkeyを配列で取り出し、implodeでカンマ区切りの文字列にする
### values
連想配列のvalueを配列で取り出す
### questions
挿入する値の数分の疑問符を生成

### bind_paramのところ
挿入する値の数分の型記号を生成
> ここではStringのみしか対応していません

$valuesを'...'で展開してバインドします。
> ここはStringにするとバインドする数が合いませんなどと怒られます
```php
function db_insert_many($table_name, $items, $db) {
  
  $columns = implode(',', array_keys($items));
  $values = array_values($items);
  $questions = '';
  for ($i=0; $i<count($items); $i++) {
    $questions .= '?,';
  };
  $questions = rtrim($questions, ',');
  
  $query = "insert into $table_name ($columns) values ($questions)";
  
  $stmt = $db->prepare($query);

  if (!$stmt) {
    die($db->error);
  }
 
  $stmt->bind_param(str_repeat('s', count($items)), ...$values);
  $success = $stmt->execute();
  if (!$success) {
    die($db->error);
  }
}
```

以上です。
疑問符の生成など冗長な部分もありますが
必要なデータがStringかArrayかを意識しながら作成すると良いと思います。