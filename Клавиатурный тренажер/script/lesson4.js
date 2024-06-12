// Буквы для урока
const lessonLetters = ['Ф', 'Ы', 'В', 'А', 'Л', 'Д', 'Ж', 'О', 'Е', 'П', 'И', 'М', 'Н', 'Р', 'Т', 'Ь', 'У', 'К', 'Г', 'Ш', 'Ч', 'С', 'Б', 'Ю', 'Й', 'Ц', 'Щ', 'З', 'Х', 'Я', 'Э', 'Ъ', 'Й', 'Ц', 'Щ', 'З', 'Х', 'Я', 'Э', 'Ъ'];
const letterColors = {
  'Ф': 'is-danger',
  'Ы': 'is-warning',
  'В': 'is-primary',
  'А': 'is-info',
  'О': 'is-link',
  'Л': 'is-danger',
  'Д': 'is-warning',
  'Ж': 'is-primary',
  'Е': 'is-info',
  'П': 'is-info',
  'М': 'is-info',
  'И': 'is-info',
  'Н': 'is-link',
  'Р': 'is-link',
  'Т': 'is-link',
  'Ь': 'is-link',
  'У': 'is-primary',
  'К': 'is-info',
  'Г': 'is-link',
  'Ш': 'is-danger',
  'Ч': 'is-warning',
  'С': 'is-primary',
  'Б': 'is-danger',
  'Ю': 'is-warning',
  'Й': 'is-danger',
  'Ц': 'is-warning',
  'Щ': 'is-warning',
  'З': 'is-primary',
  'Я': 'is-danger',
  'Э': 'is-primary',
  'Х': 'is-primary',
  'Ъ': 'is-primary',
  'Й': 'is-danger',
  'Ц': 'is-warning',
  'Щ': 'is-warning',
  'З': 'is-primary',
  'Я': 'is-danger',
  'Э': 'is-primary',
  'Х': 'is-primary',
  'Ъ': 'is-primary',
};

// Перемешиваем буквы

// Перемешиваем буквы
lessonLetters.sort(() => Math.random() - 0.5);

const lessonElement = document.getElementById('lesson');
const timerElement = document.getElementById('timer');
const keyboardElement = document.getElementById('keyboard');
const modalElement = document.getElementById('modal');
const modalCloseButton = document.getElementById('modalClose');
const nextLessonButton = document.getElementById('nextLesson');
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

nextLessonButton.addEventListener('click', function() {
  // Переходим на страницу следующего урока
  window.location.href = 'lesson5.html'; // Замените 'lesson2.html' на URL следующего урока
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
