'use strict';

(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  /**
   * @param  {object} wizard обект свойств волщебника для рендеринга
   * @return {object} clonedWizard
   */
  var cloneWizard = function (wizard) {
    var wizardCloned = similarWizardTemplate.cloneNode(true).querySelector('.setup-similar-item');
    wizardCloned.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCloned.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardCloned.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardCloned;
  };

  /**
   * Функция добавляет персонажей в разметку
   * @param {object[]} wizards
   */
  window.createWizards = function (wizards) {

    var fragment = document.createDocumentFragment();
    var similarList = document.querySelector('.setup-similar-list');
    var similarContainer = document.querySelector('.setup-similar');
    similarList.innerHTML = '';
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(cloneWizard(wizards[i]));
    }
    similarList.appendChild(fragment);
    similarContainer.classList.remove('hidden');
  };
})();
