'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var TEXT_WIDTH = 40;
var barHeight = 150;
var textX = CLOUD_X + GAP * 2;
var textY = CLOUD_Y + GAP * 2;

/**
 * Функция отрисовывает облако сообщения
 * @param {object} ctx контекст рисования
 * @param {number} x Координата X верхнего левого угла прямоугольника
 * @param {number} y Координата Y верхнего левого угла прямоугольника
 * @param {string} color Цвет заливки прямоугольника
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Функция находит максимальное значение среди результатов игроков
 * @param {object} arr Массив с результатами игры
 * @return {number} maxElement  - наибольшее числовое значение среди результатов
 */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
 * Функция возращает результат конкатенции введенных значений и элементов строки в одно значение hsl()
 * @param {number} h hue - значение на цветовом колесе
 * @param {number} s saturation - насыщенность
 * @param {number} l lighness - уровень света
 * @return {string} resultHSL  - сконкатерированная строка цвета
 */
var generateHSLString = function (h, s, l) {
  var resultHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  return resultHSL;
};

/**
 * Функция возращает значение hsl() при кастомизированных параметрах h и l. А параметр s функция присавивает произвольно
 * @param {number} h установленное пользователем значение на цветовом колесе
 * @param {number} l установленное пользователем значение света
 * @return {string} resultHSL возвращает вызов функции и как его тут прописать? редкатор предлагает заноко расписать тут эту функцию
 */
var generateRandomSaturationString = function (h, l) {
  var randomS = Math.round(Math.random() * 100);

  return generateHSLString(h, randomS, l);
};

/**
 * Функция отрисовывет имена участников , из результаты и согласно их результатам рендерит гистограмму
 * @param {object} ctx контекст рисования
 * @param {arr} names массив с именами игроков
 * @param {arr} times массив в результатами
 */
var renderResults = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP * 4 + (TEXT_WIDTH + 50) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    } else {
      ctx.fillStyle = generateRandomSaturationString(255, 50);
    }

    ctx.fillRect(CLOUD_X + GAP * 4 + (TEXT_WIDTH + 50) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP - GAP - ((barHeight * times[i]) / maxTime), TEXT_WIDTH, (barHeight * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 4 + (TEXT_WIDTH + 50) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP - GAP - ((barHeight * times[i]) / maxTime) - FONT_GAP);
  }
};

/**
 * Функция отрисовывает поздравительный текст в начале сообщения
 * @param {object} ctx контекст рисования
 */
var renderCongrats = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура! Вы победили', textX, textY);
  ctx.fillText('Список результатов:', textX, textY + FONT_GAP);
};

/**
 * Функция запускает 4 вышеизложенные функции и применяет на вход массивы с именами и результатами
 * @param {object} ctx контекст рисования
 * @param {arr} names массив значений имен игроков
 * @param {arr} times массив с результатами
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
  renderCongrats(ctx);
  renderResults(ctx, names, times);
};


