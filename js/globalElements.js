'use strict';
(function () {
  var setupPopup = document.querySelector('.setup');
  var userNameInput = setupPopup.querySelector('.setup-user-name');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var form = setupPopup.querySelector('.setup-wizard-form');
  var submitButton = setupPopup.querySelector('.setup-submit');


  window.globalElements = {
    setupPopup: setupPopup,
    userNameInput: userNameInput,
    similarWizardsList: similarWizardsList,
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    wizardFireball: wizardFireball,
    form: form,
    submitButton: submitButton
  };
})();
