 // Ваш скрипт без jQuery
 let inProgress = false;
 let timeElapsed = 0;

 let currentWord = 0;
 let correctWords = 0;
 let totalWords = 0;
 let charAcc = 0;
 let totalChars = 0;
 let correctChars = 0;

 const testTime = 60;
 const amountOfWords = 180;
 let currentTestTime = testTime;

 let WPM = 0;
 let words = [];
 let wordsRemaining;

 const passageContainer = document.querySelector('.passage_Container');
 const passageInput = document.querySelector('.passageInput');

 function randomInteger(min, max) { //from MDN
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 // Функция, которая создает слова в passage_Container
 function createWords() {
    for (let n = 0; n < amountOfWords; n++) {
        words.push(wordBank[randomInteger(0, wordBank.length)]);
    }
    wordsRemaining = words.length;
    words.forEach((e) => {
        let div = document.createElement("div");
        div.className = 'word';
        div.textContent = e;
        passageContainer.appendChild(div);
    });
}

 document.addEventListener('DOMContentLoaded', function() {
     // Вызываем функцию создания слов после загрузки страницы
     createWords();
 });
 

 function randomInteger(min, max) { //from MDN
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 document.addEventListener('DOMContentLoaded', function() {
    const bodyCurtain = document.querySelector('.bodyCurtain');
    if (bodyCurtain) {
        bodyCurtain.style.display = 'none';
    }
    
    createWords(); // Вызываем функцию создания слов после загрузки страницы
});


 function shiftWord() {
     const word = document.querySelector('.word:first-child');
     word.animate([
         { marginLeft: '0px' },
         { marginLeft: '-100px' }
     ], {
         duration: 50,
         easing: 'linear'
     }).onfinish = function() {
         word.remove();
     };
     updateCurrentWord();
     words.shift();
 }

 function submitWord(word) {
     const isCorrect = passageInput.value === (words[0] + ' ');
     totalWords += 1;
     if (isCorrect) {
         correctWords += 1;
         correctChars += words[0].length;
     } else {
         showError();
     }
     document.getElementById('stats_correctWords').innerText = correctWords + "/" + totalWords;
     passageInput.value = '';
     totalChars += words[0].length + 1;
     shiftWord();
     charAcc = (correctChars / totalChars) * 100;
     charAcc = parseFloat(charAcc).toFixed(1);
     document.getElementById('stats_charAcc').innerText = charAcc + "%";
 }

 function showError() {
     const passageInputMiss = document.querySelector('.passageInput_miss');
     passageInputMiss.style.display = 'flex';
     passageInputMiss.style.animation = 'none';
     setTimeout(() => {
         passageInputMiss.style.display = 'none';
     }, 250);
 }

 function calcWPM() {
     let wordsEstimate = correctChars / 4;
     WPM = (wordsEstimate / timeElapsed) * 60;
     WPM = parseFloat(WPM).toFixed(0);
     document.getElementById('stats_wordsPerMinute').innerText = WPM;
 }

 function updateCurrentWord() {
     currentWord += 1;
 }

 function beginTest() {
     inProgress = true;
     const timer = document.getElementById('stats_timeRemaining');
     timer.innerText = parseInt(currentTestTime) + "s";

     if (currentTestTime) {
         setTimeout(function() {
             currentTestTime -= 1;
             timeElapsed += 1;
             calcWPM();
             beginTest();
         }, 1000);
     } else {
         endTest();
     }
 }

 function endTest() {
     const passageContainers = document.querySelectorAll('.passage_Container, .passageInput_Container');
     passageContainers.forEach(container => {
         container.style.transition = '0.25s';
         container.style.height = '0';
         container.style.opacity = '0';
     });
     const endgameContainer = document.querySelector('.endgame_Container');
     endgameContainer.style.display = 'flex';
     setTimeout(() => {
         endgameContainer.style.opacity = '1';
     }, 500);
 }

 function reload() {
     location.reload();
 }

 function updateWordsRemaining() {
     wordsRemaining = words.length;
 }

 function begin() {
     const passageInputHint = document.querySelector('.passageInput_hint');
     const statsContainer = document.querySelector('.stats_Container');
     passageInputHint.style.display = 'none';
     statsContainer.style.display = 'flex';
     setTimeout(() => {
         statsContainer.style.opacity = '1';
     }, 500);
 }

 passageInput.addEventListener('input', () => {
     if (!inProgress) {
         begin();
         updateWordsRemaining();
         beginTest();
     }
     const wordsToType = words[0] + " ";
     if (passageInput.value === wordsToType) {
         const firstWord = document.querySelector('.word:first-child');
         firstWord.style.color = 'green';
     } else {
         const firstWord = document.querySelector('.word:first-child');
         firstWord.style.color = 'white';
     }
     const lastChar = passageInput.value.charAt(passageInput.value.length - 1);
     if (lastChar === ' ') {
         correctChars += 1;
         submitWord(passageInput.value);
         updateWordsRemaining();
     }
     document.getElementById('stats_totalChars').innerText = correctChars;
 });