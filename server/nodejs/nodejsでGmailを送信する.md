## インストール
```
npm i nodemailer
```
## 処理
先にブラウザからアカウントの二段階認証の設定を行い、アプリパスワードを取得しておく必要がある。
`smtpData`の`auth.pass`はアプリパスワードを使う。いわゆるアカウントのパスワードでは無い点似注意。そして実際に使用する際はもちろん`.envファイル`に記載しそこから呼び出すようにする。
```js
const NodeMailer = require("nodemailer");

const mailData = {
  from: "任意の名前", // 受信者に表示される名前
  bcc: "自分にも送る時など", // 必要であれば
  subject: "テストメールです", // 題名
  text: "本文",
};

const smtpData = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hogehoge@gmail.com",
    pass: "hogehoge", //アプリパスワード
  },
};

const sendMail = () => {
  const transporter = NodeMailer.createTransport(smtpData);
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

sendMail();
```

これで登録したGmailから各受信者にメールが送信されます。