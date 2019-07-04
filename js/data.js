'use strict';

(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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

  window.onSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();
    var similarList = document.querySelector('.setup-similar-list');
    var similarContainer = document.querySelector('.setup-similar');

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(window.createWizards(wizards[i]));
    }
    similarList.appendChild(fragment);
    similarContainer.classList.remove('hidden');
  };

  window.onFail = function (errorNotification) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: auto; padding: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); position: absolute;  font-size: inherit; text-align: center;   background-color: tomato;';

    switch (errorNotification) {
      case 300:
        node.textContent = 'Multiple Choice';
        break;
      case 301:
        node.textContent = 'Moved Permanently';
        break;
      case 307:
        node.textContent = 'Temporary Redirect';
        break;
      case 400:
        node.textContent = 'Bad Request';
        break;
      case 401:
        node.textContent = 'Access denied';
        break;
      case 404:
        node.textContent = 'Not found';
        break;
      case 500:
        node.textContent = 'Internal Server Error';
        break;
      default:
        node.textContent = 'Request status: ' + status;
    }
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
