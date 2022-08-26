// 日にちと現在時刻を返す
const getDate = (deli, want = "") => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const H = date.getHours();
  const M = date.getMinutes();
  const S = date.getSeconds();

  
  if (want === "time") {
    const nowTime = H + deli + M + deli + S;
    return nowTime
  } else {
    const today = y + deli + m + deli + d;
    return today
  }
}

// 重複を削除
const array1 = [1, 5, 3, 1, 5, 3];
const array2 = Array.from(new Set(array1))
console.log(array2); // [ 1, 5, 3 ]