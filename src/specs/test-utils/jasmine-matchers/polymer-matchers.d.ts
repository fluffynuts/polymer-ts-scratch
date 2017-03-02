interface PropertyMatcher {
  name: string;
  value: any;
  type: any;
}
declare namespace jasmine {
  interface Matchers {
    toHavePolymerProperty(matcher: PropertyMatcher | string): void;
  }
}
