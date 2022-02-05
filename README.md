# @sealsystems/streamparser


@sealsystems/streamparser is a generic stream parser for Node.js.

This is module parses streams in a generic way. You can add your own transitions and emit events while the stream is parsed.

## Installation

```bash
$ npm install @sealsystems/streamparser
```

## Quick start

First you need to integrate @sealsystems/streamparser into your application.

```javascript
const StreamParser = require('@sealsystems/streamparser');
```

To use the generic stream parser you may use this code block. Put all your transition code into a directory `transitions` and require all of them with `requireAll`. Tell the stream parser which state to start with.

```javascript
const path = require('path');

const requireAll = require('require-all');
const StreamParser = require('@sealsystems/streamparser');

const transitions = requireAll(path.join(__dirname, 'transitions'));

const streamparser = new StreamParser({ transitions, startWithState: 'ready' });

streamparser.on('myEvent', (data) => {
  console.log('myEvent:', data);
  done();
});
```

In each of your transitions you have to export one function named as you like (e.g transition). Within this function you have to call the `done` function with an object that contains at least the next state and if you have handled bytes the number of handled bytes. In the case that you are in the last state you must not pass an object to the done function.

```javascript
const ready = function (data) {
  this.emit('myEvent', data);
  this.done({
    nextState: 'myNextState',
    bytesHandled: 1
  });
};

module.exports = ready;
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
