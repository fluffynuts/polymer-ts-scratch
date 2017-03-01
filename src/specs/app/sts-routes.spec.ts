/// <reference path="../test-utils/index.ts" />

describe('component:sts-routes', () => {
  function create(): StsRoutes {
    return TestUtils.createComponent<StsRoutes>('sts-routes');
  };

  it('should be a polymer animal', () => {
    const sut = create();
    expect(sut).toBeDefined();
    expect(sut.$).toBeDefined();
  });

  describe('_equals', () => {
    it('should be a funtion', () => {
      const sut = create();
      expect(sut._equals).toBeDefined();
      expect(typeof (sut._equals)).toBe('function');   // TODO: pull out .toBeAFunction() matcher
    });

    it('should return false when values are same type and not equal', () => {
      const sut = create();
      expect(sut._equals(1, 2)).toBe(false); // TODO: pull out .toBeFalse() matcher
    });

    it('should return false when values are different type and equal', () => {
      const sut = create();
      expect(sut._equals('1', 1)).toBe(false); // TODO: pull out .toBeFalse() matcher
    });

    it('should return true when values are same type and equal', () => {
      const sut = create();
      expect(sut._equals('hello', 'hello')).toBe(true); // TODO: pull out .toBeTrue() matcher
    });
  });

  // TODO template tests don't exist because still figuring out what on earth has to go there
});