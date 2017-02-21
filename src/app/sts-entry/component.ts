@component('sts-entry')
class StsEntry extends polymer.Base {
  constructor() {
    super();
  }
  _onKeyPress(evt): void {
    console.log('moo!');
    debugger;
  }
}

console.log('registering!');
StsEntry.register();
