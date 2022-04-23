## やりたいことと状況
- PHPを学習したのでCMSを自作して公開したい
- 自宅サーバーにnginxが入っている
- そこでnode.jsで作成したAPIサーバーが動いている
- そこにPHPで作成するCMSを動かしてDBとやりとりしたい
- フロントはVue.jsで作成しAPIサーバーを介してDBとやりとりしたい

## 引っかかること
- PHP使わなくてもよくね？
- 学んだので使ってみたいのです
- nginxでPHPの動かしたことない
  
## では
いきなり本番サーバーで試すのは破壊的現象が起きそうで怖いため、バーチャルボックスに同じ環境を作成しそこで検証しながら開発を進めていく。開発自体はローカルのmacで行い→バーチャルボックス上で検証という流れを予定

以下、クリアした項目を徐々に書き足していくことで、後世に残す形に仕上げていくとする。

## バーチャルボックスにCentOS7を入れる
## SSH接続してMacから操作できるようにする
## パッケージをアップデート
## SELinuxを無効化
rebootが必要かも
## sudoできるようにする
## nginxを入れる
### まずレポジトリがないのでとってくる
rootで作業を行います
```bash
# vim /etc/yum.repos.d/nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```
### 情報を確認しインストール
```bash
yum info nginx
```
```bash
yum install nginx
```
### 設定の変更
```bash
systemctl enable nginx
```
### 起動
```bash
systemctl start nginx
```
### 確認
```bash
systemctl status nginx
```
### firewallにhttpを許可する設定を追加
```bash
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --reload
```
### 確認
```bash
firewall-cmd --list-all
```
## ブラウザからアクセスしてみる
ローカルPCのブラウザにhttpでipアドレスにアクセス
`http://[ipアドレス]`
### welcomeページが表示されればOK!
![](../_image/nginx_homepage.png)

## その他tips
### nginxの各ディレクトリ
|場所|説明|
|-|-|
|/etc/nginx/	|Nginxの設定ファイル|
|/etc/nginx/nginx.conf	|メインとなる設定ファイル|
|/etc/nginx/conf.d	|このディレクトリに追加設定のファイルを置いていく|
|/var/log/nignx/	|Nginxのログ|
|/usr/share/nginx/html/	|WEBサイトの公開ディレクトリ|
|||
### ショートカットを設定しておくと便利
```bash
vim ~/.bashrc
```
```bash
alias www='cd /usr/share/nginx/html/'
alias nnn='cd /etc/nginx/'
```
反映
```bash
source ~/.bashrc
```
以降
`www`コマンドで公開ディレクトリに
`nnn`コマンドで設定ディレクトリに
飛べます

## ここらでvimをインストール
### vimのレポジトリがあるかとバージョンを確認
```bash
yum list installed | grep vim
```
7.2だと古い、7.4だと良いらしい(2022-03-27現在)
7.4が入ってればそのままインストール
```bash
yum -y install vim
```
7.2だったりレポジトリがなかったりした場合はレポを追加->ググッてくださいまし

### vimの設定ファイルを作成
`~/.vimrc`というファイルを作成
ホームディレクトリ直下に作成します
いただきものですが作成した空の設定ファイルに下記をコピペします！
```bash
set number
set encoding=utf-8
scriptencoding utf
set fileencoding=utf-8 " 保存時の文字コード
set fileencodings=ucs-boms,utf-8,euc-jp,cp932 " 読み込み時の文字コードの自動判別. 左側が優先される
set fileformats=unix,dos,mac " 改行コードの自動判別. 左側が優先される
set ambiwidth=double " □や○文字が崩れる問題を解決
set expandtab " タブ入力を複数の空白入力に置き換える
set tabstop=2 " 画面上でタブ文字が占める幅
set softtabstop=2 " 連続した空白に対してタブキーやバックスペースキーでカーソルが動く幅
set autoindent " 改行時に前の行のインデントを継続する
set smartindent " 改行時に前の行の構文をチェックし次の行のインデントを増減する
set shiftwidth=2 " smartindentで増減する幅
set incsearch " インクリメンタルサーチ. １文字入力毎に検索を行う
set ignorecase " 検索パターンに大文字小文字を区別しない
set smartcase " 検索パターンに大文字を含んでいたら大文字小文字を区別する
set hlsearch " 検索結果をハイライト
" ESCキー2度押しでハイライトの切り替え
nnoremap <silent><Esc><Esc> :<C-u>set nohlsearch!<CR>
set whichwrap=b,s,h,l,<,>,[,],~ " カーソルの左右移動で行末から次の行の行頭への移動が可能になる
" set cursorline " カーソルラインをハイライト

" 行が折り返し表示されていた場合、行単位ではなく表示行単位でカーソルを移動する
nnoremap j gj
nnoremap k gk
nnoremap <down> gj
nnoremap <up> gk

inoremap { {}<LEFT>
inoremap [ []<LEFT>
inoremap ( ()<LEFT>
inoremap " ""<LEFT>
inoremap ' ''<LEFT>

hi Comment ctermfg=gray

" バックスペースキーの有効化
set backspace=indent,eol,start
set showmatch " 括弧の対応関係を一瞬表示する
source $VIMRUNTIME/macros/matchit.vim " Vimの「%」を拡張する
set wildmenu " コマンドモードの補完
set history=5000 " 保存するコマンド履歴の数
set title


if has('mouse')
    set mouse=a
    if has('mouse_sgr')
        set ttymouse=sgr
    elseif v:version > 703 || v:version is 703 && has('patch632')
        set ttymouse=sgr
    else
        set ttymouse=xterm2
    endif
endif

if &term =~ "xterm"
    let &t_SI .= "\e[?2004h"
    let &t_EI .= "\e[?2004l"
    let &pastetoggle = "\e[201~"

    function XTermPasteBegin(ret)
        set paste
        return a:ret 
    endfunction

    inoremap <special> <expr> <Esc>[200~ XTermPasteBegin("")
endif
```
このファイルに設定を書くことで反映されます。
リロードは必要ないようです。即時反映。
vimの導入は完了です。

