let countQ = document.querySelector(".countQ span");
let spans = document.querySelector(".spans");
let qArea = document.querySelector(".qArea");
let answersArea = document.querySelector(".answersArea");
let button = document.querySelector(".button");
let bullets = document.querySelector('.bullets');
let result = document.querySelector('.result');
let countDown = document.querySelector('.countDown');


let currentIndex = 0;
let correctAnswer = 0;
let countdownIntrval;
async function getQuestions() {
  try {
    let response = await fetch(https://rafatdawood.github.io/Create-Quiz-Application/data.json
);
    let data = await response.json();
    createBullets(data.length);
    addQuestion(data[currentIndex], data.length);
    countdown(3, data.length);
    button.onclick = () => {
      let tra = data[currentIndex].correct_answer;
      currentIndex++;
      checkAnswer(tra);
      qArea.innerHTML = '';
      answersArea.innerHTML = '';
      addQuestion(data[currentIndex], data.length);
      handelBullets();
      clearInterval(countdownIntrval)
      countdown(3, data.length);
      showRezult(data.length);
    };
  }
  catch { }
}
getQuestions();

function createBullets(num) {
  countQ.innerHTML = num;
  //create spans bullets
  for (let i = 1; i <= num; i++) {
    //create bullets
    let bullet = document.createElement("span");
    if (i === 1) {
      bullet.className = "on";
    }
    spans.appendChild(bullet);
  };
};

function addQuestion(obj, count) {
  if (currentIndex < count) {
    //create h2 question
    let qH2 = document.createElement("h2");
    qH2.innerHTML = obj.question;
    qArea.appendChild(qH2);
    //create the answars
    for (let i = 1; i <= 4; i++) {
      let answardiv = document.createElement("div");
      answardiv.className = "answer";

      let radioInput = document.createElement("input");
      // add type + name + id + data_attribute

      radioInput.name = "ans";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      if (i === 1) {
        radioInput.checked = true;
      }

      //add label
      let label = document.createElement("label");
      // add attribute for
      label.htmlFor = `answer_${i}`;
      label.innerHTML = obj[`answer_${i}`];

      answardiv.appendChild(radioInput);
      answardiv.appendChild(label);
      answersArea.appendChild(answardiv);

    }
  }
}


function checkAnswer(cA) {
  let Answers = document.getElementsByName('ans');
  let thechoiceAns;
  for (i = 0; i < 4; i++) {
    if (Answers[i].checked) {
      thechoiceAns = Answers[i].dataset.answer;
    }
  }
  if (cA === thechoiceAns) {
    console.log('Good Answer');
    correctAnswer++;
  }
};
function handelBullets() {
  let bSpans = document.querySelectorAll('.spans span');
  let arrayFromSpans = Array.from(bSpans);
  arrayFromSpans.forEach((span, index) => {
    if (currentIndex == index) {
      span.className = 'on';
    }
  })
};
function showRezult(cou) {
  let results;
  if (currentIndex === cou) {
    qArea.remove();
    answersArea.remove();
    button.remove();
    bullets.remove();
    if (correctAnswer > cou / 2 && correctAnswer < cou) {
      results = `<span class="good">good</span> You Answered ${correctAnswer} From ${cou}`
    } else if (correctAnswer === cou) {
      results = `<span class="perfect">Perfect</span> You Answered ${correctAnswer} From ${cou}`
    } else {
      results = `<span class="bad">bad</span> You Answered ${correctAnswer} From ${cou}`
    }
    result.innerHTML = results
  }
}
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownIntrval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countDown.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownIntrval);
        let removeInput = document.querySelectorAll("input");
        removeInput.forEach((e) => {
          e.checked = false;
        })
        button.click();
      }
    }, 1000);
  }
}
