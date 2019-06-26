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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupPopup = document.querySelector('.setup');
var openSetup = document.querySelector('.setup-open');

var form = setupPopup.querySelector('.setup-wizard-form');
var userNameInput = setupPopup.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var coatInput = form.querySelector('input[name="coat-color"]');
var eyesInput = form.querySelector('input[name="eyes-color"]');
var fireballInput = form.querySelector('input[name="fireball-color"]');
var isFocus = false;


/**
 * Функция - обработчик, слушает элемент на предмет клика клавиши 27 (Escape)и возвращает выполнение функции closePopup
 * @param {object} evt объект события, который передаётся первым аргументом в обработчик
 */
var onPopupEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) && (isFocus === false)) {
    onCloseSetupClick();
  }
};

/**
 * Функция-обработчик, срабатывает при клике на пальто мага в открытом попапе и запустит установку случайного цвета пальто
 */
var onWizardCoatClick = function () {
  setRandomColor(wizardCoat, COAT_COLORS, coatInput);
};

/**
 * Функция-обработчик, срабатывает при клике на глаза мага в открытом попапе и запутит установку случайного цвета глаз мага
 */
var onWizardEyesClick = function () {
  setRandomColor(wizardEyes, EYES_COLORS, eyesInput);
};

/**
 * Функция-обработчик, срабатывает при клике на фаербол мага в открытом попапе и запутит установку случайного цвета фаербола мага
 */
var onWizardFireballClick = function () {
  setRandomBackground(wizardFireball, FIREBALL_COLORS, fireballInput);
};

/**
 * Функция-обработчик  - закрывает попап
 */
var onCloseSetupClick = function () {
  closePopup();
};

/**
 * Функция- обрабочик - закрывает попап по нажатию эскейпа
 * @param {object} evt объект события, который передаётся первым аргументом в обработчик
 */
var onCloseSetupPush = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

/**
 * Функция-обработчик - создает флаг для функции закрытия попапа - при isFocus = true закрытие не произойдет
 */
var onUserNameInputFocus = function () {
  isFocus = true;
};

/**
 * Функция-обработчик - создает флаг для функции закрытия попапа - при isFocus = false закрытие произойдет
 */
var onUserNameInputBlur = function () {
  isFocus = false;
};

/**
 * Функция- обработчик, открывает попап при нажатии энтер
 * @param {object} evt объект события, который передаётся первым аргументом в обработчик
 */
var onPopupOpenPush = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPopupOpenClick();
  }
};

/**
 * Функция удаляет класс hidden у элемента, тем самым показывая его на странице, а также добавляет обработчик событий на документ и на кнопку формы
 */
var onPopupOpenClick = function () {
  var submitButton = setupPopup.querySelector('.setup-submit');
  var closeSetup = setupPopup.querySelector('.setup-close');
  openSetup.removeEventListener('click', onPopupOpenClick);

  setupPopup.classList.remove('hidden');
  createWizards();
  document.querySelector('.setup-similar').classList.remove('hidden');
  userNameInput.addEventListener('focus', onUserNameInputFocus);
  userNameInput.addEventListener('blur', onUserNameInputBlur);
  document.addEventListener('keydown', onPopupEscPress);
  submitButton.addEventListener('click', onButtonClick);
  submitButton.addEventListener('keydown', onButtonPush);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);

  closeSetup.addEventListener('click', onCloseSetupClick, {once: true});

  closeSetup.addEventListener('keydown', onCloseSetupPush, {once: true});
};

/**
 * Функция добавляет элементу класс hidden, тем самым скрывая его, а также удаляет обработчик событий с документа и с кнопки формы
 */
var closePopup = function () {
  var submitButton = setupPopup.querySelector('.setup-submit');
  openSetup.addEventListener('click', onPopupOpenClick);
  similarWizardsList.innerHTML = '';

  setupPopup.classList.add('hidden');
  document.querySelector('.setup-similar').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  submitButton.removeEventListener('click', onButtonClick);
  submitButton.removeEventListener('keydown', onButtonPush);
  userNameInput.removeEventListener('focus', onUserNameInputFocus);
  userNameInput.removeEventListener('blur', onUserNameInputBlur);
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardFireball.removeEventListener('click', onWizardFireballClick);
};


/**
 * Функция проверяет валидность формы при клике
 * @param {object} evt «объект события», который передаётся первым аргументом в обработчик
 */
var onButtonClick = function () {
  userNameInput.addEventListener('invalid', function (evt) {
    getCustomValidityMessage(evt);
  });
};

/**
 * Функция проверяет валидность формы при нажатии на клавишу
 * @param {object} evt объект события, который передаётся первым аргументом в обработчик
 */
var onButtonPush = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    userNameInput.addEventListener('invalid', function () {
      getCustomValidityMessage(evt);
    });
  }
};

/**
 * Функция кастомизирует значения сообщений о невалидности
 */
var getCustomValidityMessage = function () {
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
 * Функция присваивает случайный стиль fill элементу и передает этот цвет в форму
 * @param {object} item объект который должен быть прослушан на предмет клика
 * @param {string[]} array массив стилей для этого обьекта
 * @param {object} input поле формы, в которое будет записаны данные стиля
 */
var setRandomColor = function (item, array, input) {
  input.value = generateStyle(array);
  item.style.fill = input.value;
};

/**
 * Функция присваивает случайный стиль background элементу
 * @param {object} item
 * @param {string[]} array
 * @param {object} input
 */
var setRandomBackground = function (item, array, input) {
  input.value = generateStyle(array);
  item.style.background = input.value;
};

openSetup.addEventListener('click', onPopupOpenClick);

openSetup.addEventListener('keydown', onPopupOpenPush);


