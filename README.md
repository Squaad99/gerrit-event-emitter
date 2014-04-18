# gerrit-event-emitter [![Build Status](https://secure.travis-ci.org/shiwano/gerrit-event-emitter.png?branch=master)](http://travis-ci.org/shiwano/gerrit-event-emitter)

A thin wrapper of [gerrit-stream](https://github.com/fivetanley/gerrit-stream) which inherits from [EventEmitter2](https://github.com/hij1nx/EventEmitter2).

## Getting Started
Install the module with: `npm install gerrit-event-emitter`

```javascript
var GerritEventEmitter = require('gerrit-event-emitter').GerritEventEmitter,
    gerritEventEmitter = new GerritEventEmitter('gerrit.example.com', 29418);

gerritEmitter.on('patchsetCreated', function(eventData) {
  // do something.
});
```

## Documentation

The `GerritEventEmitter` class inherited from [EventEmitter2](https://github.com/hij1nx/EventEmitter2).
So you can use EventEmitter2 methods basically.

And, available event names here:

* `patchsetCreated`
* `changeAbandoned`
* `changeRestored`
* `changeAbandoned`
* `changeRestored`
* `changeMerged`
* `commentAdded`
* `refUpdated`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2014-04-18   v0.1.0   First release.

## License
Copyright (c) 2014 Shogo Iwano
Licensed under the MIT license.
