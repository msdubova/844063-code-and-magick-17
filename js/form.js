'use strict';

(function () {
  if (!window.globalElements.setupPopup.classList.contains('.hidden')) {
    /**
     * Функция кастомизирует значения сообщений о невалидности
     */
    var getCustomValidityMessage = function () {
      if (window.globalElements.userNameInput.validity.tooShort) {
        window.globalElements.userNameInput.setCustomValidity('Минимальное значение символов - 2. Добавьте символы');
      } else if (window.globalElements.userNameInput.validity.tooLong) {
        window.globalElements.userNameInput.setCustomValidity('Минимальное значение символов - 25. Удалите лишние символы');
      } else if (window.globalElements.userNameInput.validity.valueMissing) {
        window.globalElements.userNameInput.setCustomValidity('Это поле обязательное для заполнения');
      } else {
        window.globalElements.userNameInput.setCustomValidity('');
      }
    };

    /**
     * Функция проверяет валидность формы при клике
     * @param {object} evt «объект события», который передаётся первым аргументом в обработчик
     */
    var onButtonClick = function () {
      window.globalElements.userNameInput.addEventListener('invalid', function (evt) {
        getCustomValidityMessage(evt);
      });
    };

    /**
     * Функция проверяет валидность формы при нажатии на клавишу
     * @param {object} evt объект события, который передаётся первым аргументом в обработчик
     */
    var onButtonPush = function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        window.globalElements.userNameInput.addEventListener('invalid', function () {
          getCustomValidityMessage(evt);
        });
      }
    };


    window.globalElements.submitButton.addEventListener('click', onButtonClick);
    window.globalElements.submitButton.addEventListener('keydown', onButtonPush);


    var onErrorSubmit = function (errorNotification) {
      if (errorNotification) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; width: 500px; height: auto; padding: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); position: absolute;  font-size: inherit; text-align: center;   background-color: tomato;';
        node.textContent = errorNotification;
        document.body.insertAdjacentElement('afterbegin', node);
      }
    };

    window.globalElements.form.addEventListener('submit', function (evt) {
      window.save(new FormData(window.globalElements.form), function () {

        window.closePopup();

      }, onErrorSubmit);
      evt.preventDefault();
    });

  } else {
    window.globalElements.submitButton.removeEventListener('click', onButtonClick);
    window.globalElements.submitButton.removeEventListener('keydown', onButtonPush);
  }
})();
