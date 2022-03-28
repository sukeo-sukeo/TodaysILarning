# mysqlの元ファイルを公式サイトからダウンロード
`mysql80`や`release-el7-4`は実際にサイトで確認
```bash
yum localinstall http://dev.mysql.com/get/mysql80-community-release-el7-4.noarch.rpm 
```
```bash
 yum install mysql-server
```
もし公開鍵がありませんなどでインストールできない場合は下記コマンド実行ののち再度インストール(インストール不要かも)
```bash
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
```
ここから`mysql -V`とかでバージョン確認可能
# デーモンの起動
```bash
systemctl enable mysqld.service
systemctl start mysqld
```
# 認証方法の変更
`/etc/my.cnf`に認証方法を追記する
```bash
vim /etc/my.cnf
# 下記一文を追加
default-authentication-plugin = mysql_native_password
```
# 初期パスワードの確認と変更
`/var/log/mysqld.log`から初期パスワードを探す
```bash
vim /var/log/mysqld.log 

# 下記の記述が上の方にある
2021-11-27T04:07:12.118162Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: 7pqcdFsYat,R
```
ログインできるか確認
```bash
mysql -u root -p
Enter password: 7pqcdFsYat,R
```
`show databases;`しようとするとエラーに
```bash
mysql> show databases;
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
```
**rootのパスワードを変更する必要があります**的なことを言われております。

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '変更したいPASSWD'
```
これで変更OK。
初期では小文字、大文字、記号が含まれていないとあかんよって出る。
ver5.7からポリシーが厳しくなっているようです。(変更可能)
- ８文字以上
- 大文字含む
- 特殊記号含む

## 以前は下記やりかたでやったこともある
こちらでもできるのかもね
```bash
mysql_secure_installation --use-default
```
対話形式で
- 現在のパスワード（logで確認した初期値）
- 新しいパスワード
- 再度新しいパスワード

この他にmysql内での`ALTER USER`コマンドでも変更可能のようです。使う際はググって使います。

ログイン確認
```bash
mysql -u root -p
Enter password: 新しいパスワード
```
# ユーザー名の変更
