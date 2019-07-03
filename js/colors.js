'use strict';

(function () {
  if (!window.globalElements.setupPopup.classList.contains('.hidden')) {
    var coatInput = window.globalElements.form.querySelector('input[name="coat-color"]');
    var eyesInput = window.globalElements.form.querySelector('input[name="eyes-color"]');
    var fireballInput = window.globalElements.form.querySelector('input[name="fireball-color"]');
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
      setRandomColor(window.globalElements.wizardCoat, window.constants.COAT_COLORS, coatInput);
    };

    /**
     * Функция-обработчик, срабатывает при клике на глаза мага в открытом попапе и запутит установку случайного цвета глаз мага
     */
    var onWizardEyesClick = function () {
      setRandomColor(window.globalElements.wizardEyes, window.constants.EYES_COLORS, eyesInput);
    };

    /**
     * Функция-обработчик, срабатывает при клике на фаербол мага в открытом попапе и запутит установку случайного цвета фаербола мага
     */
    var onWizardFireballClick = function () {
      setRandomBackground(window.globalElements.wizardFireball, window.constants.FIREBALL_COLORS, fireballInput);
    };
    window.globalElements.wizardCoat.addEventListener('click', onWizardCoatClick);
    window.globalElements.wizardEyes.addEventListener('click', onWizardEyesClick);
    window.globalElements.wizardFireball.addEventListener('click', onWizardFireballClick);

  } else {
    window.globalElements.wizardCoat.removeEventListener('click', onWizardCoatClick);
    window.globalElements.wizardEyes.removeEventListener('click', onWizardEyesClick);
    window.globalElements.wizardFireball.removeEventListener('click', onWizardFireballClick);
  }
})();
