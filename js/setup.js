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
    if ((evt.keyCode === window.constants.ESC_KEYCODE) && (isFocus === false)) {
      window.closePopup();
    }
  };

  /**
   * Функция-обработчик  - закрывает попап
   */
  var onCloseSetupClick = function () {
    window.closePopup();
  };

  /**
   * Функция- обрабочик - закрывает попап по нажатию эскейпа
   * @param {object} evt объект события, который передаётся первым аргументом в обработчик
   */
  var onCloseSetupPush = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      window.closePopup();
    }
  };

  /**
   * Функция удаляет класс hidden у элемента, тем самым показывая его на странице, а также добавляет обработчик событий на документ и на кнопку формы
   */
  var onPopupOpenClick = function () {
    var closeSetup = window.globalElements.setupPopup.querySelector('.setup-close');
    window.download(window.onSuccess, window.onFail);
    openSetup.removeEventListener('click', onPopupOpenClick);
    openSetup.removeEventListener('keydown', onPopupOpenClick);
    window.globalElements.similarWizardsList.innerHTML = '';
    window.globalElements.setupPopup.classList.remove('hidden');

    window.globalElements.userNameInput.addEventListener('focus', onUserNameInputFocus);
    window.globalElements.userNameInput.addEventListener('blur', onUserNameInputBlur);

    document.addEventListener('keydown', onPopupEscPress);
    closeSetup.addEventListener('click', onCloseSetupClick);
    closeSetup.addEventListener('keydown', onCloseSetupPush);
  };

  /**
   * Функция- обработчик, открывает попап при нажатии энтер
   * @param {object} evt объект события, который передаётся первым аргументом в обработчик
   */
  var onPopupOpenPush = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      onPopupOpenClick();
    }
  };

  /**
   * Функция добавляет элементу класс hidden, тем самым скрывая его, а также удаляет обработчик событий с документа и с кнопки формы
   */
  window.closePopup = function () {
    openSetup.addEventListener('click', onPopupOpenClick);
    openSetup.addEventListener('keydown', onPopupOpenPush);
    window.globalElements.setupPopup.classList.add('hidden');
    document.querySelector('.setup-similar').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.globalElements.userNameInput.removeEventListener('focus', onUserNameInputFocus);
    window.globalElements.userNameInput.removeEventListener('blur', onUserNameInputBlur);
  };

  openSetup.addEventListener('click', onPopupOpenClick);
  openSetup.addEventListener('keydown', onPopupOpenPush);
})();
