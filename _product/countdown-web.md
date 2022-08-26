ことはじめ
```bash
npm init vite@latest [プロジェクト名] --template vue
cd [プロジェクト名]
yarn
vue add vuetify
```

技術スタック
- firebase(firestore,firebaseauth,hosting)
- vue3(vite)
- vuetify3

デプロイ
- yarn build
- firebase.jsonの"hosting"をpublic→distに変更
- firebase deploy

進め方(うろ覚え)
- firebaseコンソールでプロジェクトを作成
- 使いたいツールを選択
- 生成されるapiキーなどをコードに貼り付け
- initializeAppをする
- 使いたい関数をimportしてコーディング