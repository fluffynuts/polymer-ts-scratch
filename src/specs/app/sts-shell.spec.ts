/// <reference path="../test-utils/index.ts" />

describe('component:sts-shell', () => {
  function create(): StsShell {
    return TestUtils.createComponent<StsShell>('sts-shell');
  };

  it('should be a polymer animal', () => {
    const sut = create();
    expect(sut).toBeDefined();
    expect(sut.$).toBeDefined();
  });

  // TODO template tests don't exist because still figuring out what on earth has to go there
});