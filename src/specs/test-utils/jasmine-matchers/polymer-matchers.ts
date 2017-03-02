/// <reference path="./polymer-matchers.d.ts" />
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
    const message = (args.slice[1] || ['' + condition]).join(' ');
    throw message;
  }

  beforeAll(() => {
    jasmine.addMatchers({
      toHavePolymerProperty: function (util, customEqualityTesters) {
        // this is an artifact of how @property works wrt Polymer
        //  -> ideally, I'd rather inspect the @property,
        //  but Reflect.metadata and Reflect.decorate are mysteriously
        //  missing at runtime...
        function getPropertyNameFrom(compare) {
          return (typeof (compare) === 'string') ? compare : compare.name;
        }
        function assertValue(prop, name, expected) {
          if (!expected.value) return;  // don't have to assert a value
          assert(expected.value === prop.value, [
            'Expected value ',
            expected.value,
            'for property',
            name,
            'but got',
            prop.value
          ].join(''));
        }
        function assertType(prop, name, expected) {
          if (!expected.type) return; // don't have to assert a type;
          assert(expected.type === prop.type, [
            'Expected type:',
            expected.type,
            'for property:',
            name,
            'but got:',
            prop.type
          ].join(''));
        }
        return {
          compare: function (actual, expected) {
            return doAssertions(function () {
              const expectedName = getPropertyNameFrom(expected);
              assert(expectedName, 'no property name provided');
              assert(actual, 'actual is not defined');
              assert(actual.properties, 'actual does not have properties collection');
              const prop = actual.properties[expectedName];
              assert(prop, 'property not found: ', expectedName);
              if (expectedName === expected)
                return; // we're done: assertion was just that the property exists
              assertValue(prop, expectedName, expected);
              assertType(prop, expectedName, expected);
            });
          }
        };
      }
    });
  });
})();
