---
title: "Hugo 備忘録 テンプレートのカスタマイズその２"
date: 2018-04-10T16:17:25+09:00
slug: "/hugo/customize_template2/"
tags: ["hugo"]
---

トップページをカスタマイズしながらテンプレートのカスタマイズ方法を解説します。

<!--more-->

まずはテーマディレクトリからテンプレートをコピーしてきます。

```
$ cp ./themes/kiss/layouts/index.html ./layouts/home.html
```

## テンプレートの構文

テンプレートの構文は`{{ }}`で囲まれた部分に制御内容を書くシンプルなものです。

`if`などの制御構文や値の出力などがあります。

マニュアルの[Introduction to Hugo Templating](https://gohugo.io/templates/introduction/)に詳しく書かれています。

```
{{ foo }}
{{ add 1 2 }}
{{ .Params.bar }}
{{ if or (isset .Params "alt") (isset .Params "caption") }} Caption {{ end }}
```

テンプレートの書き方はわかりましたが、使用可能な変数が膨大過ぎます。
マニュアルを参考にしながら進めていきます。

## トップページの記事一覧にページが含まれないようにする

テンプレートの記事一覧を出している部分を見ると下記のような記述があります。

```
{{ range sort .Paginator.Pages }}
<article>
...
</article>
{{ end }}
```

ページが含まれないようにするにはこの辺をなんとかすれば良さそうなので、マニュアルの[Pagination](https://gohugo.io/templates/pagination/)の項目を見てみるとどうもそれっぽいものがありました。

```
{{ $paginator := .Paginate (where .Data.Pages "Type" "==" "post")  }}
{{ $paginator := .Paginate (where .Data.Pages "Type" "!=" "page")  }}

{{ range sort $paginator.Pages }}
<article>
...
</article>
{{ end }}
```

ブログが１個の場合は`"Type" "==" "post"`のような形で指定出来ます。ブログが複数ある場合はpage以外`"Type" "!=" "page"`という形で指定する方が向いています。



．
