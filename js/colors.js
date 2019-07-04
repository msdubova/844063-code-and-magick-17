'use strict';

(function () {
  if (!window.globalElements.setupPopup.classList.contains('.hidden')) {
    var coatInput = window.globalElements.form.querySelector('input[name="coat-color"]');
    var eyesInput = window.globalElements.form.querySelector('input[name="eyes-color"]');
    var fireballInput = window.globalElements.form.querySelector('input[name="fireball-color"]');
    var eyesColor;
    var coatColor;

    var getRank = function (wizard) {
      var rank = 0;

      if (wizard.colorCoat === coatColor) {
        rank = +2;
      }
      if (wizard.colorEyes === eyesColor) {
        rank = +1;
      }
      return rank;
    };


    var namesComparator = function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    };

    /**
     * Функция при загрузке данных и смене цвета будет фильтровать имеющиеся у нас данные
     */
    var updateWizards = function () {
      //
      // var sameCoatAndEyesAndFireWizards = window.wizards.filter(function (it) {
      //   return it.colorCoat === coatColor &&
      //     it.colorEyes === eyesColor && it.colorFireball === fireballColor;
      // });
      //
      // var sameCoarAndEyesWizards = window.wizards.filter(function (it) {
      //   return it.colorCoat === coatColor &&
      //     it.colorEyes === eyesColor;
      // });
      //
      // var sameCoatWizards = window.wizards.filter(function (it) {
      //   return it.colorCoat === coatColor;
      // });
      //
      // var sameEyesWizards = window.wizards.filter(function (it) {
      //   return it.colorEyes === eyesColor;
      // });
      //
      // var filteredWizards = sameCoatAndEyesAndFireWizards;
      // filteredWizards = filteredWizards.concat(sameCoarAndEyesWizards);
      // filteredWizards = filteredWizards.concat(sameCoatWizards);
      // filteredWizards = filteredWizards.concat(sameEyesWizards);
      // filteredWizards = filteredWizards.concat(window.wizards);
      //
      // var uniqueWizards = filteredWizards.filter(function (it, i) {
      //   return filteredWizards.indexOf(it) === i;
      // });

      // window.createWizards(uniqueWizards);

      window.createWizards(window.wizards.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
    };

    var setRandomCoat = function (item, array, input) {
      input.value = window.util.generateStyle(array);
      item.style.fill = input.value;
      coatColor = input.value;
    };

    var setRandomEyes = function (item, array, input) {
      input.value = window.util.generateStyle(array);
      item.style.fill = input.value;
      eyesColor = input.value;
    };

    /**
     * Функция присваивает случайный стиль background элементу
     * @param {object} item
     * @param {string[]} array
     * @param {object} input
     * @param {string} key
     */
    var setRandomBackground = function (item, array, input) {
      input.value = window.util.generateStyle(array);
      item.style.background = input.value;
    };

    /**
     * Функция-обработчик, срабатывает при клике на пальто мага в открытом попапе и запустит установку случайного цвета пальто
     */
    var onWizardCoatClick = function () {
      setRandomCoat(window.globalElements.wizardCoat, window.constants.COAT_COLORS, coatInput);
      window.debounce(updateWizards);
    };

    /**
     * Функция-обработчик, срабатывает при клике на глаза мага в открытом попапе и запутит установку случайного цвета глаз мага
     */
    var onWizardEyesClick = function () {
      setRandomEyes(window.globalElements.wizardEyes, window.constants.EYES_COLORS, eyesInput);
      window.debounce(updateWizards);
    };

    /**
     * Функция-обработчик, срабатывает при клике на фаербол мага в открытом попапе и запутит установку случайного цвета фаербола мага
     */
    var onWizardFireballClick = function () {
      setRandomBackground(window.globalElements.wizardFireball, window.constants.FIREBALL_COLORS, fireballInput);
      window.debounce(updateWizards);
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
