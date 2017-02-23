/// <reference path="../test-utils/index.ts" />

describe('sts-entry', () => {
    function create(): StsEntry {
        return TestUtils.createComponent<StsEntry>('sts-entry');
    };

    it('should be a polymer animal', () => {
        debugger;
        var sut = create();
        expect(sut).toBeDefined();
        expect(sut.$).toBeDefined();
    });

    it('should have a _onKeyPress function', () => {
        var sut = create();
        expect(sut._onKeyPress).toBeDefined();
        expect(typeof (sut._onKeyPress)).toBe('function');   // TODO: pull out .toBeAFunction() matcher
    });
});
