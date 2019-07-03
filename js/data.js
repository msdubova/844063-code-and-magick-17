'use strict';

(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  /**
     * Функция добавляет персонажей в разметку
     * @param {object} wizard
     * @return {object} wizardCloned
     */
  window.createWizards = function (wizard) {
    var wizardCloned = similarWizardTemplate.cloneNode(true).querySelector('.setup-similar-item');
    wizardCloned.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCloned.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardCloned.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardCloned;
  };

  var onSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();
    var similarList = document.querySelector('.setup-similar-list');
    var similarContainer = document.querySelector('.setup-similar');

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(window.createWizards(wizards[i]));
    }
    similarList.appendChild(fragment);
    similarContainer.classList.remove('hidden');
  };

  var onFail = function (errorNotification) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: auto; padding: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); position: absolute;  font-size: inherit; text-align: center;   background-color: tomato;';

    node.textContent = errorNotification;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.download(onSuccess, onFail);

})();
