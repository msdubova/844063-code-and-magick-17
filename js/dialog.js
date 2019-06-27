'use strict';
(function () {
  var popup = document.querySelector('.setup');
  var dialogHandler = popup.querySelector('.upload');
  var popupOpen = document.querySelector('.setup-open');
  var popupClose = popup.querySelector('.setup-close');
  var defaultX = popup.style.top;
  var defaultY = popup.style.left;

  var defaultPopupCoordinates = function () {
    popup.style.top = defaultX;
    popup.style.left = defaultY;
  };

  var onDialogHandlerClick = function () {
    popup.style.top = defaultX;
    popup.style.left = defaultY;

    dialogHandler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        popup.style.top = (popup.offsetTop - shift.y) + 'px';
        popup.style.left = (popup.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (dragged) {
          var onClickPreventDefault = function (evtDrgd) {
            evtDrgd.preventDefault();
            dialogHandler.removeEventListener('click', onClickPreventDefault);
          };
          dialogHandler.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      popupClose.addEventListener('click', defaultPopupCoordinates);
    });
  };

  popupOpen.addEventListener('click', onDialogHandlerClick);

})();
