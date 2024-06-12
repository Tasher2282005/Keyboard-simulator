let startTime;
let typedChars = 0;
let correctChars = 0;

// Функция для открытия модального окна
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Функция для начала отслеживания времени и ввода символов
function startTracking() {
  startTime = Date.now();
  typedChars = 0;
  correctChars = 0;
}

// Функция для обновления статистики при вводе символов
function updateStatistics(event) {
  typedChars++;
  if (event.inputType === 'insertText') {
    if (event.target.value[event.target.value.length - 1] === event.data) {
      correctChars++;
    }
  }
  updateModalStatistics(); // Вызываем функцию обновления статистики при каждом вводе
}

function calculateWPM() {
  const elapsedTimeMinutes = (Date.now() - startTime) / 60000; // Преобразование миллисекунд в минуты
  const wpm = typedChars / elapsedTimeMinutes;
  return wpm;
}
// Функция для обновления статистики в модальном окне
function updateModalStatistics() {
  const wpm = calculateWPM();
  const accuracy = (correctChars / typedChars) * 100 || 0; // Точность

  document.getElementById('wpm').textContent = wpm.toFixed(2);
  document.getElementById('accuracy').textContent = accuracy.toFixed(2) + '%';
}

// Функция для проверки символов в реальном времени
function checkUserInput(event) {
  const originalText = document.getElementById('originalTextInput').value;
  const userText = document.getElementById('userTextInput').value;
  const userTextElement = document.getElementById('userTextInput');

  const currentCharIndex = userText.length - 1;
  const currentChar = userText.charAt(currentCharIndex);

  if (originalText.charAt(currentCharIndex) === currentChar) {
    userTextElement.classList.remove('is-danger');
    userTextElement.classList.add('is-success');
    if (currentChar === ' ') {
      if (userText.trim() === '') {
        // Проверка на единственный пробел
        userTextElement.classList.remove('is-success');
        userTextElement.classList.add('is-danger');
      }
    }
  } else {
    userTextElement.classList.remove('is-success');
    userTextElement.classList.add('is-danger');
    userTextElement.value = userText.slice(0, currentCharIndex);
  }
  updateStatistics(event); // Обновление статистики при каждом вводе символов
  checkTextCompletion(originalText, userText); // Проверка завершения ввода
}

// Функция для обработки нажатия кнопки "Печать"
function handlePrintButtonClick() {
  const textInput = document.getElementById('textInput').value;
  const originalTextInput = document.getElementById('originalTextInput');
  const userTextInput = document.getElementById('userTextInput');

  // Задать изначальный текст таким же, как и входной текст
  originalTextInput.value = textInput;
  userTextInput.value = '';

  // Начать отслеживание времени и статистики
  startTracking(); // Добавляем вызов этой функции

  // Открыть модальное окно
  openModal();

  // Обновить статистику на странице (это также поможет показать начальное значение WPM и точности)
  updateModalStatistics();
}

function checkTextCompletion(originalText, userText) {
  if (originalText.trim() === userText.trim()) {
    // Если тексты совпадают, значит пользователь завершил ввод
    handleConfirmButtonClick();
  }
}

// Функция для обработки нажатия кнопки "Подтвердить"
function handleConfirmButtonClick() {
  const originalTextInput = document.getElementById('originalTextInput').value;
  const userTextInput = document.getElementById('userTextInput').value;

  // Сравнить введенный текст и изначальный текст
  if (originalTextInput === userTextInput) {
    alert('Печать окончена!');
  } else {
    alert('Печать окончена!');
  }

  // Закрыть модальное окно
  closeModal();

  // Обновить статистику на странице
  updateModalStatistics();

  // Обновить страницу
  location.reload();
}

// Функция для обработки нажатия кнопки "Отмена"
function handleCancelButtonClick() {
  // Закрыть модальное окно
  closeModal();
}

// Обработчики событий
// Обработчики событий
document.getElementById('printButton').addEventListener('click', handlePrintButtonClick);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('confirmButton').addEventListener('click', handleConfirmButtonClick);
document.getElementById('cancelButton').addEventListener('click', handleCancelButtonClick);
document.getElementById('userTextInput').addEventListener('input', checkUserInput);


// Находим элементы
// // Добавляем обработчик события input для поля ввода текста
textInput.addEventListener('input', function() {
  let text = textInput.value; // Получаем введенный текст

  // Проверяем, есть ли пробел в начале строки
  if (text.startsWith(' ')) {
      text = text.trimLeft(); // Удаляем пробел в начале строки
  }

  // Проверяем, есть ли пробел в конце строки
  if (text.endsWith(' ')) {
      text = text.trimRight() + ' '; // Удаляем пробел в конце строки и добавляем один в конец
  }

  // Обновляем значение поля ввода текста
  textInput.value = text;
});

// Добавляем обработчик события click для кнопки "Печатать"
printButton.addEventListener('click', function() {
  // Получаем введенный текст
  let text = textInput.value;
  // Добавляем пробел в конец строки
  text += ' ';
  // Задаем изначальный текст таким же, как введенный текст
  textInput.value = text;
});
