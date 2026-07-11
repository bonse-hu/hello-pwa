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



function shuffle(array) {

    return array.sort(
        () => Math.random() - 0.5
    );

}


const questions =
    shuffle([...allQuestions]).slice(0, 5);



let current = 0;

let score = 0;

// タイマー開始
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

function showQuestion() {


    document.activeElement.blur();


    let q = questions[current];


    document.getElementById("question")
        .innerHTML =

        "第" +
        (current + 1) +
        "問<br><br>" +
        q.question;



    let html = "";


    q.choices.forEach(
        function (choice, index) {


            html += `

<button 
class="choice"
id="choice${index}"
onclick="answer(${index})">

${choice}

</button>

`;

        });


    document.getElementById("choices")
        .innerHTML = html;
    MathJax.typeset();

}




function answer(index) {


    let buttons =
        document.querySelectorAll(".choice");


    // 2回押し防止

    buttons.forEach(
        button => {
            button.disabled = true;
        });



    if (index === questions[current].answer) {

        score++;

        document
            .getElementById("choice" + index)
            .classList.add("correct");


    }

    else {


        document
            .getElementById("choice" + index)
            .classList.add("wrong");


        document
            .getElementById(
                "choice" + questions[current].answer
            )
            .classList.add("correct");


    }



    document.getElementById("result")
        .innerHTML =

        index === questions[current].answer

            ?

            "正解！"

            :

            "不正解<br>正解は上の緑色です";



    document.getElementById("choices")
        .innerHTML +=

        `

<button 
class="next-button"
onclick="nextQuestion()">

次の問題

</button>

`;

}




function nextQuestion() {


    current++;


    document.getElementById("result")
        .innerHTML = "";


    if (current < questions.length) {

        showQuestion();

    }

    else {


        let endTime = Date.now();


        let elapsed =
            Math.floor(
                (endTime - startTime) / 1000
            );
        saveHistory(score, elapsed);


        document.getElementById("question")
            .innerHTML = "終了";


        document.getElementById("choices")
            .innerHTML = "";


        document.getElementById("result")
            .innerHTML =

            `
<h2>結果</h2>

${questions.length}問中
${score}問正解

<br><br>

時間：
${formatTime(elapsed)}

`;
        showHistory();
        showChart();

    }

}



showQuestion();