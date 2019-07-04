'use strict';
(function () {
  var lastTimeout = null;
  window.debounce = function (cb) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb();
    }, window.constants.DEBOUNCE_INTERVAL);
  };
})();
