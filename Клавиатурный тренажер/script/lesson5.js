// Буквы для урока
const lessonLetters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const letterColors = {
  '1': 'is-danger',
  '2': 'is-danger',
  '3': 'is-warning',
  '4': 'is-primary',
  '5': 'is-info',
  '6': 'is-info',
  '7': 'is-link',
  '8': 'is-danger',
  '9': 'is-warning',
  '0': 'is-primary',
  '1': 'is-danger',
  '2': 'is-danger',
  '3': 'is-warning',
  '4': 'is-primary',
  '5': 'is-info',
  '6': 'is-info',
  '7': 'is-link',
  '8': 'is-danger',
  '9': 'is-warning',
  '0': 'is-primary'
};

// Перемешиваем буквы

// Перемешиваем буквы
lessonLetters.sort(() => Math.random() - 0.5);

const lessonElement = document.getElementById('lesson');
const timerElement = document.getElementById('timer');
const keyboardElement = document.getElementById('keyboard');
const modalElement = document.getElementById('modal');
const modalCloseButton = document.getElementById('modalClose');

const menuButton = document.getElementById('menuButton');
const retryButton = document.getElementById('retryButton');

let currentIndex = 0;
let errors = 0;
let startTime;
let intervalId;

modalCloseButton.addEventListener('click', () => {
  modalElement.classList.remove('is-active');
  currentIndex = 0;
  errors = 0;
  startTime = null;
});

document.addEventListener('keydown', function(event) {
  const key = event.key.toUpperCase();

  if (key === 'ENTER') {
    if (!startTime) {
      startLesson();
    }
  } else {
    if (startTime) {
      handleKeyClick(key);
    }
  }
});

function highlightCurrentLetter() {
  const currentLetter = lessonLetters[currentIndex]; 
  const keyElements = document.querySelectorAll('.key'); 
  keyElements.forEach(keyElement => {
    const keyValue = keyElement.textContent.toUpperCase();
    if (currentLetter !== undefined && (keyValue === currentLetter.toUpperCase() || (currentLetter === ' ' && keyValue === 'SPACE'))) {
      keyElement.classList.add('highlighted'); 
    } else {
      keyElement.classList.remove('highlighted'); 
    }
  });
}

function displayLesson() {
  const lessonHTML = lessonLetters.map(letter => `<span class="lesson-letter tag is-large ${letterColors[letter]}">${letter}</span>`).join(' ');
  lessonElement.innerHTML = lessonHTML;
  highlightCurrentLetter(); 
}

function startLesson() {
  startTime = new Date();
  intervalId = setInterval(updateTimer, 1000);
  displayLesson();
}

function pauseLesson() {
  clearInterval(intervalId);
  startTime = null;
}

function updateTimer() {
  const currentTime = new Date();
  const timeElapsed = (currentTime - startTime) / 1000;
  const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
  const seconds = Math.floor(timeElapsed % 60).toString().padStart(2, '0');
  timerElement.textContent = `${minutes}:${seconds}`;
}

function handleKeyClick(key) {
  if (currentIndex < lessonLetters.length) { 
    const nextLetter = lessonLetters[currentIndex];
    if (key === nextLetter) {
      lessonLetters[currentIndex] = ''; // Заменяем нажатую букву на пустую строку
      currentIndex++;
      lessonElement.classList.remove('error');
      displayLesson();
      if (currentIndex === lessonLetters.length) {
        endLesson();
      }
    } else {
      lessonElement.classList.add('error');
      errors++;
    }
  }
}

function showResultsModal(timeTaken, errors, charactersPerMinute) {
  const timeTakenElement = document.getElementById('timeTaken');
  const errorsElement = document.getElementById('errors');
  const charactersPerMinuteElement = document.getElementById('charactersPerMinute');

  timeTakenElement.textContent = `Время: ${Math.floor(timeTaken / 60)} мин ${Math.floor(timeTaken % 60)} сек`;
  errorsElement.textContent = `Ошибок: ${errors}`;
  charactersPerMinuteElement.textContent = `Символов в минуту: ${charactersPerMinute}`;

  modalElement.classList.add('is-active');
}

function endLesson() {
  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000;
  const charactersPerMinute = Math.round((lessonLetters.length / timeTaken) * 60);
  showResultsModal(timeTaken, errors, charactersPerMinute);
}

menuButton.addEventListener('click', () => {
  console.log('Returning to the main menu');
  window.location.replace('index.html');
});

retryButton.addEventListener('click', () => {
  console.log('Retrying the lesson');
  location.reload();
});

function stopTimer() {
  clearInterval(intervalId);
}

function startTimer() {
  startTime = new Date();
  intervalId = setInterval(updateTimer, 1000);
}
