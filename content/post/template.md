---
title: "Hugo 備忘録 テンプレートのカスタマイズ"
slug: "/hugo/customize_template/"
date: 2018-04-10T14:39:59+09:00
tags: ["hugo"]
---

記事は書けるようになったので、次はテンプレートのカスタマイズを行ないます。

<!--more-->

新しいソフトウェアを学ぶ時の基本として

- やりたいことをモチベーションに調べる
- 調べ方を調べる

の２点が非常に重要だと考えています。

Kissテンプレートはシンプルで拡張しやすそうですが、いくつかの不満点があります。

1. プロフィールページの/aboutも記事一覧に表示されてしまっている
2. 記事のページに前の記事、次の記事のナビゲーションが無い

これらを解決しつつ、Hugoのテンプレートについてまとめます。

## テンプレートの構造

テンプレートファイルは`/themes/テンプレートID/layouts`以下にあります。

ページ種別やURL毎に違うファイルを使うなどの様々なケースが考えられています。

どの時にどのファイルを使うかというものはHugoのマニュアルの[Hugo's Lookup Order](https://gohugo.io/templates/lookup-order/)にまとまっていました。

複雑なので、基本的な部分だけ抜粋して記録します。下のものが優先的に使われます。

- トップページ
  1. /layouts/\_default/list.html
  2. /layouts/\_default/home.html
  3. /layouts/\_default/index.html
  4. /layouts/list.html
  5. /layouts/home.html
  6. /layouts/index.html

テーマをいくつか確認しましたが、ほとんどのテーマは`list.html`を使っているようです。


- 記事一覧ページ
  1. /layouts/\_default/list.html
  2. /layouts/\_default/section.html
  3. /layouts/section/xxxx.html

`/post`ディレクトリの記事一覧ページを指定する場合は`/layouts/section/post.html`を指定します。

- 記事ページ
  1. /layouts/\_default/single.html
  2. /layouts/xxx/single.html

`/post`ディレクトリの記事一覧ページを指定する場合は`/layouts/post/single.html`を指定します。


- taxonomiesページ
  1. /layouts/\_default/list.html
  2. /layouts/\_default/taxonomy.html
  3. /layouts/taxonomy/taxonomy.html

タグの記事一覧ページです。


## テンプレートのカスタマイズ

ではテンプレートを修正しましょう、となった時にテーマのファイルを書き換える必要はありません。

テーマのテンプレートを上書きするための方法として、サイトのディレクトリにも`/layouts`ディレクトリが用意されています。こちらに同階層のテンプレートを置くと上書き処理となります。

トップページのテンプレート`/layouts/index.html`を上書きするにはサイトの方に`/layouts/index.html`を置きます。



- [/hugo/customize_template2/](テンプレートの書き方)
