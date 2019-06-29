'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setupPopup = document.querySelector('.setup');
  var userNameInput = setupPopup.querySelector('.setup-user-name');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var form = setupPopup.querySelector('.setup-wizard-form');
  var submitButton = setupPopup.querySelector('.setup-submit');
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  /**
   * Функция создает случайные стили
   * @param {arr} styles массив со стилями
   * @return {string} возвращает случайный стиль
   */
  var generateStyle = function (styles) {
    return (styles[getRandomInRange(styles)]);
  };

  /**
   * Функция создает случайное число в диапазоне ячеек массива опрокинутого в эту функцию параметром с учетом его длины
   * @param {number} arr  - принимает на вход длину массива с данными для того, чтоб вычислить длину массива и ограничить диапазон случайной выборки
   * @return {number} возвращает случайную ячейку массива из существующих в массиве
   */
  var getRandomInRange = function (arr) {
    var min = 0;
    return Math.floor(Math.random() * ((arr.length - 1) - min + 1)) + min;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    setupPopup: setupPopup,
    userNameInput: userNameInput,
    similarWizardsList: similarWizardsList,
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    wizardFireball: wizardFireball,
    form: form,
    submitButton: submitButton,
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    generateStyle: generateStyle,
    getRandomInRange: getRandomInRange
  };
})();

