interface PropertyMatcher {
  name: string;
  value: any;
  type: any;
}
declare namespace jasmine {
  interface Matchers<T> {
    toHavePolymerProperty(matcher: PropertyMatcher | string): void;
  }
}
