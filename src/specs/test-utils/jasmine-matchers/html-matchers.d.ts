interface HtmlAttributeMatcher {
  name: string;
  value: any;
}
declare namespace jasmine {
  interface Matchers<T> {
    toHaveAttr(matcher: HtmlAttributeMatcher): void;
  }
}
