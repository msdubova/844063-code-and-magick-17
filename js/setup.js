'use strict';

(function () {
  var openSetup = document.querySelector('.setup-open');
  var isFocus = false;

  /**
   * Функция-обработчик - создает флаг для функции закрытия попапа - при isFocus = true закрытие не произойдет
   */
  var onUserNameInputFocus = function () {
    isFocus = true;
  };

  /**
   * Функция-обработчик - создает флаг для функции закрытия попапа - при isFocus = false закрытие произойдет
   */
  var onUserNameInputBlur = function () {
    isFocus = false;
  };

  /**
   * Функция - обработчик, слушает элемент на предмет клика клавиши 27 (Escape)и возвращает выполнение функции closePopup
   * @param {object} evt объект события, который передаётся первым аргументом в обработчик
   */
  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === window.util.ESC_KEYCODE) && (isFocus === false)) {
      closePopup();
    }
  };

  /**
   * Функция-обработчик  - закрывает попап
   */
  var onCloseSetupClick = function () {
    closePopup();
  };

  /**
   * Функция- обрабочик - закрывает попап по нажатию эскейпа
   * @param {object} evt объект события, который передаётся первым аргументом в обработчик
   */
  var onCloseSetupPush = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  };

  /**
   * Функция удаляет класс hidden у элемента, тем самым показывая его на странице, а также добавляет обработчик событий на документ и на кнопку формы
   */
  var onPopupOpenClick = function () {
    var closeSetup = window.util.setupPopup.querySelector('.setup-close');

    openSetup.removeEventListener('click', onPopupOpenClick);
    window.util.similarWizardsList.innerHTML = '';
    window.util.setupPopup.classList.remove('hidden');
    document.querySelector('.setup-similar').classList.remove('hidden');

    window.createWizards();

    window.util.userNameInput.addEventListener('focus', onUserNameInputFocus);
    window.util.userNameInput.addEventListener('blur', onUserNameInputBlur);

    document.addEventListener('keydown', onPopupEscPress);
    closeSetup.addEventListener('click', onCloseSetupClick);
    closeSetup.addEventListener('keydown', onCloseSetupPush);
  };

  /**
   * Функция- обработчик, открывает попап при нажатии энтер
   * @param {object} evt объект события, который передаётся первым аргументом в обработчик
   */
  var onPopupOpenPush = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onPopupOpenClick();
    }
  };

  /**
   * Функция добавляет элементу класс hidden, тем самым скрывая его, а также удаляет обработчик событий с документа и с кнопки формы
   */
  var closePopup = function () {
    openSetup.addEventListener('click', onPopupOpenClick);
    window.util.setupPopup.classList.add('hidden');
    document.querySelector('.setup-similar').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.util.userNameInput.removeEventListener('focus', onUserNameInputFocus);
    window.util.userNameInput.removeEventListener('blur', onUserNameInputBlur);
  };

  openSetup.addEventListener('click', onPopupOpenClick);
  openSetup.addEventListener('keydown', onPopupOpenPush);
})();
