const
  karmaBaseBuild = '/base/build',
  jqueryPath = [karmaBaseBuild, 'bower_components/jquery/dist/jquery.min.js'].join('/');

namespace TemplateTestUtils {
  export function findTemplate(nodes: NodeList): Node {
    const checkNext = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i]['tagName'] === 'TEMPLATE') {
        return nodes[i];
      }
      if (nodes[i].childNodes.length) {
        checkNext.push(nodes[i].childNodes);
      }
    }
    return checkNext.reduce((acc, cur) => {
      return acc || findTemplate(cur);
    }, null);
  }

  export function getTemplateInfoFor(relativePath: string): Promise<TemplateInfo> {
    const
      path = [karmaBaseBuild, relativePath].join('/'),
      result = {} as TemplateInfo;
    return new Promise((resolve, reject) => {
      $.get(path).then(html => {
        $.get(jqueryPath).then(jqueryScript => {
          jsdom.env({
            html: html,
            src: [jqueryScript],
            done: (err, _window) => {
              const _$ = (_window as any).$;
              if (!_$) {
                throw `jQuery not loaded into ${path}`;
              }
              result.window = _window as WindowWithJquery;
              result.document = _window.document;
              result.jQuery = _$;
              if (err && err.length) {
                throw `failed to jsdom: ${err}`;
              }
              const template = findTemplate(_window.document.childNodes);
              if (!template) {
                throw `can't find <template> in ${path}`;
              }
              result.template$ = _$(_$(template).html());
              resolve(result);
            }
          });
        }).fail(err => {
          reject(`failed to get ${jqueryPath}: ${err}`);
        });
      }).fail(err => {
        reject(`failed to get ${path}: ${err}`);
      });
    });
  }

  export function findTemplateElement(info: TemplateInfo, tagName: string) {
    return findElement(info.template$, tagName);
  }

  export function findChild(info: TemplateInfo, parent: Node, selector: string) {
    const
      unwrappedParent = unwrapTemplateElement(info, parent),
      children = unwrappedParent.find(selector);

    if (children.length === 0) {
      return undefined;
    }

    if (children.length > 1) {
      throw `found ${children.lenth} children matching ${selector}, this function only expects a single child to match`;
    }

    return children[0];
  }

  function unwrapTemplateElement(info: TemplateInfo, element: Node) {
    const htmlElement = element as HTMLElement;

    if (htmlElement.tagName === 'TEMPLATE') {
      const htmlTemplateElement = element as HTMLTemplateElement;
      const templateContent = info.jQuery(htmlTemplateElement.innerHTML);

      return info.jQuery('<div></div>').append(templateContent);
    }

    return jQuery(element);
  }

  function findElement(nodes: HTMLElement[], tag: string) {
    const toCheck = [];
    tag = tag.toUpperCase();

    for (let i = 0; i < nodes.length; i++) {  // is NOT an array
      if (nodes[i].tagName === tag) {
        return nodes[i];
      }
      const childNodes = nodes[i].childNodes;
      if (childNodes.length) {
        toCheck.push.apply(toCheck, Array.prototype.slice.apply(childNodes));
      }
    }

    if (toCheck.length) {
      return findElement(toCheck, tag);
    }
  }
}
