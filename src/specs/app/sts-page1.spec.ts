/// <reference path="../test-utils/index.ts" />

describe('component:sts-page2', () => {
  function create(): StsPage1 {
    return TestUtils.createComponent<StsPage1>('sts-page1');
  };

  it('should be a polymer animal', () => {
    const sut = create();
    expect(sut).toBeDefined();
    expect(sut.$).toBeDefined();
  });
});