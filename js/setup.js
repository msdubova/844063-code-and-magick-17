'use strict';
(function () {
  var addRandomWizards = function () {
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
    var createWizards = function () {
      for (var i = 0; i < 4; i++) {
        var wizardCloned = similarWizardTemplate.cloneNode(true);

        wizardCloned.querySelector('.setup-similar-label').textContent = generateFullName(window.util.WIZARD_NAMES, window.util.WIZARD_SURNAMES);
        wizardCloned.querySelector('.wizard-coat').style.fill = window.util.generateStyle(window.util.COAT_COLORS);
        wizardCloned.querySelector('.wizard-eyes').style.fill = window.util.generateStyle(window.util.EYES_COLORS);

        fragment.appendChild(wizardCloned);
        window.util.similarWizardsList.appendChild(fragment);
      }
    };

    createWizards();
  };


  (function () {
    var openSetup = document.querySelector('.setup-open');
    var isFocus = false;

    var coatInput = window.util.form.querySelector('input[name="coat-color"]');
    var eyesInput = window.util.form.querySelector('input[name="eyes-color"]');
    var fireballInput = window.util.form.querySelector('input[name="fireball-color"]');

    /**
     * Функция удаляет класс hidden у элемента, тем самым показывая его на странице, а также добавляет обработчик событий на документ и на кнопку формы
     */
    var onPopupOpenClick = function () {
      var submitButton = window.util.setupPopup.querySelector('.setup-submit');
      var closeSetup = window.util.setupPopup.querySelector('.setup-close');
      openSetup.removeEventListener('click', onPopupOpenClick);
      window.util.setupPopup.classList.remove('hidden');
      addRandomWizards();
      document.querySelector('.setup-similar').classList.remove('hidden');
      window.util.userNameInput.addEventListener('focus', onUserNameInputFocus);
      window.util.userNameInput.addEventListener('blur', onUserNameInputBlur);
      document.addEventListener('keydown', onPopupEscPress);
      submitButton.addEventListener('click', onButtonClick);
      submitButton.addEventListener('keydown', onButtonPush);
      window.util.wizardCoat.addEventListener('click', onWizardCoatClick);
      window.util.wizardEyes.addEventListener('click', onWizardEyesClick);
      window.util.wizardFireball.addEventListener('click', onWizardFireballClick);

      closeSetup.addEventListener('click', onCloseSetupClick, {once: true});

      closeSetup.addEventListener('keydown', onCloseSetupPush, {once: true});
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

      /**
     * Функция присваивает случайный стиль fill элементу и передает этот цвет в форму
     * @param {object} item объект который должен быть прослушан на предмет клика
     * @param {string[]} array массив стилей для этого обьекта
     * @param {object} input поле формы, в которое будет записаны данные стиля
     */
    var setRandomColor = function (item, array, input) {
      input.value = window.util.generateStyle(array);
      item.style.fill = input.value;
    };

    /**
     * Функция присваивает случайный стиль background элементу
     * @param {object} item
     * @param {string[]} array
     * @param {object} input
     */
    var setRandomBackground = function (item, array, input) {
      input.value = window.util.generateStyle(array);
      item.style.background = input.value;
    };

    /**
     * Функция-обработчик, срабатывает при клике на пальто мага в открытом попапе и запустит установку случайного цвета пальто
     */
    var onWizardCoatClick = function () {
      setRandomColor(window.util.wizardCoat, window.util.COAT_COLORS, coatInput);
    };

    /**
     * Функция-обработчик, срабатывает при клике на глаза мага в открытом попапе и запутит установку случайного цвета глаз мага
     */
    var onWizardEyesClick = function () {
      setRandomColor(window.util.wizardEyes, window.util.EYES_COLORS, eyesInput);
    };

    /**
     * Функция-обработчик, срабатывает при клике на фаербол мага в открытом попапе и запутит установку случайного цвета фаербола мага
     */
    var onWizardFireballClick = function () {
      setRandomBackground(window.util.wizardFireball, window.util.FIREBALL_COLORS, fireballInput);
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
      var submitButton = window.util.setupPopup.querySelector('.setup-submit');
      openSetup.addEventListener('click', onPopupOpenClick);
      window.util.similarWizardsList.innerHTML = '';

      window.util.setupPopup.classList.add('hidden');
      document.querySelector('.setup-similar').classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      submitButton.removeEventListener('click', onButtonClick);
      submitButton.removeEventListener('keydown', onButtonPush);
      window.util.userNameInput.removeEventListener('focus', onUserNameInputFocus);
      window.util.userNameInput.removeEventListener('blur', onUserNameInputBlur);
      window.util.wizardCoat.removeEventListener('click', onWizardCoatClick);
      window.util.wizardEyes.removeEventListener('click', onWizardEyesClick);
      window.util.wizardFireball.removeEventListener('click', onWizardFireballClick);
    };

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
     * Функция - обработчик, слушает элемент на предмет клика клавиши 27 (Escape)и возвращает выполнение функции closePopup
     * @param {object} evt объект события, который передаётся первым аргументом в обработчик
     */
    var onPopupEscPress = function (evt) {
      if ((evt.keyCode === window.util.ESC_KEYCODE) && (isFocus === false)) {
        onCloseSetupClick();
      }
    };

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
    openSetup.addEventListener('click', onPopupOpenClick);

    openSetup.addEventListener('keydown', onPopupOpenPush);

  })();

})();


