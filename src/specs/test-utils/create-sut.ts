namespace TestUtils {
  let toRemove: HTMLElement[] = [];
  afterEach(() => {
    const remove = toRemove;
    toRemove = [];
    remove.forEach(el => {
      const parent = el.parentElement;
      if (parent) {
        parent.removeChild(el);
      }
    });
  });
  export function createEl(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  export function createComponent<T>(tag: string): T {
    const
      container = createEl('div'),
      result = createEl(tag);
    container.appendChild(result);
    toRemove.push(result);
    return (result as any) as T;
  }
}
