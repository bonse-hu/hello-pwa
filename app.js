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