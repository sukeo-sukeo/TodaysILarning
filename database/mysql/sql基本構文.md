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

## さまざまな計算
件数
```sql
SELECT COUNT(*) FROM my_items;
```
合計、平均
```sql
SELECT SUM(price) FROM my_items;
SELECT AVG(price) FROM my_items;
```
最小、最大
```sql
SELECT MIN(sales) FROM my_items;
SELECT MAX(sales) FROM my_items;
```

## リレーション
makers.idとmy_items.maker_idを紐づけるという意味
```sql
SELECT * FROM makers, my_items WHERE makers.id = my_items.maker_id;
```
ショートカット
```sql
SELECT * FROM my_items i, makers m WHERE m.id = i.maker_id;
```
### 複雑なリレーション
```sql
SELECT m.name, i.item_name, sum(c.count) as sales_count
FROM makers m, my_items i 
LEFT JOIN carts c 
ON i.id = c.item_id 
WHERE m.id = i.maker_id 
GROUP BY m.name, i.item_name 
ORDER BY sales_count DESC
```
- name, item_name, sales_count(別名) カラムを表示する
- カラムがあるテーブルはmakersとmy_items それぞれ別名をつけている
- テーブルを結合して、結合はi.idとc.item_idで行う
- whereのところはfromのところをinner joinにしてonで繋げても良い
- selectにいれたものはgroup byにも入れる
- order byで並び替え(DESCは降順)

sqlだと早い！


## 集計
### group by
item_idごとの販売数を集計
```sql
SELECT item_id, SUM(count) FROM carts GROUP BY item_id
```
リレーションを組み合わせる
selectのカラムが複数のテーブルにある場合は`table名.カラム名`とする
```sql
SELECT item_id, item_name, SUM(count) FROM my_items, carts WHERE my_items.id = carts.item_id GROUP BY item_id
```

## 外部結合
### LEFT JOIN
```sql
SELECT item_name, SUM(count) FROM my_items LEFT JOIN carts on my_items.id = carts.id GROUP BY item_name
```
my_itemsテーブルのカラムを基準として表示
### RIGHT JOIN
```sql
SELECT item_name, SUM(count) FROM my_items RIGHT JOIN carts on my_items.id = carts.id GROUP BY item_name
```
cartsテーブルのカラムを基準として表示
### INNER JOIN
カンマ区切りでテーブルを並べることと同じ意味

## いろいろなSQL句
### 取得数を制限
LIMIT
```sql
SELECT * FROM my_items LIMIT 2
```
2件飛ばし3件目から３データ表示
```sql
SELECT * FROM my_items LIMIT 2, 3
```
### 重複を除去
DISTINCT
```sql
SELECT DISTINCT item_id FROM carts
```
### 〜以上、〜以下
BETWEEN
```sql
SELECT * FROM my_items WHERE price BETWEEN 100 AND 500
```
### or検索
IN
```sql
SELECT * FROM my_items WHERE id in (1, 3)
-- id=1 or id=3 と同じ
```
### 別名をつける
asをつかう
```sql
SELECT SUM(count) as sales_count from carts
```