## nginxの設定ファイルを変更
nnn先の`nginx.conf`
> cpコマンドでバックアップをとっておくとヨシ

- `user nginx` -> `user [使用ユーザー]`に変更
- http {} に`server_tokens off`を追加
- `include /etc/nginx/conf.d/*.conf;`があるか確認

## PHPのインストール
### 5系がインストールされていないか確認
7系を使いたいので5系がある場合は削除する
のちのち混乱する可能性があるためとのこと...
```bash
yum list installed | grep php
```
### レポジトリを追加
```bash
yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```
### レポジトリを有効にする
ここよくわかってません...(2022-03-27現在)
```bash
yum info --enablerepo=remi,remi-php72 php
```
### 各パッケージのインストール
たくさんあります
```bash
yum -y install --enablerepo=remi,remi-php72 php php-mbstring php-xml php-xmlrpc php-gd php-pdo php-pecl-mcrypt php-mysqlnd php-pecl-mysql
```
### 確認
```bash
php -v
```
### php.iniの設定
まずはバックアップ
```bash
cp -p /etc/php.ini /etc/php.ini.org
```
タイムゾーンや文字コードなど設定を変更
詳細はググっておくんなまし。

## php-fpmの導入
nginxでphpを動作させる際に必要なパッケージとのこと。
### レポジトリを有効にする
多分まっさきにremiを見にいくよう指示している気がする
```bash
yum info --enablerepo=remi,remi-php72 php-fpm
```
### インストール
```bash
yum -y install --enablerepo=remi,remi-php72 php-fpm
```
### 確認
```bash
yum list installed | grep php-fpm
```
### 設定ファイルの変更
バックアップ
```bash
cp -p /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.conf.bk
```
- 20行目付近のユーザーとグループをapacheから使用するユーザー名に変更（私の場合はsukeo）
- ほかいろいろあるのでググッておくんなまし
### 起動と自動起動を設定
```bash
systemctl start php-fpm
systemctl enable php-fpm
```
## nginxの再設定
phpに反応するようにしていきます
### ***.conf内
`server_name`とか変更
`root`に`index.php`の追加
`default.conf`内から下記をコピーして追加
```bash
location ~ \.php$ {
  fastcgi_pass 127.0.0.1:9000;
  fastcgi_index index.php;
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  include fastcgi_params;
  }
}
```
## mysqlのインストールと接続
**別記事参照**

## いよいよ開発
### プログラムファイルアップロードの仕組みをつくる
```bash
# バーチャルボックスの模擬本番環境へのアップロード
alias mycmspush='rsync -a --delete /Applications/MAMP/htdocs/mycms2/ sukeo@192.168.58.10:/usr/share/nginx/html/setting/'
``` 

### ローカルで頑張って開発する
**そのうち掲載**

### テーブル構造のエクスポートとインポート
phpMyAdminでデータベースの構造だけエクスポートできる。
sql形式でファイルを作成しバーチャルボックスへ送る。
バーチャルボックス内で下記コマンドでインポート。
```bash
mysql -u root -p dbname < pathToSql.sql
```

### ページはひらけたがなんか変！
そうですsessionが動いていないっぽいのです。
原因はsessionの設定ファイル群の権限問題。
この辺はnginxならではのようです。apacheだとおそらく最初からsessionが動く。
```bash
ll /var/lib/php/session apache apache
```
権限を変更する。
```bash
chown nginx /var/lib/php/session
```

### 動かない関数がある！
array_key_firstで止まる！
ローカル php -v 7.4
テスト php -v 7.2
array_key_firstは7.3から、ちーん
```bash
yum update php
```
してみる。
かわらん。
こちらのサイト様のやり方に沿って再度実行
https://obenkyolab.com/?p=1987

phpのバージョンを揃えることで解決！

### 画像アップロードができない！
保存するディレクトリに書き込み権限を付与するのだ！

## プチ困ったこと
### スクロールできない
Shift + fn + 矢印
## コピペできない
## 