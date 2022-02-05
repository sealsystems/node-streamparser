'use strict';

const linefeed = 10;

const transition = function (data) {
  this.printerName = this.printerName || '';

  if (data[data.length - 1] !== linefeed) {
    this.printerName += data.toString('utf8');
    return this.done();
  }

  this.printerName += data.slice(0, -1).toString('utf8');

  this.emit('printer', this.printerName);
  this.done({ nextState: 'finished' });
};

module.exports = transition;
