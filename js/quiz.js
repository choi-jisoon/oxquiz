//quiz.js
import quizData from "./quizdata.js";

//dom
const intro = document.getElementById('intro');
const quizWrap = document.getElementById('quiz_wrap');
const quizStart = document.querySelector('#intro .quiz_start');
const answerBtn = document.querySelectorAll('#answer_btns button') //버튼이 여러개라 배열처럼
const question = document.getElementById('question')
const resultWrap = document.getElementById('result_wrap')
const wrongWrap = document.getElementById('wrong_wrap')
const wrongList = document.getElementById('wrong_answer_list')
/* const resultBtn = document.querySelectorAll('#result_btns button') */
const wrongAnswer = document.querySelector('.wrong_answer')
const restart = document.querySelector('.restart')

//variable
let questionIndex = 0;
let score = 0;
let wrong = [];
let timer;

quizStart.addEventListener('click', function() {
   quizShow()
})

answerBtn.forEach(function(btn) {
   btn.addEventListener('click',function() {
      checkAnswer(this.classList.value)
   })
})

wrongAnswer.addEventListener('click', function() {
   wrongShow()
})

restart.addEventListener('click', function() {
   wrong = [];
   wrongWrap.style.display = 'none'
   wrongList.remove('li'); // 이러면 또 전체 삭제 되고 추가가 안됨
   score = 0;
   questionIndex = 0;
   quizShow()
})

function quizShow() {
   intro.style.display = 'none'
   quizWrap.style.display = 'block'

   const quizNo = document.getElementById('quiz_no')

   if(questionIndex > quizData.length - 1) {
      resultShow()
   }
   else {
      questionIndex++
   }

   quizNo.innerHTML = `문제 ${questionIndex}`
   question.innerHTML = quizData[questionIndex - 1].question

   timer = setInterval(function() {

   }, 3000)
}

function checkAnswer(answer) { // o,x버튼 누르면
    //정답확인
  // console.log(quizData[questionIndex - 1].question, quizData[questionIndex - 1].answer);

   if(answer === quizData[questionIndex - 1].answer) {
      score++
   }
   else {
      wrong.push(quizData[questionIndex - 1].id) //고쳐야함 인덱스값이 안맞아서
   }
   quizShow()
}

function resultShow() {
   resultWrap.style.display = 'block';
   quizWrap.style.display = 'none';

   const result = document.querySelector('#result_wrap p')
   result.innerHTML = `<span>${score}</span> / <span>${quizData.length}</span>`
}

function wrongShow() {
   resultWrap.style.display = 'none'
   wrongWrap.style.display = 'block'
   //오답 노트
   // wrong  배열 : 순회 (배열의 갯수만큼 li 생성)
   // wrongList.appendChild(wrongItem)
   wrong.forEach(function(wrongId) {
      const wrongItem = document.createElement('li');
      const wrongQuiz = quizData.find(item => item.id === wrongId);

      wrongItem.innerHTML = `문제${wrongQuiz.id}. ${wrongQuiz.question} (${wrongQuiz.answer})`

      wrongList.appendChild(wrongItem)
   })
}