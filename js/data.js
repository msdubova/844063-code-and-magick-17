'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  /**
     * Функция создает имя персонажа
     * @param {string[]} names массив имен
     * @param {string[]} surnames массив фамилий
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

      wizardCloned.querySelector('.setup-similar-label').textContent = generateFullName(window.constants.WIZARD_NAMES, window.constants.WIZARD_SURNAMES);
      wizardCloned.querySelector('.wizard-coat').style.fill = window.util.generateStyle(window.constants.COAT_COLORS);
      wizardCloned.querySelector('.wizard-eyes').style.fill = window.util.generateStyle(window.constants.EYES_COLORS);

      fragment.appendChild(wizardCloned);
      window.globalElements.similarWizardsList.appendChild(fragment);
    }
  };

  window.createWizards();
})();
