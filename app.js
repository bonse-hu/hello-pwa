今日 8:10
iphoneでPWAアプリを作りたいです。Windows11PCを持っており、Github, VSCodeをインストールしている状態です。まず簡単なアプリ"Hello World!"を表示させるようなアプリを作りたいです。

はい、その画面で問題ありません。

表示されている Git Credential Manager は、GitHubが推奨している認証を管理するツールです。VS CodeやGitからGitHubへ安全に接続するために使われます。

今回のように、自分のリポジトリへ git push する場合は、

「Authorize git-ecosystem」

をクリックして大丈夫です。

許可すると、GitHubの認証情報がWindowsに保存され、今後は毎回ログインしなくても git push や git pull ができるようになります。

許可した後

VS Codeに戻ると、ターミナルに次のようなメッセージが表示されるはずです。

Enumerating objects...
Counting objects...
Writing objects...
To https://github.com/...

最後に

branch 'main' set up to track 'origin/main'.

のような表示が出れば成功です。

次にお願いしたいこと

「Authorize git-ecosystem」をクリックしたあと、VS Codeのターミナルに表示された内容を、そのまま貼り付けてください（スクリーンショットでも大丈夫です）。

その内容を確認して、GitHubへのアップロードが成功したかどうかを一緒に確認しましょう。

> git push -u origin main
info: please complete authentication in your browser...
remote: Repository not found.
fatal: repository 'https://github.com/bonse-hu/helloo-pwa.git/' not found


ありがとうございます。エラーメッセージを見ると、原因が分かりました。

remote: Repository not found.
fatal: repository 'https://github.com/bonse-hu/helloo-pwa.git/' not found

ポイントはここです。

helloo-pwa
      ^^

helloo-pwa（oが2つ） というリポジトリに接続しようとしています。

まず確認してください

GitHubのWebサイトで、実際に作成したリポジトリ名は

hello-pwa（oが1つ）
helloo-pwa（oが2つ）

のどちらでしょうか？

VS Codeで確認する方法

ターミナルで次のコマンドを入力してください。

git remote -v

すると例えば

origin  https://github.com/bonse-hu/helloo-pwa.git (fetch)
origin  https://github.com/bonse-hu/helloo-pwa.git (push)

のように表示されます。

その結果を教えてください。

もしGitHubで作ったのが hello-pwa なら

リモートURLを修正します。

git remote set-url origin https://github.com/bonse-hu/hello-pwa.git

そのあと

git push -u origin main

を実行します。

もしGitHubで作ったのが helloo-pwa なら

URLは合っているので、そのリポジトリが実際には存在していない可能性があります。

お願い

次の2つを教えてください。

git remote -v の実行結果
GitHubで作成したリポジトリ名（ブラウザで見えている名前）

この2つが分かれば、数分で解決できます。

git remote add origin https://github.com/ユーザー名/hello-pwa.git
を入力するとき、間違えて"helloo-pwa.git"と入力してしまいました。どうすればよいですか？

それなら原因ははっきりしました。修正は簡単です。

間違ったURLを登録してしまっただけなので、正しいURLに変更すればOKです。

ターミナルで次のコマンドを実行してください。

git remote set-url origin https://github.com/bonse-hu/hello-pwa.git

その後、登録内容を確認します。

git remote -v

正しく設定されていれば、次のように表示されます。

origin  https://github.com/bonse-hu/hello-pwa.git (fetch)
origin  https://github.com/bonse-hu/hello-pwa.git (push)

最後に、もう一度プッシュします。

git push -u origin main
set-url と remove の違い

今回は git remote set-url が一番簡単です。

もし覚えておきたい場合は、次の方法でも同じことができます。

git remote remove origin
git remote add origin https://github.com/bonse-hu/hello-pwa.git

ただし、今回は set-url を使うのがおすすめです。

git push -u origin main を実行した後の結果を教えていただければ、そのままGitHub Pagesの公開設定まで一緒に進めます。

Github Pagesを有効にするため、Settings->Pages->Deploy from branchとやりましたが、そのあとmainがどこかわかりません。

ここは少し分かりにくいところです。GitHub Pagesの設定画面は何度かデザインが変わっているため、表示が少し違うことがあります。

まず確認したいのは、git push が成功したかどうかです。

