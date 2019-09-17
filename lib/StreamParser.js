'use strict';

const devnull = require('dev-null');
const stream = require('stream');
const util = require('util');

const Transform = stream.Transform;

const StreamParser = function(options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.transitions) {
    throw new Error('Transitions are missing.');
  }
  if (!options.startWithState) {
    throw new Error('Start State is missing.');
  }

  Transform.call(this, options);

  this.currentState = options.startWithState;
  this.transitions = options.transitions;

  this.pipe(devnull());
};

util.inherits(StreamParser, Transform);

// eslint-disable-next-line no-underscore-dangle
StreamParser.prototype._transform = function(chunk, encoding, callback) {
  this.buffer = chunk;

  this.runCurrentState();

  callback();
};

StreamParser.prototype.runCurrentState = function() {
  return this.transitions[this.currentState].call(this, this.buffer);
};

StreamParser.prototype.done = function(options) {
  options = options || {};

  this.currentState = options.nextState || this.currentState;
  this.buffer = this.buffer.slice(options.bytesHandled || this.buffer.length);
  if (this.buffer.length > 0) {
    this.runCurrentState();
  }
};

module.exports = StreamParser;
