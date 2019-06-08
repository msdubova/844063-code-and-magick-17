'use strict';

var wizardBoard = document.querySelector('.setup');
wizardBoard.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

  var generateFullName = WIZARD_NAMES[getRandomInRange(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomInRange(WIZARD_SURNAMES)];

  var generateCoat = COAT_COLORS[getRandomInRange(COAT_COLORS)];

  var generateEyes = EYES_COLORS[getRandomInRange(EYES_COLORS)];

  wizardCloned.querySelector('.setup-similar-label').textContent = generateFullName;
  wizardCloned.querySelector('.wizard-coat').style.fill = generateCoat;
  wizardCloned.querySelector('.wizard-eyes').style.fill = generateEyes;
  similarWizardsList.appendChild(wizardCloned);
}
