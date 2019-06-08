'use strict';

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Функция показывает окно с персонажами
 */
var showModal = function () {
  var wizardBoard = document.querySelector('.setup');
  wizardBoard.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
}

showModal();

var createWizards = function () {
  for (var i = 0; i < 4; i++) {


      var wizardCloned = similarWizardTemplate.cloneNode(true);


    /**
     * Функция создает случайное число в диапазоне ячеек массива опрокинутого в эту функцию параметром с учетом его длины
     * @param {number} arr  - принимает на вход длину массива с данными для того, чтоб вычислить длину массива и ограничить диапазон случайной выборки
     * @return {number} возвращает случайную ячейку массива из существующих в массиве
     */
    var getRandomInRange = function (arr) {
      var min = 0;
      return Math.floor(Math.random() * ((arr.length-1) - min + 1)) + min;
    };

    /**
     * Функция создает имя персонажа
     * @return {string} имя фамилия
     */
    var generateFullName = function (names, surnames) {
      return (names[getRandomInRange(names)] + ' ' + surnames[getRandomInRange(surnames)]);
    };

    /**
     * Функция создает случайные стили
     * @param {arr} styles массив со стилями
     * @return {}
     */
    var generateStyle  = function (styles) {
      return (styles[getRandomInRange(styles)]);
    }

    wizardCloned.querySelector('.setup-similar-label').textContent = generateFullName(WIZARD_NAMES, WIZARD_SURNAMES);
    wizardCloned.querySelector('.wizard-coat').style.fill = generateStyle(COAT_COLORS);
    wizardCloned.querySelector('.wizard-eyes').style.fill = generateStyle(EYES_COLORS);

    similarWizardsList.appendChild(wizardCloned);
  }
};

createWizards();


