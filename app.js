const allQuestions = [

    {
        question:
            "$\\sin A\\cos B$ を積和公式で表せ",

        choices: [

            "$\\frac{1}{2}\\{\\sin(A+B)+\\sin(A-B)\\}$",

            "$\\frac{1}{2}\\{\\sin(A+B)-\\sin(A-B)\\}$",

            "$\\sin(A+B)$",

            "$\\cos(A+B)$"

        ],

        answer: 0
    },


    {
        question: "cosA cosB を積和公式で表せ",

        choices: [
            "1/2{cos(A+B)+cos(A-B)}",
            "1/2{sin(A+B)+sin(A-B)}",
            "cos(A+B)",
            "sin(A+B)"
        ],

        answer: 0
    },


    {
        question: "sinA sinB を積和公式で表せ",

        choices: [
            "1/2{cos(A-B)-cos(A+B)}",
            "1/2{cos(A+B)+cos(A-B)}",
            "sin(A+B)",
            "cos(A-B)"
        ],

        answer: 0
    },


    {
        question: "sinA+sinB の和積公式は？",

        choices: [
            "2sin((A+B)/2)cos((A-B)/2)",
            "2cos((A+B)/2)sin((A-B)/2)",
            "sin(A+B)",
            "cos(A+B)"
        ],

        answer: 0
    },


    {
        question: "cosA+cosB の和積公式は？",

        choices: [
            "2cos((A+B)/2)cos((A-B)/2)",
            "2sin((A+B)/2)sin((A-B)/2)",
            "cos(A+B)",
            "sin(A+B)"
        ],

        answer: 0
    }

];

function generateQuestions(count) {
    const questions = [];
    const types = ['sin_cos', 'cos_sin', 'cos_cos', 'sin_sin'];

    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        // 係数 a, b をランダムに決定 (a > b とすることで差を正にする)
        let a = Math.floor(Math.random() * 8) + 2; // 2～9
        let b = Math.floor(Math.random() * (a - 1)) + 1; // 1～a-1
        
        let qText = "";
        let correctAns = "";
        let dummy = [];

        // 積和の公式の適用 (※ここから下の数式ロジックはソース外の追加情報です)
        switch (type) {
            case 'sin_cos': // sin A cos B = 1/2(sin(A+B) + sin(A-B))
                qText = `\\sin ${a}x \\cos ${b}x`;
                correctAns = `\\frac{1}{2}(\\sin ${a+b}x + \\sin ${a-b}x)`;
                dummy = [
                    `\\frac{1}{2}(\\sin ${a+b}x - \\sin ${a-b}x)`,
                    `\\frac{1}{2}(\\cos ${a+b}x + \\cos ${a-b}x)`,
                    `\\sin ${a+b}x + \\sin ${a-b}x`
                ];
                break;
            case 'cos_sin': // cos A sin B = 1/2(sin(A+B) - sin(A-B))
                qText = `\\cos ${a}x \\sin ${b}x`;
                correctAns = `\\frac{1}{2}(\\sin ${a+b}x - \\sin ${a-b}x)`;
                dummy = [
                    `\\frac{1}{2}(\\sin ${a+b}x + \\sin ${a-b}x)`,
                    `\\frac{1}{2}(\\cos ${a+b}x - \\cos ${a-b}x)`,
                    `\\frac{1}{2}(\\sin ${a+a}x - \\sin ${b+b}x)`
                ];
                break;
            case 'cos_cos': // cos A cos B = 1/2(cos(A+B) + cos(A-B))
                qText = `\\cos ${a}x \\cos ${b}x`;
                correctAns = `\\frac{1}{2}(\\cos ${a+b}x + \\cos ${a-b}x)`;
                dummy = [
                    `\\frac{1}{2}(\\cos ${a+b}x - \\cos ${a-b}x)`,
                    `\\frac{1}{2}(\\sin ${a+b}x + \\sin ${a-b}x)`,
                    `\\cos ${a+b}x + \\cos ${a-b}x`
                ];
                break;
            case 'sin_sin': // sin A sin B = -1/2(cos(A+B) - cos(A-B))
                qText = `\\sin ${a}x \\sin ${b}x`;
                correctAns = `-\\frac{1}{2}(\\cos ${a+b}x - \\cos ${a-b}x)`;
                dummy = [
                    `\\frac{1}{2}(\\cos ${a+b}x - \\cos ${a-b}x)`,
                    `-\\frac{1}{2}(\\cos ${a+b}x + \\cos ${a-b}x)`,
                    `-\\frac{1}{2}(\\sin ${a+b}x - \\sin ${a-b}x)`
                ];
                break;
        }

        // 選択肢のシャッフル処理 [1]
        let choices = shuffle([correctAns, ...dummy]);
        questions.push({
            question: `$ ${qText} = ?$`,
            choices: choices.map(c => `$ ${c} $`),
            answer: choices.indexOf(correctAns)
        });
    }
    return questions;
}