GitHubのリポジトリを開いて、index.html や manifest.json などのファイルが表示されていますか？

表示されている → main ブランチは存在しています。
表示されていない → まず git push の確認が必要です。
main の場所

通常は Settings → Pages を開くと、

Build and deployment

Source

Deploy from a branch

という項目があります。

その下に

Branch
[ None ▼ ]

または

Branch
[ main ▼ ]

というドロップダウンメニューがあります。

▼をクリックすると、

main

が選べるようになります。

選択したら、

/(root)

を選んで Save を押します。

もし main が表示されない場合

考えられる原因は次の2つです。

まだファイルが main ブランチにプッシュされていない。
現在のブランチ名が master など別の名前になっている。
確認していただきたいこと

GitHubのリポジトリを開いたとき、画面左上付近にあるブランチ名（通常は main と表示される場所）は何と表示されていますか？

または、リポジトリのURL（例: https://github.com/bonse-hu/hello-pwa）を教えていただければ、公開されている範囲で設定状況を確認し、次に何をすればよいかご案内します。

git pushは成功しており、main -> /(root)が選択できsaveできました。

素晴らしいです！🎉

そこまでできていれば、あと一歩でiPhoneからアクセスできるようになります。

次に確認すること

GitHub Pagesは、保存（Save）してから公開されるまで1～3分程度かかることがあります。

リポジトリの Settings → Pages を開いてみてください。

しばらくすると、画面の上部に次のようなメッセージが表示されます。

Your site is live at
https://bonse-hu.github.io/hello-pwa/

（hello-pwa の部分は実際のリポジトリ名です。）

このURLをクリックすると、Hello World! が表示されるはずです。

もし表示されない場合

リポジトリのトップページに戻って、次のファイルがあることを確認してください。

hello-pwa
├── index.html
├── manifest.json
├── service-worker.js
└── icon-192.png

特に index.html があることが重要です。

次にやること

ブラウザで Hello World! が表示できたら、

iPhoneのSafariでそのURLを開く
「共有」→「ホーム画面に追加」
ホーム画面から起動する

という手順で、PWAとしてインストールできます。

このあとおすすめしたいこと

ここまでできたら、次は単なる「Hello World!」ではなく、

ボタンを押すと文字が変わる
iPhoneらしい見た目の画面を作る
タブバー付きのアプリ風デザインにする

という形で少しずつ機能を増やしていくと、HTML・CSS・JavaScript・PWAの仕組みを自然に学べます。

1つずつ完成させながら進めるチュートリアル形式で進めれば、初めてでも無理なくアプリらしいPWAを作れるようになります。

hello world!がでました。
ただ、index.html上では、href="icon-192.png"となっていますが、実際のアイコンのファイル名は"icon.png"になっています。ファイル名を修正するには？

成功おめでとうございます！🎉
Hello World! が表示できたということは、GitHub Pages公開まで正しく進んでいます。

今回のアイコン名の違いは、HTML側の指定と実際のファイル名を一致させれば解決します。

現在：

<link rel="apple-touch-icon" href="icon-192.png">

ですが、実際のファイル名が

icon.png

なら、index.htmlを修正します。

方法1：index.htmlを修正する（おすすめ）

VS Codeで index.html を開き、

変更前：

<link rel="apple-touch-icon" href="icon-192.png">

↓

変更後：

<link rel="apple-touch-icon" href="icon.png">

にします。

また、manifest.json も確認してください。

現在：

"src": "icon-192.png"

なら、

"src": "icon.png"

に変更します。

その後GitHubへ反映

VS Codeのターミナルで、プロジェクトフォルダにいることを確認してから：

git add .

↓

git commit -m "Change icon filename"

↓

git push

これでGitHub Pages側も更新されます。

方法2：ファイル名を変更する

逆に、ファイル名を合わせる方法もあります。

現在：

icon.png

↓

変更：

icon-192.png

にします。

この場合はHTMLやmanifest.jsonを変更する必要がありません。

VS Codeのファイル一覧で

icon.png

を右クリック → 名前の変更

で変更できます。

どちらがおすすめか

今回は最初のPWAなので、個人的には

icon-192.png

にファイル名を合わせる方法がおすすめです。

理由は、PWAでは一般的にアイコンサイズごとに

icon-192.png
icon-512.png

のような名前を付けることが多いためです。

