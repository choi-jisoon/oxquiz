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
const timerCount = document.querySelector('.timer')

//variable
let questionIndex = 0;
let score = 0;
let wrong = [];
let timer;
let counter;
let countNum = 3;

timerCount.textContent = countNum //타이머 초기값
timerCount.style.display = 'none'
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
   wrongList.innerHTML = '' // 오답 리스트 삭제(초기화)
   score = 0;
   questionIndex = 0;
   quizShow()
})

function quizShow() {
   intro.style.display = 'none'
   quizWrap.style.display = 'block'
   timerCount.style.display = 'block'
   const quizNo = document.getElementById('quiz_no')

   if(questionIndex > quizData.length - 1) {
      resultShow() //문제풀이 완료
      clearTimeout(timer) //마지막 타이머 삭제
      clearTimeout(counter)
      return // resultShow 함수와 타이머 삭제 후 quizShow 함수를 빠져나가는 용도
   }
   else {
      questionIndex++
   }

   quizNo.innerHTML = `문제 ${questionIndex}`
   question.innerHTML = quizData[questionIndex - 1].question

   //문제가 넘어 갈 때(호출될 때 마다) 이전 타이머를 삭제 하고 재실행 해줘야함
   clearTimeout(timer)
   clearTimeout(counter)
   //quizShow() 호출 => 다음문제 실행이기 때문에, 타이머 설정을 초기화 해줘야 한다
   countNum = 3;
   timerCount.textContent = countNum;

   counter = setInterval(function() {
      countNum--;
      timerCount.textContent = countNum
   }, 1000)

   timer = setInterval(function() {
      //안풀면 오답처리를 해야함
      wrong.push(quizData[questionIndex - 1].id)

      //다음문제 게시
      quizShow()
   }, 4000)
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
   timerCount.style.display = 'none'
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