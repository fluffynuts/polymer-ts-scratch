/// <reference path="../test-utils/index.ts" />

describe('component:sts-consumer', () => {
  // TODO:
  // 1) find a way to knock out the script tag -- we really only care about the template
  //    and the script is loading with errors because polymer itself isn't included yet
  // 2) if the above doesn't fix the issue, find out what kills phantom (but not chrome)
  //    and hax it
  //  investigate:
  //    1) loading empty html file from spec area
  //    2) fetching template html
  //    3) stripping script tags
  //    4) replacing iframe html with stripped html (perhaps even strip down to the
  //        template tag itself)
  xdescribe('template test', () => {
    let doc: Document;
    beforeEach(done => {
      if (doc) {
        done();
        return;
      }
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.src = '/base/build/app/sts-consumer/index.html';
      iframe.onload = function () {
        doc = iframe.contentWindow.document;
        done();
      }
    });

    function findTemplate(doc: Document) {
      return findTemplateNode(doc.childNodes);
    }

    function findTemplateNode(nodes: NodeList) {
      let testNext: NodeList[] = [];
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]['tagName'] === 'TEMPLATE') {
          return nodes[i];
        }
        testNext.push(nodes[i].childNodes);
      }
      return testNext.reduce((acc, cur) => {
        return acc || findTemplateNode(cur);
      }, null);
    }

    it('should find the template', () => {
      var template = findTemplate(doc);
      expect(template).toBeDefined();
    });

    it('should have an sts-entry', () => {
      const
        template = findTemplate(doc),
        templateDoc$ = $(template.content),
        entry = templateDoc$.find('sts-entry');

      expect(entry).toBeDefined();
      expect(entry.length).toEqual(1);
    });

    it('should set the favorite-food attribute on the entry', () => {
      const
        template = findTemplate(doc),
        templateDoc$ = $(template.content),
        entry = templateDoc$.find('sts-entry');

      const result = entry.attr('favorite-food');

      expect(result).toEqual('beer');
    });

  });
});
