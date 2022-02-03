```js
const script = document.createElement('script');
script.src = 'https://ipinfo.io?callback=callback';
document.body.appendChild(script);
document.body.removeChild(script);
const callback = (data) => alert(data.ip + ":" + data.hostname);
```