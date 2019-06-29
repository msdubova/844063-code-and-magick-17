'use strict';

(function () {
  if (!window.util.setupPopup.classList.contains('.hidden')) {
    /**
     * Функция кастомизирует значения сообщений о невалидности
     */
    var getCustomValidityMessage = function () {
      if (window.util.userNameInput.validity.tooShort) {
        window.util.userNameInput.setCustomValidity('Минимальное значение символов - 2. Добавьте символы');
      } else if (window.util.userNameInput.validity.tooLong) {
        window.util.userNameInput.setCustomValidity('Минимальное значение символов - 25. Удалите лишние символы');
      } else if (window.util.userNameInput.validity.valueMissing) {
        window.util.userNameInput.setCustomValidity('Это поле обязательное для заполнения');
      } else {
        window.util.userNameInput.setCustomValidity('');
      }
    };

    /**
     * Функция проверяет валидность формы при клике
     * @param {object} evt «объект события», который передаётся первым аргументом в обработчик
     */
    var onButtonClick = function () {
      window.util.userNameInput.addEventListener('invalid', function (evt) {
        getCustomValidityMessage(evt);
      });
    };

    /**
     * Функция проверяет валидность формы при нажатии на клавишу
     * @param {object} evt объект события, который передаётся первым аргументом в обработчик
     */
    var onButtonPush = function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.util.userNameInput.addEventListener('invalid', function () {
          getCustomValidityMessage(evt);
        });
      }
    };

    window.util.submitButton.addEventListener('click', onButtonClick);
    window.util.submitButton.addEventListener('keydown', onButtonPush);
  } else {
    window.util.submitButton.removeEventListener('click', onButtonClick);
    window.util.submitButton.removeEventListener('keydown', onButtonPush);
  }
})();