将来的には manifest.json をこう拡張します。

"icons": [
  {
    "src": "icon-192.png",
    "sizes": "192x192"
  },
  {
    "src": "icon-512.png",
    "sizes": "512x512"
  }
]

次の確認として、iPhoneでホーム画面追加をする前に、PCのChromeで PWAとして認識されているか を確認するとよいです。Chromeの開発者ツールで確認できます。

方法２でやっています。Windows11PC上のicon.pngを、icon-192.pngに直しました。そのあとは？

方法2で進めた場合は、ファイル名変更をGitHubへ反映（push）する必要があります。

現在はWindows PC上だけ変更された状態で、GitHub Pages上のサイトはまだ古い状態です。

VS Codeのターミナルで、hello-pwa フォルダにいることを確認して、以下を実行してください。

1. 変更内容を確認
git status

すると、例えば次のように表示されます。

modified:   icon.png

または

renamed: icon.png -> icon-192.png

のような表示になります。

2. 変更をGitに登録
git add .
3. コミットする
git commit -m "Rename icon file"
4. GitHubへ送る
git push
5. GitHub Pagesの更新を待つ

通常は数十秒～数分で更新されます。

その後、ブラウザで

https://bonse-hu.github.io/hello-pwa/

を再読み込みしてください。

iPhoneで確認する場合の注意

すでにホーム画面へ追加している場合は、古いアイコンが残ることがあります。

その場合は：

iPhoneのホーム画面からPWAを削除
SafariでURLを再度開く
「ホーム画面に追加」

を行うと、新しいアイコンが反映されます。

ちなみに、今回の流れで PWAの基本構成（HTML + manifest.json + Service Worker + GitHub Pages公開）まで完成しています。次は、iPhoneアプリらしくするために manifest.json の設定（アプリ名、背景色、表示モード、アイコン512px追加など）を整える段階に進めます。

アイコンもうまく表示されました。

おめでとうございます！🎉
これで 最小構成のPWAアプリが完成 です。

現在できていることを整理すると、以下がすべて動作しています。

✅ index.html
→ 画面表示（Hello World!）

✅ manifest.json
→ アプリ名・アイコンなどPWA設定

✅ service-worker.js
→ PWAの基本機能（後でオフライン対応などに拡張可能）

✅ GitHub
→ ソースコード管理

✅ GitHub Pages
→ HTTPSで公開

✅ iPhone「ホーム画面に追加」
→ アプリのように起動

つまり、iPhoneにインストールできるWebアプリの基本形が完成しています。

次のステップとしては、例えば以下がおすすめです。

① ボタンを追加して動きをつける

例：

「押してください」ボタン
押すと「Hello iPhone!」に変わる

ここでJavaScriptの基本を学べます。

② アプリらしい画面にする

例えば：

+----------------+
|  Hello App     |
|                |
|   Hello World  |
|                |
|  [ Start ]     |
+----------------+

のようなスマホ画面風デザインにできます。

③ データ保存機能を追加

例えば：

メモ帳
ToDoリスト
買い物リスト

などを作る場合、

入力
 ↓
保存
 ↓
次回起動しても残る

というアプリらしい動きができます。

④ オフライン対応

今の service-worker.js は空に近い状態なので、次はキャッシュを追加すると、

電波がない場所でも起動
ネイティブアプリに近い動作

ができます。

個人的には、次の練習としては 「Hello World!」を少し改造して、ボタンを押すとメッセージが変わるPWA を作るのがちょうどよいです。

今のプロジェクトをそのまま使って、index.html に少しJavaScriptを追加するだけで作れます。

改造の仕方を教えて。

では、今作った hello-pwa を少し改造して、ボタンを押すとメッセージが変わるアプリにしてみましょう。

今回は以下のような動きにします。

起動時：

Hello World!
[押してね]

ボタンを押すと：

Hello PWA!

になります。

① index.htmlを変更する

VS Codeで index.html を開いて、内容をすべて以下に置き換えてください。

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Hello PWA</title>

    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#2196f3">

    <link rel="apple-touch-icon" href="icon-192.png">

    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            font-family: sans-serif;
            background-color: #f5f5f5;
        }

        #message {
            font-size: 48px;
            margin-bottom: 40px;
        }

        button {
            font-size: 24px;
            padding: 15px 40px;
            border-radius: 10px;
            border: none;
            background-color: #2196f3;
            color: white;
        }

        button:active {
            background-color: #1565c0;
        }

    </style>
