'use strict';

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var fragment = document.createDocumentFragment();

/**
 * Функция показывает окно с персонажами
 */
// var showModal = function () {
//   var wizardBoard = document.querySelector('.setup');
//   wizardBoard.classList.remove('hidden');
//   document.querySelector('.setup-similar').classList.remove('hidden');
// };

/**
     * Функция создает случайное число в диапазоне ячеек массива опрокинутого в эту функцию параметром с учетом его длины
     * @param {number} arr  - принимает на вход длину массива с данными для того, чтоб вычислить длину массива и ограничить диапазон случайной выборки
     * @return {number} возвращает случайную ячейку массива из существующих в массиве
     */
var getRandomInRange = function (arr) {
  var min = 0;
  return Math.floor(Math.random() * ((arr.length - 1) - min + 1)) + min;
};

/**
 * Функция создает имя персонажа
 * @param {arr} names массив имен
 * @param {arr} surnames массив фамилий
 * @return {string} имя фамилия
 */
var generateFullName = function (names, surnames) {
  return (names[getRandomInRange(names)] + ' ' + surnames[getRandomInRange(surnames)]);
};

/**
   * Функция создает случайные стили
   * @param {arr} styles массив со стилями
   * @return {string} возвращает случайный стиль
   */
var generateStyle = function (styles) {
  return (styles[getRandomInRange(styles)]);
};

/**
 * Функция добавляет персонажей в разметку
 */
var createWizards = function () {
  for (var i = 0; i < 4; i++) {
    var wizardCloned = similarWizardTemplate.cloneNode(true);

    wizardCloned.querySelector('.setup-similar-label').textContent = generateFullName(WIZARD_NAMES, WIZARD_SURNAMES);
    wizardCloned.querySelector('.wizard-coat').style.fill = generateStyle(COAT_COLORS);
    wizardCloned.querySelector('.wizard-eyes').style.fill = generateStyle(EYES_COLORS);

    fragment.appendChild(wizardCloned);
    similarWizardsList.appendChild(fragment);
  }
};

// showModal();
createWizards();

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var openSetup = document.querySelector('.setup-open');
var closeSetup = setup.querySelector('.setup-close');
var submitButton = setup.querySelector('.setup-submit');
var form = setup.querySelector('.setup-wizard-form');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var coatInput = form.querySelector('input[name="coat-color"]');
var eyesInput = form.querySelector('input[name="eyes-color"]');
var fireballInput = form.querySelector('input[name="fireball-color"]');

/**
 * Функция - обработчик, слушает элемент на предмет клика клавиши 27 и возвращает выполнение функции closePopup
 * @param {*} evt
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

/**
 * Функция удаляет класс hidden у элемента, тем самым показывая его на странице, а также добавляет обработчик событий на документ и на кнопку формы
 */
var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  submitButton.addEventListener('click', onButtonClick);
  submitButton.addEventListener('keydown', onButtonPush);
  wizardCoat.addEventListener('click', function () {
    getRandomItem(wizardCoat, COAT_COLORS, coatInput);
  });
  wizardEyes.addEventListener('click', function () {
    getRandomItem(wizardEyes, EYES_COLORS, eyesInput);
  });
  wizardFireball.addEventListener('click', function () {
    getRandomBackground(wizardFireball, FIREBALL_COLORS, fireballInput);
  });
};

/**
 * Функция добавляет элементу класс hidden, тем самым скрывая его, а также удаляет обработчик событий с документа и с кнопки формы
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  submitButton.removeEventListener('click', onButtonClick);
  submitButton.removeEventListener('keydown', onButtonPush);
};


/**
 * Функция проверяет валидность формы при клике
 */
var onButtonClick = function () {
  userNameInput.addEventListener('invalid', function () {
    checkValidity();
    setCustomValidity();
  });
};

/**
 * Функция проверяет валидность формы при нажатии на клавишу
 * @param {object} evt обработчик события
 */
var onButtonPush = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    userNameInput.addEventListener('invalid', function () {
      checkValidity();
      setCustomValidity();
    // form.submit();
    });
  }
};

/**
 * Функция кастомизирует значения сообщений о невалидности
 */
var checkValidity = function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Минимальное значение символов - 2. Добавьте символы');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Минимальное значение символов - 25. Удалите лишние символы');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Это поле обязательное для заполнения');
  } else {
    userNameInput.setCustomValidity('');
  }
};

/**
 * Функция отправляет сообшение об ошибках в поле ввода формы
 * @param {*} evt
 */
var setCustomValidity = function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
};

/**
 * Функция присваивает случайный стиль fill элементу и передает этот цвет в форму
 * @param {object} item
 * @param {string[]} array
 * @param {object} input
 */
var getRandomItem = function (item, array, input) {
  input.value = generateStyle(array);
  item.style.fill = input.value;
};

/**
 * Функция присваивает случайный стиль background элементу
 * @param {object} item
 * @param {string[]} array
 * @param {object} input
 */
var getRandomBackground = function (item, array, input) {
  input.value = generateStyle(array);
  item.style.background = input.value;
};

openSetup.addEventListener('click', function () {
  openPopup();
});

openSetup.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

closeSetup.addEventListener('click', function () {
  closePopup();
});

closeSetup.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