// 配列をシャッフルする補助関数 [1]
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// 変数と初期化 [1]
const questions = generateQuestions(5); // 毎回ランダムな5問を生成
let current = 0;
let score = 0;
let startTime = Date.now();

function formatTime(seconds) {

    let min =
        Math.floor(seconds / 60);

    let sec =
        seconds % 60;


    return (
        String(min).padStart(2, "0")
        +
        "分"
        +
        String(sec).padStart(2, "0")
        +
        "秒"
    );

}

function saveHistory(score, time) {


    let history =
        JSON.parse(
            localStorage.getItem("quizHistory")
        )
        || [];


    let now = new Date();


    let record = {

        date:
            now.getFullYear()
            +
            "/"
            +
            (now.getMonth() + 1)
            +
            "/"
            +
            now.getDate(),


        score: score,


        time: time

    };


    history.push(record);



    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );


}

function showHistory() {


    let history =
        JSON.parse(
            localStorage.getItem("quizHistory")
        )
        || [];


    let html =
        "<h2>履歴</h2>";



    history.forEach(
        item => {


            html +=

                `
<div class="history">

${item.date}

<br>

${item.score}/5 正解

<br>

${formatTime(item.time)}

</div>

`;


        });


    document.getElementById("result")
        .innerHTML += html;


}

function showChart() {


    let history =
        JSON.parse(
            localStorage.getItem("quizHistory")
        )
        || [];



    let labels = [];

    let scores = [];



    history.forEach(
        (item, index) => {


            labels.push(
                (index + 1) + "回目"
            );


            scores.push(
                item.score
                /
                5
                *
                100
            );


        });



    new Chart(

        document
            .getElementById("historyChart"),


        {

            type: "line",


            data: {


                labels: labels,


                datasets: [{


                    label: "正答率 (%)",


                    data: scores,


                    borderColor:
                        "blue",


                    backgroundColor:
                        "lightblue",


                    tension: 0.3


                }]


            },



            options: {


                scales: {


                    y: {


                        min: 0,

                        max: 100

                    }


                }


            }


        }

    );


}

// 問題の表示処理 [1]
function showQuestion() {
    const q = questions[current];
    document.getElementById('question').innerHTML = q.question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    q.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice';
        btn.id = `choice${index}`;
        btn.innerHTML = choice;
        btn.onclick = () => answer(index);
        choicesDiv.appendChild(btn);
    });

    // 数式の再描画 (MathJax 3.x 対応)
    if (window.MathJax) {
        MathJax.typeset();
    }
}



// 解答判定処理 [1]
function answer(index) {
    const q = questions[current];
    const resultDiv = document.getElementById('result');
    const buttons = document.querySelectorAll('.choice');
    
    // 全ボタンを無効化
    buttons.forEach(btn => btn.disabled = true);

    if (index === q.answer) {
        score++;
        buttons[index].classList.add('correct');
        resultDiv.innerHTML = '正解！';
    } else {
        buttons[index].classList.add('wrong');
        buttons[q.answer].classList.add('correct');
        resultDiv.innerHTML = '不正解...';
    }

    resultDiv.innerHTML += `
        <button class="next-button" onclick="nextQuestion()">次の問題へ</button>
    `;
}



// 次の問題へ、または終了処理 [2]
function nextQuestion() {
    current++;
    document.getElementById('result').innerHTML = '';
    
    if (current < questions.length) {
        showQuestion(); [1]
    } else {
        // クイズ終了時の処理
        const elapsed = Math.floor((Date.now() - startTime) / 1000); [1]
        document.getElementById('question').innerHTML = '終了！';
        
        // 【修正】結果表示に「もう一度やる」と「履歴リセット」ボタンを追加
        document.getElementById('choices').innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                ${questions.length}問中 ${score}問正解<br>
                時間： ${formatTime(elapsed)}
            </div>
            <button class="next-button" onclick="restartQuiz()">もう一度やる</button>
            <button class="next-button" style="background:#888; margin-top:10px;" onclick="resetHistory()">履歴をリセット</button>
        `; [1, 2]

        saveHistory(score, elapsed); [3]
        showHistory(); [3]
        
        // 前回の回答に基づき、全問正解時のみグラフ表示
        if (score === 5) {
            showChart(); [3]
        }
    }
}

// クイズを最初からやり直す関数
function restartQuiz() {
    current = 0;
    score = 0;
    startTime = Date.now();
    // 以前のセッションで実装した「問題をランダム生成する関数」を呼び出す
    // questions = generateQuestions(5); 
    showQuestion(); [3]
    document.getElementById('result').innerHTML = '';
}

// 履歴を削除する関数
function resetHistory() {
    if (confirm('これまでの学習履歴をすべて削除しますか？')) {
        localStorage.removeItem('quizHistory'); // 保存時のキー名に合わせてください
        showHistory(); [3]
        // グラフもクリアする
        const chartCanvas = document.getElementById('historyChart');
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
        }
    }
}

// その他の補助関数 (formatTime, saveHistory 等) は既存の [1] [2] をそのまま使用
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

showQuestion();