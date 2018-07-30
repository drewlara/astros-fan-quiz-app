'use strict';

let question = 0;
let score = 0;


function startQuiz(){
  $('.start').on('click', '.start-button', function(){
    $('.start').remove();
    $('.question-form').css('display', 'block');
    $('.question-number').text(1);
  });
}

function createQuestion(){
  if(question < STORE.length){
    return `<h1>${STORE[question].question}</h1>
        <form>
          <fieldset>
            <label class="answer-choice">
              <input class="checkmark" type="radio" name="choice" required>
              <span>${STORE[question].answers[0]}</span>
            </label>
            <label class="answer-choice">
              <input class="checkmark" type="radio" name="choice" required>
              <span>${STORE[question].answers[1]}</span>
            </label>
            <label class="answer-choice">
              <input class="checkmark" type="radio" name="choice" required>
              <span>${STORE[question].answers[2]}</span>
            </label>
            <label class="answer-choice">
              <input class="checkmark" type="radio" name="choice" required>
              <span>${STORE[question].answers[3]}</span>
            </label>
            <button class="answer-submit-button">Submit</button>
          </fieldset>
        </form>`
  }
}

function renderQuestion(){
  $('.question-form').html(createQuestion());
}

function correctScreen(){
  let correct = `<h1>Your choice was CORRECT!</h1>
        <img src="https://i.giphy.com/media/3o7aDbYAWjyMhZH2HS/giphy.webp" alt="thumbs-up" class="feedback">
        <button class="next-button">Next Question</button>`;
  $('.question-form').html(correct);
}

function wrongScreen(){
  let wrong =  `<h1>Your choice was WRONG!</h1>
        <img src="http://mlb.mlb.com/images/5/8/2/186222582/062516_altuve_fall_reaction_MED_z7t5vbvy.gif" alt="tumbling-down" class="feedback">
        <button class="next-button">Next Question</button>`;
  $('.question-form').html(wrong);
}


function submitAnswer(){
  $('form').submit(function(event){
    event.preventDefault();
    let userChoice = $('input:checked').siblings('span').text();

    if(userChoice === STORE[question].correctAnswer){
      ++score; 
      $('.score').text(score);
      correctScreen();
    }
    else{
      wrongScreen();
    }
  });
}

function renderEnd(){
  let result = '';

  if(score <= 10 && score >=8){
    result = `<h1 class="final-title">Nice Work! Your final score was: ${score}</h1>
              <h3 class="final-subtitle">You are an ULTIMATE Astros Fan!</h3>
              <img src='http://www.mlb.com/images/9/6/2/271091962/040208_gif_hou_celebrations.gif' alt='celebration' class="feedback">
              <button class="restart-button">Restart Quiz</button>`
    $('.question-form').html(result);
  }
  else if(score <=7  && score >= 5){
    result = `<h1 class="final-title">Good Job! Your final score was: ${score}</h1>
              <h3 class="final-subtitle">You are a definitely an Astros Fan!</h3>
              <img src='https://i.giphy.com/media/3ohhwiGSCucHpz0ThS/giphy.webp' alt='hands-up' class="feedback">
              <button class="restart-button">Restart Quiz</button>`
    $('.question-form').html(result);
  }
  else if(score < 5){
    result = `<h1 class="final-title">Your final score was: ${score}</h1>
              <h3 class="final-subtitle">You must not be an Astros Fan</h3>
              <img src='https://media.giphy.com/media/J98ch2yai813y/giphy.gif' alt='sad-player' class="feedback">
              <button class="restart-button">Restart Quiz</button>`
    $('.question-form').html(result);
  }
}

function restartQuiz(){
  $('main').on('click', '.restart-button', function(){
    location.reload();
  });
}


function renderNextQuestion(){
  $('main').on('click', '.next-button', function(){
    if(question+1 < STORE.length){
      ++question; 
      $('.question-number').text(question+1);
      renderQuestion();
      submitAnswer();
    }
    else{
      renderEnd();
    }
  });
}


function createQuiz () {
  startQuiz();
  renderQuestion();
  submitAnswer();
  renderNextQuestion();
  restartQuiz();
}

$(createQuiz);