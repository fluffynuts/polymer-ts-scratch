describe('sts-entry', () => {
    let toRemove = [];
    afterEach(() => {
        var workOn = toRemove;
        toRemove = [];
        workOn.forEach(el => {
            el.parentElement.removeChild(el);
        });
    });
    function create(): StsEntry {
        var container = document.createElement('div');
        var sut = document.createElement('sts-entry');
        container.appendChild(sut);
        document.body.appendChild(container);
        toRemove.push(container);
        return sut as StsEntry;
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
