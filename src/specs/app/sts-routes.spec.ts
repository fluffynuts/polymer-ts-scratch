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

  describe('template', () => {
    let info: TemplateInfo;
    beforeEach(done => {
      if (info) {
        done();
        return;
      }
      TemplateTestUtils.getTemplateInfoFor('app/sts-routes/element.html').then(result => {
        info = result;
        done();
      }).catch(err => {
        throw err;
      });
    });

    describe('routing', () => {
      it('should have an app-location', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-location');

        expect(appLocation).toBeDefined();
      });

      it('should bind location to route variable', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-location');

        expect(appLocation).toHaveAttr({
          name: 'route',
          value: '{{route}}'
        });
      });

      it('should use hash paths', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-location');

        expect(appLocation).toHaveAttr({
          name: 'use-hash-as-path',
          value: ''
        });
      });

      it('should match view from route', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-route');

        expect(appLocation).toHaveAttr({
          name: 'route',
          value: '{{route}}'
        });

        expect(appLocation).toHaveAttr({
          name: 'pattern',
          value: '/:view'
        });
      });

      it('should bind view value to routeData variable', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-route');

        expect(appLocation).toHaveAttr({
          name: 'data',
          value: '{{routeData}}'
        });
      });

      it('should bind remaining route value to subRoute variable', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-route');

        expect(appLocation).toHaveAttr({
          name: 'tail',
          value: '{{subRoute}}'
        });
      });
    });

    describe('views', () => {
      it('should lazy load views', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages');

        expect(viewsContainer).toBeDefined();
      });

      it('should read selected view from routeData.view variable', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages');

        expect(viewsContainer).toHaveAttr({
          name: 'selected',
          value: '{{routeData.view}}'
        });
      });

      it('should match selected value to data-route attribute of views', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages');

        expect(viewsContainer).toHaveAttr({
          name: 'attr-for-selected',
          value: 'data-route'
        });
      });

      it('should have two views', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages'),
          actulNumberOfViews = $(viewsContainer).find('template').length;

        expect(actulNumberOfViews).toEqual(2);
      });

      it('should have page1 view', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages'),
          view = TemplateTestUtils.findChild(viewsContainer, 'template[data-route="page1"]');

        expect(view).toBeDefined();
        expect(view).toHaveAttr({
          name: 'is',
          value: 'iron-lazy-page'
        });
      });

      it('should have page2 view', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages'),
          view = TemplateTestUtils.findChild(viewsContainer, 'template[data-route="page2"]');

        expect(view).toBeDefined();
        expect(view).toHaveAttr({
          name: 'is',
          value: 'iron-lazy-page'
        });
      });
    });

    // things to think about regarding temlate testing
    // - how are we going to handle multiple elements? A common scenario would be multiple app-route elements.
    // - do we care about element order?
  });
});