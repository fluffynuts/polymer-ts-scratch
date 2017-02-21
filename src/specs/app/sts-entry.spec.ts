describe('sts-entry', () => {
    let toRemove = [];
    afterEach(() => {
        // toRemove.forEach(el => {
        //     el.parentElement.removeChild(el);
        // });
    });
    function create(): StsEntry {
        var container = document.createElement('div');
        var sut = document.createElement('sts-entry');
        container.appendChild(sut);
        document.body.appendChild(container);
        toRemove.push(container);
        return sut as StsEntry;
    };
    it('should be addable', () => {
        var sut = create();
        debugger;
        expect(sut).toBeDefined();
    });
});