</head>

<body>

<div id="message">
    Hello World!
</div>

<button onclick="changeMessage()">
    押してね
</button>


<script>

function changeMessage() {

    document.getElementById("message").innerHTML =
        "Hello PWA!";

}


if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register(
        'service-worker.js'
    );

}

</script>

</body>
</html>
② PCで動作確認

VS Codeで保存します。

保存：

Ctrl + S

その後、ブラウザで

https://bonse-hu.github.io/hello-pwa/

を開いてください。

ただし、GitHub Pagesはまだ更新されていません。

③ GitHubへ反映

VS Codeのターミナルで：

git add .

↓

git commit -m "Add button interaction"

↓

git push

を実行します。

④ iPhoneで確認

1～2分待ってからSafariでURLを開きます。

表示：

Hello World!

[押してね]

ボタンを押すと：

Hello PWA!

になります。

今回追加したもの

実は、この小さな変更で3つの重要な技術を使っています。

技術	役割
HTML	文字・ボタンを配置
CSS	スマホ画面っぽいデザイン
JavaScript	ボタン操作の処理

PWA開発では、この3つを組み合わせてアプリを作っていきます。

次の自然なステップは、**「入力した文字を保存して、次回起動時にも残すメモアプリ」**です。これはPWAらしい機能（端末内データ保存）を体験できます。

アプリで、単語帳を作りたいです。


いいですね。単語帳アプリは、PWAの練習題材としてとても向いています。

まずは**シンプルな単語帳アプリ（第1段階）**を作りましょう。

目標：

英単語を入力
日本語の意味を入力
保存ボタンで登録
登録した単語一覧を表示
iPhoneを閉じてもデータが残る

最初はサーバー不要で、iPhone内の LocalStorage に保存します。

完成イメージ：

--------------------
      単語帳

単語
[ apple          ]

意味
[ りんご          ]

[ 保存 ]

--------------------

apple
→ りんご

banana
→ バナナ
--------------------
① index.htmlを変更する

現在の hello-pwa の index.html を、まず以下に置き換えます。

<!DOCTYPE html>
<html lang="ja">

<head>
<meta charset="UTF-8">

<meta name="viewport" 
content="width=device-width, initial-scale=1.0">

<title>単語帳</title>

<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">

<style>

body {
    font-family: sans-serif;
    padding: 20px;
    background:#f5f5f5;
}

h1 {
    text-align:center;
}

input {
    width:100%;
    font-size:20px;
    padding:10px;
    margin-bottom:10px;
    box-sizing:border-box;
}

button {
    width:100%;
    padding:15px;
    font-size:20px;
    background:#2196f3;
    color:white;
    border:none;
    border-radius:10px;
}

.word {
    background:white;
    margin-top:15px;
    padding:15px;
    border-radius:10px;
    font-size:20px;
}

</style>

</head>


<body>


<h1>単語帳</h1>


<input id="word"
placeholder="英単語">


<input id="meaning"
placeholder="日本語の意味">


<button onclick="addWord()">
保存
</button>


<div id="list"></div>



<script>


let words =
JSON.parse(localStorage.getItem("words"))
|| [];



function addWord(){

    let word =
    document.getElementById("word").value;


    let meaning =
    document.getElementById("meaning").value;


    if(word==="" || meaning===""){
        return;
    }


    words.push({
        word:word,
        meaning:meaning
    });


    localStorage.setItem(
        "words",
        JSON.stringify(words)
    );


    document.getElementById("word").value="";
    document.getElementById("meaning").value="";


    showWords();

}



function showWords(){

    let html="";


    words.forEach(function(item){

        html += `
        <div class="word">
        ${item.word}<br>
        ↓<br>
        ${item.meaning}
        </div>
        `;

    });


    document.getElementById("list")
    .innerHTML=html;

}



showWords();



if ('serviceWorker' in navigator){

navigator.serviceWorker.register(
'service-worker.js'
);

}


</script>


</body>

</html>
② GitHubへ反映

保存後、VS Codeターミナルで：

git add .

↓

git commit -m "Create vocabulary app"

↓

