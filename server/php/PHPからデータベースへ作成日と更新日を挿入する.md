## datetime型とtimestamp型
- datetimeを使う(文字列扱い)
### 作成日(いわゆるcreatedなど)
- 作成日にはcurrent_timestampをデフォルト値につける
- データを挿入すると自動で`2022-04-05 05：51：57`が入る(ver5.7で確認。verによって違うかも)
- デフォルト値はデータ作成時(insert)しか入らない
### 更新日(いわゆるupdatedなど)
- 更新日には`on update CURRENT_TIMESTAMP`属性をつける
- デフォルト値はどっちゃでも良い(curretn_timestampをつけても良い)
- データ変更時(update)にその時の日にちが入る
  
phpの場合はこう
```php
date('Y-m-d H：i：s')
// 2022-04-05 05：51：57
```
datetime型は文字列なので何でも入る。(多分)
同じ形式の文字列を作成して挿入する。

## timestampは？
2038年問題というものを抱えているらしく非推奨の記事も見かける。
色々覚えるのもメンドイので
1. 日付はdatetiime型
2. 作成日はデフォルト値に`current_timestamp`
3. 更新日は属性に`on update CURRENT_TIMESTAMP`でと覚えておこう。