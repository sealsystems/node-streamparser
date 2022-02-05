'use strict';

const transition = function (data) {
  if (data[0] !== 2) {
    return this.emit('error', new Error('Invalid stream command.'));
  }

  this.done({
    nextState: 'waitingForPrinterName',
    bytesHandled: 1
  });
};

module.exports = transition;
