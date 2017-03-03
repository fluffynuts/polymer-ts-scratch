/// <reference path="./helpy-matchers.d.ts" />
(function () {

  function failWith(message) {
    return {
      pass: false,
      message: message
    };
  }

  function doAssertions(logicFunc) {
    try {
      logicFunc();
      return { pass: true };
    } catch (e) {
      return failWith(e.toString());
    }
  };

  function assert(...args) {
    const condition = args[0];
    if (condition) return;
    const message = (args.slice(1) || ['' + condition]).join(' ');
    throw message;
  }

  beforeAll(() => {
    jasmine.addMatchers({
      toBeAFunction: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return doAssertions(() => {
              assert(actual, 'actual is null or undefined');
              const actualType = typeof(actual);
              assert(actualType === 'function', [
                'expected ',
                actual.toString(),
                'to be a function, but found type ',
                actualType,
                'instead'
              ].join(''));
            });
          }
        };
      }
    });
  });
})();
