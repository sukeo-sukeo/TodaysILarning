## ファイル一覧を取得する関数
```js
async getFiles(parentId) {
  const res = await this.drive.files.list({
    q: `'${parentId}' in parents and trashed = false`,
  });
  const files = res.data.files;
  // console.log(files);
  return files;
}
```

## 上記のgetFilesを使って存在チェック
```js
async existCheckGdrive(targetname, parentId) {
    console.log(targetname, parentId);
    const files = await this.getFiles(parentId);
    const exists = files.find(file => file.name === targetname);
    console.log("存在する？", Boolean(exists));
    return Boolean(exists);
  }
```