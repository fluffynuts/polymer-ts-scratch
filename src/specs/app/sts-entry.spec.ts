/// <reference path="../test-utils/index.ts" />

describe('component:sts-entry', () => {
  function create(): StsEntry {
    return TestUtils.createComponent<StsEntry>('sts-entry');
  };

  it('should be a polymer animal', () => {
    const sut = create();
    expect(sut).toBeDefined();
    expect(sut.$).toBeDefined();
  });

  it('should have a _onKeyPress function', () => {
    // todo: fix this!
    const sut = create();
    expect(sut._onKeyPress).toBeDefined();
    expect(sut._onKeyPress).toBeAFunction();
  });
});
