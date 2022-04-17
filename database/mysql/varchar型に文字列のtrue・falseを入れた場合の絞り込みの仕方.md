文字列として囲ってあげる必要があるっぽい
## NG
```php
$cond = 'true'
$query = "select * from blog where blog.published = $cond"
```

## OK
```php
$cond = 'true'
$query = "select * from blog where blog.published = '$cond'"
```
