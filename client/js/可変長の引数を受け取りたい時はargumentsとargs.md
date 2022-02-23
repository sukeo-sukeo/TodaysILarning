# 可変長の引数を受け取れる

## [...args]
...argsで引数を可変長で受け取れる
```js
function fn(...args) {
  const a = args[0]
  const b = args[1]
  return a + b
}

fn(1, 5)

// 6
```

## arguments
```js
function fn() {
  console.log(arguments)
  console.log(arguments[0])
}

fn(1,2,3)
//  [1, 2, 3] 配列っぽいデータが渡る
//  1 
```