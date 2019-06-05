'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var TEXT_WIDTH = 40;
// var barHeight = CLOUD_HEIGHT - (GAP * 2 + FONT_GAP) - (GAP * 2 + FONT_GAP) - (GAP * 2 + FONT_GAP) - GAP - (FONT_GAP + GAP * 2); мануальный подсчет высоты по примеры ширины в демке
var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }

  return maxElement;
};

var generateHSLString = function(h, s, l) {
  var resultHSL  = 'hsl('+ h +', ' + s +'%, ' + l + '%)';
  return resultHSL;
};

var generateRandomSaturationString = function(h, l) {
  var randomS = Math.round(Math.random() * 100);

  return generateHSLString(h, randomS, l);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура! Вы победили', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP);
  var maxTime = getMaxElement(times);




  for (var i = 0; i < names.length; i++) {
    var random  =  Math.floor((Math.random() * 100) + 1) + '%';
    var randomColor = 'hsl(255, ' + random + ', 50%)';
    console.log(randomColor);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP * 4 + (TEXT_WIDTH + 50) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    } else {
      ctx.fillStyle = randomColor;
    }

    ctx.fillRect(CLOUD_X + GAP * 4 + (TEXT_WIDTH + 50) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP - GAP - ((barHeight * times[i]) / maxTime), TEXT_WIDTH, (barHeight * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 4 + (TEXT_WIDTH + 50) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP - GAP - ((barHeight * times[i]) / maxTime) - FONT_GAP);
  }
};

// Как я пыталась решить загадку с насыщенностью
//

// var random  =  Math.floor((Math.random() * 100) + 1) + '%';
// var randomColor = 'hsl(255, random, 50%)';
// Планировалось, что randomColor будет использоваться вместо blue на 48 строке
