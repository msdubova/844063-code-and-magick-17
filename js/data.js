'use strict';

(function () {
  window.wizards = [];

  window.onSuccess = function (data) {
    window.wizards = data;
    window.createWizards(window.wizards);
  };

  window.onFail = function (errorNotification) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: auto; padding: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); position: absolute;  font-size: inherit; text-align: center;   background-color: tomato;';

    switch (errorNotification) {
      case 300:
        node.textContent = 'Multiple Choice';
        break;
      case 301:
        node.textContent = 'Moved Permanently';
        break;
      case 307:
        node.textContent = 'Temporary Redirect';
        break;
      case 400:
        node.textContent = 'Bad Request';
        break;
      case 401:
        node.textContent = 'Access denied';
        break;
      case 404:
        node.textContent = 'Not found';
        break;
      case 500:
        node.textContent = 'Internal Server Error';
        break;
      default:
        node.textContent = 'Request status: ' + status;
    }
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
