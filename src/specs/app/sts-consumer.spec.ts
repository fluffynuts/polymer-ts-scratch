/// <reference path="../test-utils/index.ts" />

describe('component:sts-consumer', () => {
  describe('template tests', () => {
    let info: TemplateInfo;
    beforeEach(done => {
      if (info) {
        done();
        return;
      }
      TemplateTestUtils.getTemplateInfoFor('app/sts-consumer/element.html').then(result => {
        info = result;
        done();
      }).catch(err => {
        throw err;
      });
    });

    it('should have an sts-entry', () => {
      const
        entry = TemplateTestUtils.findTemplateElement(info, 'sts-entry');

      expect(entry).toBeDefined();
    });

    it('should set the favorite-food attribute on the entry', () => {
        debugger;
      const
        entry = TemplateTestUtils.findTemplateElement(info, 'sts-entry'),
        result = $(entry).attr('favorite-food');

      expect(result).toEqual('beer');
    });
  });
});
