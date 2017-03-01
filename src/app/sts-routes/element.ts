@component('sts-routes')
class StsRoutes extends polymer.Base {
  constructor() {
    super();
  }
  _equals(val1, val2): boolean {
    return val1 === val2;
  }
}

StsRoutes.register();
