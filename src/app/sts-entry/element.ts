@component('sts-entry')
class StsEntry extends polymer.Base {
  @property({ type: String, value: 'cake!' })
  public favoriteFood: string;

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
