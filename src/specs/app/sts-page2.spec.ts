/// <reference path="../test-utils/index.ts" />

describe('component:sts-page2', () => {
  function create(): StsPage2 {
    return TestUtils.createComponent<StsPage2>('sts-page2');
  };

  it('should be a polymer animal', () => {
    const sut = create();
    expect(sut).toBeDefined();
    expect(sut.$).toBeDefined();
  });
});