git push
③ iPhoneで確認

1～2分待つ
↓
Safariで

https://bonse-hu.github.io/hello-pwa/

を開く

↓
ホーム画面のPWAも更新されます。

今回追加した重要な仕組み
LocalStorage

ここがポイントです。

例えば、

apple
↓
りんご

を保存すると、iPhone内部では、

words
[
 {
  word:"apple",
  meaning:"りんご"
 }
]

のように保存されます。

アプリを終了しても残ります。

次の改良候補としては、単語帳アプリらしくするなら以下がおすすめです。

単語カード表示（表：英語 → 裏：日本語）
ランダム出題機能
正解・不正解ボタン
学習履歴・正答率表示
CSVで単語一括登録

特に「単語カード＋ランダム出題」は、PWAで作るとかなり本格的な学習アプリになります。

本当にやりたいことは、数学の三角関数の積和・和積の問題を反復練習するために作りたいです。
例えば、５問をランダムに出題し、４つの選択肢から正解を選ばせ、５問解き終わるまでの時間を測り、それが履歴として残り、グラフとして表示させるようなアプリです。

それは、単なる単語帳よりもPWAで作る題材としてかなり良いアプリです。
しかも今作った環境（HTML + JavaScript + GitHub Pages）で十分作れます。

作りたいものは、分類すると 「数学演習トレーニングアプリ」 になります。

完成イメージは例えば：

┌─────────────────┐
│ 三角関数 積和公式 │
│                 │
│ 第1問            │
│                 │
│ sinA cosB = ?    │
│                 │
│ ○ 1/2{sin(A+B)+sin(A-B)}
│ ○ 1/2{cos(A+B)+cos(A-B)}
│ ○ sin(A+B)
│ ○ cos(A-B)
│                 │
│       [回答]     │
└─────────────────┘


結果

5問中 4問正解

時間
02:35

履歴
7/11  4問 02:35
7/12  5問 01:58
7/13  5問 01:42

グラフ
正答率 ↑
100%       ●
80%    ●
60% ●
     ─────────→
      日付
開発の順番

いきなり全部作るより、段階的に作るのがおすすめです。

第1段階：問題を表示する

まずは固定問題で動作確認。

データ：

[
 {
  question:"sinA cosB を積和公式で表せ",
  choices:[
    "1/2(sin(A+B)+sin(A-B))",
    "1/2(cos(A+B)+cos(A-B))",
    "sin(A+B)",
    "cos(A-B)"
  ],
  answer:0
 }
]

を用意します。

機能：

✅ 問題表示
✅ 4択ボタン表示
✅ 正解判定

第2段階：5問ランダム出題

問題データを増やして、

shuffle()

という処理でランダムに5問選びます。

例えば：

問題データ 100問

↓

ランダム抽出

↓

今日の5問

になります。

第3段階：時間計測

JavaScriptには時間取得機能があります。

開始：

let startTime = Date.now();

終了：

let elapsed =
Date.now()-startTime;

で、

2分35秒

のように表示できます。

第4段階：履歴保存

ここで今まで使った

localStorage

が活躍します。

例えば：

[
 {
  date:"2026/7/11",
  score:4,
  time:155
 },
 {
  date:"2026/7/12",
  score:5,
  time:118
 }
]

を保存します。

第5段階：グラフ表示

JavaScript用のグラフライブラリを使います。

例えば：

Chart.js

を使うと、

正答率推移
100% ┤      ●
 80% ┤   ●
 60% ┤●
     └────────
       日付

のようなグラフが簡単に作れます。

三角関数アプリの場合、さらに面白い発展もできます
問題自動生成

例えば：

sin30°cos60°

を毎回変える。

JavaScriptで、

let A =
[30,45,60][Math.floor(Math.random()*3)];

のようにすると、無限に問題を作れます。

苦手分析

履歴から、

積→和変換
正答率 90%

和→積変換
正答率 55%


のような分析もできます。

私ならこの順番で作ります

今の hello-pwa をそのまま発展させて：

Ver.1

5問固定
4択
正解数表示

↓

Ver.2

問題ランダム化
タイマー

↓

Ver.3

履歴保存
グラフ

↓

Ver.4

問題追加画面
苦手分析

という流れにします。

