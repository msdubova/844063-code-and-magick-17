'use strict';
(function () {
  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onDataGet = function () {
      var exception;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 500:
          exception = 'Bad request';
          break;
        default:
          exception = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      } if (exception) {
        onError(exception);
      }
    };
    xhr.addEventListener('load', onDataGet(xhr.response));

    xhr.addEventListener('error', function () {
      onError('Oops');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышен лимит ожидания ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onFormSubmit = function () {
      var exception;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 500:
          exception = 'Bad request';
          break;
        default:
          exception = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      } if (exception) {
        onError(exception);
      }
    };

    xhr.addEventListener('load', onFormSubmit);
    xhr.addEventListener('error', function () {
      onError('Oops');
    });
    xhr.addEventListener('timeout', function () {
      onError('Time"s up. ' + xhr.timeout);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
