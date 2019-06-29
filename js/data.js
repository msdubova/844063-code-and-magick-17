'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  /**
     * Функция создает имя персонажа
     * @param {arr} names массив имен
     * @param {arr} surnames массив фамилий
     * @return {string} имя фамилия
     */
  var generateFullName = function (names, surnames) {
    return (names[window.util.getRandomInRange(names)] + ' ' + surnames[window.util.getRandomInRange(surnames)]);
  };

  /**
   * Функция добавляет персонажей в разметку
   */
  window.createWizards = function () {
    for (var i = 0; i < 4; i++) {
      var wizardCloned = similarWizardTemplate.cloneNode(true);

      wizardCloned.querySelector('.setup-similar-label').textContent = generateFullName(window.util.WIZARD_NAMES, window.util.WIZARD_SURNAMES);
      wizardCloned.querySelector('.wizard-coat').style.fill = window.util.generateStyle(window.util.COAT_COLORS);
      wizardCloned.querySelector('.wizard-eyes').style.fill = window.util.generateStyle(window.util.EYES_COLORS);

      fragment.appendChild(wizardCloned);
      window.util.similarWizardsList.appendChild(fragment);
    }
  };

  window.createWizards();
})();
