

```bash
npm i csv-writer
```

- 既存ファイルに付け足しの「append: true」と「headerあり」はのオプションは共存できない
- なので、運用としてはファイルの存在チェックを行い、ファイルが存在する場合は「append:ture」、存在しない場合は「append:false」で「headerあり」とする