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

  describe('template tests', () => {
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
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-location'),
          result = $(appLocation).attr('route');

        expect(result).toEqual('{{route}}');
      });

      it('should use hash paths', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-location'),
          result = $(appLocation).attr('use-hash-as-path');

        expect(result).toEqual('');
      });

      it('should match view from route', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-route'),
          route = $(appLocation).attr('route'),
          pattern = $(appLocation).attr('pattern');

        expect(route).toEqual('{{route}}');
        expect(pattern).toEqual('/:view');
      });

      it('should bind view value to routeData variable', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-route'),
          data = $(appLocation).attr('data');

        expect(data).toEqual('{{routeData}}');
      });

      it('should bind remaining route value to subRoute variable', () => {
        const
          appLocation = TemplateTestUtils.findTemplateElement(info, 'app-route'),
          tail = $(appLocation).attr('tail');

        expect(tail).toEqual('{{subRoute}}');
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
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages'),
          selected = viewsContainer.getAttribute('selected');

        // TODO extract Jasmine matcher, something like expect(element).toHaveAttr('selected', '{{routeData.view}}')
        expect(selected).toEqual('{{routeData.view}}');
      });

      it('should match selected value to data-route attribute of views', () => {
        const
          viewsContainer = TemplateTestUtils.findTemplateElement(info, 'iron-lazy-pages'),
          attrForSelected = $(viewsContainer).attr('attr-for-selected');

        expect(attrForSelected).toEqual('data-route');
      });
    });

    // things to think about regarding temlate testing
    // - how are we going to handle multiple elements? A common scenario would be multiple app-route elements.
    // - do we care about element order?
  });
});