'use strict';

(function () {
  /**
   * Функция создает случайные стили
   * @param {[]} styles массив со стилями
   * @return {string} возвращает случайный стиль
   */
  var generateStyle = function (styles) {
    return (styles[getRandomInRange(styles)]);
  };

  /**
   * Функция создает случайное число в диапазоне ячеек массива опрокинутого в эту функцию параметром с учетом его длины
   * @param {number} arr  - принимает на вход длину массива с данными для того, чтоб вычислить длину массива и ограничить диапазон случайной выборки
   * @return {number} возвращает случайную ячейку массива из существующих в массиве
   */
  var getRandomInRange = function (arr) {
    var min = 0;
    return Math.floor(Math.random() * ((arr.length - 1) - min + 1)) + min;
  };

  window.util = {
    generateStyle: generateStyle,
    getRandomInRange: getRandomInRange
  };
})();

