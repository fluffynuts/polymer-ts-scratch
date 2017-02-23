function appendToHead(el: HTMLElement): void {
  document.getElementsByTagName('head')[0].appendChild(el);
}

function htmlImport(path: string): void {
  const link = document.createElement('link');
  link.setAttribute('rel', 'import');
  link.setAttribute('href', path);
  appendToHead(link);
}

console.log('adding elements.html');
htmlImport('/base/build/app/elements.html');

const karma = (window as any).__karma__,
      oldStart = karma.start;
karma.start = function() { /* do nothing, on purpose */ };

window.document.addEventListener('WebComponentsReady', function() {
  if (!polymer) {
    throw 'no polymer';
  }
  console.log('Web Components claim readiness');
  oldStart.call(karma);
});
