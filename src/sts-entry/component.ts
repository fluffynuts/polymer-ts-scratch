@component('sts-entry')
@template('<input type="text" on-keypress="_onKeyPress" />')
class StsEntry extends polymer.Base {
  _onKeyPress(evt): void {
    debugger;
  }
}

console.log('registering!');
StsEntry.register();