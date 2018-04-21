---
title: "SVG Animation"
date: 2018-04-11T10:39:11+09:00
slug: "svg-path-animation"
---

現在使っているテーマがあまりにも簡素なので背景でも設定したいのですが、どうせなので技術的なチャレンジも混みで**SVGをアニメーションで動かして背景に設定する**ことに挑戦しようと思いました。

<!--more-->

## SVGのアニメーションとは

SVGのアニメーションはjQueryを使ったNodeやプロパティ操作や、CSSを利用したアニメーションと違いはありません。

凝ったものだとこんなもを作ることができます。

<p data-height="265" data-theme-id="0" data-slug-hash="zvJxOM" data-default-tab="js,result" data-user="chrisgannon" data-embed-version="2" data-pen-title="SVG Twitter Broken Heart" class="codepen">See the Pen <a href="https://codepen.io/chrisgannon/pen/zvJxOM/">SVG Twitter Broken Heart</a> by Chris Gannon (<a href="https://codepen.io/chrisgannon">@chrisgannon</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

クリックでWeb版Twitterのようないいねアニメーションが動きます。

## SVGのアニメーションライブラリ

SVGをアニメーションさせるにはいくつか手法があります。CSSだけで行う方法やJavaScriptを利用して作成する方法などがあります。

> [Snap.svg](http://snapsvg.io/)

Adobe謹製のライブラリです。かなり汎用的な作りになっているので凝ったものも作れそうです。

> [flubber](https://github.com/veltman/flubber)

flubberはあの映画のフラバーから取ったのでしょうか、モーフィングアニメーションを作るためのライブラリですが、作りがちょっとマニアックというかエンジニアっぽい感じです。

> [SVG.js](http://svgjs.com/)

SVGをJavaScriptで操作するならこれ、というスタンダードライブラリです。アニメーションの機能もあり、jQueryでシンプルなアニメーションを実装する感じで作るのであればこれだけでも良さそうです。

どのライブラリもかなり高機能な作りになっているので今回は利用せずに参考にします。

## どのようにしてモーフィングさせているか

Snap.svgもflubberもコードを紐解いてみると**モーフィング途中のパスを作成して、keyframe的に入れ替えるというやり方をしています。

かなりの力技ですが、実際にこれをやろうとすると非常に難しいです。

頂点数が同じである、という条件が必要ですがd要素の書き換えはCSSでアニメーションさせることが出来ることがわかりました。

```
<style type="text/css">
#svg-path {
  -webkit-transition-duration: 1s;
  -webkit-transition-timing-function: linear;
}
</style>
```


## 素材のSVGを用意する

まずは素材となるSVGを用意します。

```
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <g>
    <path id="svg-path" d="M10 10L10 90L90 90L90 10L10 10z" fill="red"/>
  </g>
</svg>
```

`d="xxxx"`を使ってパスを描画していきます。

このd要素を変更するとパスを動的に変更することができます。


```
var elm = document.getElementById("svg-path");
elm.setAttribute("d", "M30 30L30 60L60 60L60 30L30 30z")
```

## 動的にパスを作成するためには

SVGのパスの描画命令は[d - SVG | MDN](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/d)などにまとまっています。

命令はいくつかありますが、今回はなめらかなスライムのようなものを描画するためにベジェ曲線を利用していきます。

1. 頂点の位置をランダムに生成
2. 頂点を通るベジェ曲線を作成
3. SVGのパスの形式に出力
4. d属性を書き換え

という流れで作成します。

頂点の位置を通るベジェ曲線はコードで作成する場合、人間が見て綺麗な形状に作るのが難しいのである程度ごまかす必要があります。

なんとかベジェ曲線に必要な座標が計算出来たら、次のような書式に変換します。

```
C 始点ハンドル1 終点ハンドル1 終点1
C 始点ハンドル2 終点ハンドル2 終点2
C 始点ハンドル3 終点ハンドル3 終点3
...
```

今回作成したコードをCodePenに置きました。

<p data-height="265" data-theme-id="0" data-slug-hash="PePYqe" data-default-tab="js,result" data-user="ryosukemiyazawa" data-embed-version="2" data-pen-title="SVG Path Animation " class="codepen">See the Pen <a href="https://codepen.io/ryosukemiyazawa/pen/PePYqe/">SVG Path Animation </a> by ryosukemiyazawa (<a href="https://codepen.io/ryosukemiyazawa">@ryosukemiyazawa</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
