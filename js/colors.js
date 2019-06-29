'use strict';

(function () {
  if (!window.util.setupPopup.classList.contains('.hidden')) {
    var coatInput = window.util.form.querySelector('input[name="coat-color"]');
    var eyesInput = window.util.form.querySelector('input[name="eyes-color"]');
    var fireballInput = window.util.form.querySelector('input[name="fireball-color"]');
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
    window.util.wizardCoat.addEventListener('click', onWizardCoatClick);
    window.util.wizardEyes.addEventListener('click', onWizardEyesClick);
    window.util.wizardFireball.addEventListener('click', onWizardFireballClick);

  } else {
    window.util.wizardCoat.removeEventListener('click', onWizardCoatClick);
    window.util.wizardEyes.removeEventListener('click', onWizardEyesClick);
    window.util.wizardFireball.removeEventListener('click', onWizardFireballClick);
  }
})();