次の作業としては、まず Ver.1（5問4択の三角関数クイズ）を今のPWAに実装するのが良いと思います。
現在の hello-pwa をそのまま「三角関数トレーニングアプリ」に改造できます。

あと、将来的にはmath用のフォントを使用したです。あと、xの係数が１のときは、"1x"としないような基本的な処置もしたいです。

その方向性なら、かなり本格的な数学学習アプリになります。
そして、今の段階でその設計を意識しておくのはとても良いです。

特に数学アプリでは、普通の文字表示ではなく 数式表示の仕組み を入れるのが重要になります。

1. 数学用フォント・数式表示について

「math用のフォントを使いたい」という場合、主に2つの方法があります。

方法A：MathJaxを使う（おすすめ）

数学教育系のWebアプリでは、フォント変更よりも MathJax（マスジャックス） を使うことが多いです。

例えば、

入力：

sin A cos B = 1/2(sin(A+B)+sin(A-B))

ではなく、

\sin A\cos B=\frac{1}{2}\{\sin(A+B)+\sin(A-B)\}

と書くと、表示は：

sin
⁡
𝐴
cos
⁡
𝐵
=
1
2
{
sin
⁡
(
𝐴
+
𝐵
)
+
sin
⁡
(
𝐴
−
𝐵
)
}
sinAcosB=
2
1
	​

{sin(A+B)+sin(A−B)}

のような教科書風になります。

三角関数、分数、平方根、積分などを扱うなら、この方法が向いています。

MathJaxをPWAに追加する例

index.html の <head> 内に追加します。

<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$']]
  }
};
</script>

<script async
src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

すると本文中で、

<div>
$ \sin A\cos B $
</div>

と書けば、

sin
⁡
𝐴
cos
⁡
𝐵
sinAcosB

として表示できます。

2. 「1x」と表示しない処理

これは数学アプリでは非常に重要です。

例えば内部データ：

{
 coefficient:1,
 variable:"x"
}

をそのまま表示すると、

1x + 3

になります。

しかし数学では：

x + 3

が正しいですね。

そのため、表示用の関数を作ります。

例：

function formatTerm(coef, variable){

    if(coef === 1){
        return variable;
    }

    if(coef === -1){
        return "-" + variable;
    }

    return coef + variable;
}

結果：

入力	表示
1,x	x
-1,x	-x
3,x	3x
-5,x	-5x

になります。

3. 将来的には数式データを分離すると楽です

例えば問題を直接文字で書くのではなく、

{
 question:
 "\\sin A\\cos B",

 choices:[
 "\\frac12\\{\\sin(A+B)+\\sin(A-B)\\}",
 "\\sin(A+B)",
 "\\cos(A+B)",
 "\\frac12\\cos(A+B)"
 ],

 answer:0
}

のように保存します。

つまり、

問題データ
 ↓
LaTeX形式
 ↓
MathJax
 ↓
美しい数式表示

という流れです。

4. 三角関数アプリなら、さらに考慮したいこと

積和・和積公式では、

例えば：

sin
⁡
𝐴
cos
⁡
𝐵
sinAcosB

だけでなく、

cos
⁡
𝐴
sin
⁡
𝐵
cosAsinB

や

cos
⁡
𝐴
cos
⁡
𝐵
cosAcosB

などがあります。

内部的には、

{
type:"product_to_sum",
left:"sin",
right:"cos",
A:"A",
B:"B"
}

のようなデータにしておくと、後から問題を自動生成できます。

おすすめの設計

今のPWAを将来的に数学アプリへ育てるなら：

hello-pwa
│
├── index.html        画面
├── app.js            動作処理
├── style.css         デザイン
│
├── data
│   └── trig.js       問題データ
│
├── math
│   └── formatter.js  数式整形
│
├── manifest.json
└── service-worker.js

のように分けると、問題数が1000問になっても管理しやすいです。

現在の段階では、まず 「5問4択クイズ」部分を作り、その表示をMathJax対応にする のが良いと思います。
そうすると、後から「二次関数」「微分積分」「ベクトル」などを追加できる数学学習アプリの土台になります。

ver1からお願い。

了解です。まずは Ver.1：三角関数（積和・和積）の5問4択クイズアプリ を作ります。

今回は以下の機能だけに絞ります。

Ver.1の機能

