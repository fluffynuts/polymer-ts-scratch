/// <reference path="./html-matchers.d.ts" />
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
      toHaveAttr: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return doAssertions(() => {
              assert(actual, 'actual is null or undefined');
              const attributeValue = actual.getAttribute(expected.name);
              assert(attributeValue === expected.value, [
                'expected value of attribute [',
                expected.name,
                '] to equal [',
                expected.value,
                '] but was [',
                attributeValue,
                ']',
              ].join(''));
            });
          }
        };
      }
    });
  });
})();
