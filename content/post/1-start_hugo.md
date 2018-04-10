---
title: "Hugo備忘録 記事の作成と記事ディレクトリ"
slug: "/hugo/start-hugo/"
date: 2018-04-10T14:29:09+09:00
tags: ["hugo"]
---

Hugoのセットアップについては色々な記事があるのでセットアップやテンプレートのインストールについては省略します。

<!--more-->

## 記事の作成とファイル名

Hugoで新しく投稿を始める時はHugoコマンドから行ないます。

```
$ hugo new post/hugo/start-hugo.md
↓
/content/post/hugo/start-hugo.md
```

このとき`/archetypes/default.md`が雛形として使われます。

### 雛形のルール

`/archetypes/post.md`がある場合、postディレクトリのコンテンツの雛形として使われます。

ブログとして使う場合はdefault.mdは残してブログ用の雛形を作る方が良いです。

### 記事数が増えた時の問題点と解決方法

静的のコンテンツ管理系にどうしても発生してしまう問題点ですが、古い記事が溜まってしまいディレクトリが散らかってしまいます。

私個人の問題点ですが、モチベーションが下がってしまうのでなんとかしたいものです。

そのため、Hugoのカスタマイズを利用してアーカイブ機能を作ることにしました。

- /content/posts ここには記事を書いていく。ファイル名は適当で良い。
- /content/archives アーカイブしたファイルを置く。アーカイブは`/YYYY/MM/YYYY-MM-DD_:title.md`というファイル名にリネームされる。

archivesディレクトリにあるファイルも`/post/xxxx/`というURLで表示されれば目的は達成されるので、Hugoの設定を変更します。

```
[permalinks]
posts = "/post/:slug/"
archives = "/post/:slug/"
```

問題点としてはslugを指定しないとURLが迷子になります。