✅ 問題を表示
✅ 4つの選択肢を表示
✅ 選択すると正誤判定
✅ 5問終了後に得点表示

まだ入れないもの：

ランダム出題
時間計測
履歴保存
グラフ
MathJax数式表示

（ただし、後で追加しやすい構造にします）

① ファイル構成を少し変更します

現在：

hello-pwa
│
├── index.html
├── manifest.json
├── service-worker.js
└── icon-192.png

に、以下を追加します。

hello-pwa
│
├── index.html
├── app.js        ←追加
├── style.css     ←追加
├── manifest.json
├── service-worker.js
└── icon-192.png

HTML、CSS、JavaScriptを分離します。

② index.htmlを変更

index.htmlを以下に置き換えてください。

<!DOCTYPE html>
<html lang="ja">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>三角関数トレーニング</title>

<link rel="manifest" href="manifest.json">

<link rel="apple-touch-icon"
href="icon-192.png">

<link rel="stylesheet"
href="style.css">

</head>


<body>


<div class="container">

<h1>
三角関数トレーニング
</h1>


<div id="question">
</div>


<div id="choices">
</div>


<div id="result">
</div>


</div>


<script src="app.js"></script>


<script>

if ('serviceWorker' in navigator){

navigator.serviceWorker.register(
'service-worker.js'
);

}

</script>


</body>

</html>
③ style.cssを作成

新規ファイル style.css

body {

font-family:
-apple-system,
BlinkMacSystemFont,
sans-serif;

background:#f5f5f5;

margin:0;

}


.container {

max-width:600px;

margin:auto;

padding:20px;

}


h1 {

text-align:center;

}


#question {

background:white;

padding:20px;

border-radius:10px;

font-size:22px;

margin-bottom:20px;

}


.choice {

display:block;

width:100%;

padding:15px;

margin:10px 0;

font-size:18px;

border-radius:10px;

border:none;

background:#2196f3;

color:white;

}


.choice:hover {

background:#1565c0;

}


#result {

font-size:24px;

text-align:center;

margin-top:20px;

}
④ app.jsを作成

新規ファイル app.js

const questions = [

{
question:
"sinA cosB を積和公式で表せ",

choices:[

"1/2{sin(A+B)+sin(A-B)}",

"1/2{sin(A+B)-sin(A-B)}",

"sin(A+B)",

"cos(A+B)"

],

answer:0

},


{

question:
"cosA cosB を積和公式で表せ",

choices:[

"1/2{cos(A+B)+cos(A-B)}",

"1/2{sin(A+B)+sin(A-B)}",

"cos(A+B)",

"sin(A+B)"

],

answer:0

},


{

question:
"sinA sinB を積和公式で表せ",

choices:[

"1/2{cos(A-B)-cos(A+B)}",

"1/2{cos(A+B)+cos(A-B)}",

"sin(A+B)",

"cos(A-B)"

],

answer:0

},


{

question:
"sinA+sinB の和積公式は？",

choices:[

"2sin((A+B)/2)cos((A-B)/2)",

"2cos((A+B)/2)sin((A-B)/2)",

"sin(A+B)",

"cos(A+B)"

],

answer:0

},


{

question:
"cosA+cosB の和積公式は？",

choices:[

"2cos((A+B)/2)cos((A-B)/2)",

"2sin((A+B)/2)sin((A-B)/2)",

"cos(A+B)",

"sin(A+B)"

],

answer:0

}


];


let current = 0;

let score = 0;


function showQuestion(){


let q = questions[current];


document.getElementById("question")
.innerHTML =

"第" + (current+1) +
"問<br><br>" +
q.question;



let html="";


q.choices.forEach(
function(choice,index){


html +=

`
<button class="choice"
onclick="answer(${index})">

${choice}

</button>
`;

});


document.getElementById("choices")
.innerHTML=html;


}



function answer(index){


if(index === questions[current].answer){

score++;

}


current++;


if(current < questions.length){

showQuestion();

}

else{


document.getElementById("question")
.innerHTML="終了";


document.getElementById("choices")
.innerHTML="";


document.getElementById("result")
.innerHTML=

score+
" / "+
questions.length+
" 正解";

}


}



showQuestion();
⑤ 動作確認

保存したら、

git add .

↓

git commit -m "Create math quiz ver1"

↓

git push

してください。

1～2分後、iPhoneでPWAを開くと、

