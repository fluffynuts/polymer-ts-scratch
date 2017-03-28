@component('sts-page1')
class StsPage1 extends polymer.Base {
  public created;

  ready(): void {
    console.log("sts page 1 ready");
  }
  
  attached(): void {
    this.created = new Date();
    console.log("sts page 1 attached");
  }
}

StsPage1.register();
