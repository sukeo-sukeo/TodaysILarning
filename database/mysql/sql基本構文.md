## テーブル作成
primary_key, auto_incrementを設定する
```sql
CREATE TABLE my_items (id int, item_name text, price int);
```

## データ挿入
カラム名を指定する場合
```sql
INSERT INTO my_items SET id=1, item_name="いちご", price=200;
```
カラム名を指定しない場合
```sql
INSERT INTO my_items VALUES (2, "もも", 500);
```

## データ変更
whereを忘れるとどえらいことになるので注意
```sql
UPDATE my_items SET price=180, items_name="とちおとめ" WHERE id=1;
```

## データ削除
whereを忘れるとどえらいことになるので注意
```sql
DELETE FROM my_items WHERE id=1;
```

## データ検索
select カラム名 from テーブル名
```sql
SELECT item_name, price FROM my_items;
```
すべて
```sql
SELECT * FROM my_items;
```
条件
```sql
SELECT * FROM my_items WHERE id=2;
```
LIKE検索, and検索, or検索
```sql
SELECT * FROM my_items WHERE keyword LIKE "%赤ワイン%" and price > 300 or price = 200;
```

## 並び替え
order by
ascは昇順 (アセンディング) デフォルト
descは降順 (ディセンディング)
```sql
SELECT * FROM my_items ORDER BY price ASC;
```
ストリングで並び替えたいときは`kana`カラムを用意すると良き

## 相対的な情報は入れない
ランキングなど入れない(他が変わることで自分も変わる情報)
代わりに販売数など(絶対的な情報)を管理することでランキングを実現