三角関数トレーニング

第1問
sinA cosB を積和公式で表せ

[選択肢1]
[選択肢2]
[選択肢3]
[選択肢4]

という形になります。

次のVer.1.1で追加すると良いもの

この後は自然に、

問題をランダムに5問選ぶ
回答後「正解・不正解」を表示する
タイマーを追加する

へ進めます。

その後に、予定されている MathJax対応（本格的な数式表示） を入れると、数学アプリらしくなります。

ver1.1をお願い。

了解です。
Ver.1.1では、「毎回同じ5問」ではなく、問題データの中からランダムに5問出題する機能を追加します。

今回は以下を追加します。

Ver.1.1の追加機能

✅ 問題をシャッフル
✅ 毎回違う順番で5問出題
✅ 問題数を増やしても対応可能な構造に変更

まだ入れないもの：

制限時間
履歴保存
グラフ
MathJax数式表示
変更するファイル

今回は app.jsだけ変更します。

index.html と style.css はそのままで大丈夫です。

app.jsを変更

現在の app.js をすべて以下に置き換えてください。

const allQuestions = [

{
question:
"sinA cosB を積和公式で表せ",

choices:[

"1/2{sin(A+B)+sin(A-B)}",

"1/2{sin(A+B)-sin(A-B)}",

"sin(A+B)",

"cos(A+B)"

],

answer:0

},


{

question:
"cosA cosB を積和公式で表せ",

choices:[

"1/2{cos(A+B)+cos(A-B)}",

"1/2{sin(A+B)+sin(A-B)}",

"cos(A+B)",

"sin(A+B)"

],

answer:0

},


{

question:
"sinA sinB を積和公式で表せ",

choices:[

"1/2{cos(A-B)-cos(A+B)}",

"1/2{cos(A+B)+cos(A-B)}",

"sin(A+B)",

"cos(A-B)"

],

answer:0

},


{

question:
"sinA+sinB の和積公式は？",

choices:[

"2sin((A+B)/2)cos((A-B)/2)",

"2cos((A+B)/2)sin((A-B)/2)",

"sin(A+B)",

"cos(A+B)"

],

answer:0

},


{

question:
"cosA+cosB の和積公式は？",

choices:[

"2cos((A+B)/2)cos((A-B)/2)",

"2sin((A+B)/2)sin((A-B)/2)",

"cos(A+B)",

"sin(A+B)"

],

answer:0

}

];



// --------------------
// ランダム5問作成
// --------------------

function shuffle(array){

return array
.sort(
()=>Math.random()-0.5
);

}



const questions =
shuffle([...allQuestions])
.slice(0,5);



// --------------------

let current = 0;

let score = 0;



function showQuestion(){


let q = questions[current];


document.getElementById("question")
.innerHTML =

"第" +
(current+1) +
"問<br><br>" +
q.question;



let html="";


q.choices.forEach(
function(choice,index){


html +=

`
<button class="choice"
onclick="answer(${index})">

${choice}

</button>

`;

});


document.getElementById("choices")
.innerHTML = html;


}





function answer(index){


if(index === questions[current].answer){

score++;

}


current++;


if(current < questions.length){

showQuestion();

}

else{


document.getElementById("question")
.innerHTML="終了";


document.getElementById("choices")
.innerHTML="";


document.getElementById("result")
.innerHTML=

score+
" / "+
questions.length+
" 正解";

}


}




showQuestion();
動作確認

保存後：

git add .

↓

git commit -m "Add random questions"

↓

git push

します。

今回の変更点

前：

問題1
問題2
問題3
問題4
問題5

固定

↓

今回：

問題データ
 ↓
シャッフル
 ↓
5問選択
 ↓
出題

になります。

例えば、10問登録しておけば：

10問
 ↓
ランダム抽出
 ↓
今日の5問

ができます。

次のVer.1.2で入れると良い機能

次はかなり重要です。

Ver.1.2

回答後に正解・不正解を表示

例：

あなたの回答
sin(A+B)

×

正解
1/2{sin(A+B)+sin(A-B)}

[次の問題]

これを入れると、単なるクイズではなく「学習アプリ」になります。

その後、

Ver.2 → タイマー
Ver.3 → 履歴保存
Ver.4 → グラフ表示

という流れが自然です。