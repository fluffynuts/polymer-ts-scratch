interface HtmlAttributeMatcher {
  name: string;
  value: any;
}
declare namespace jasmine {
  interface Matchers {
    toHaveAttr(matcher: HtmlAttributeMatcher): void;
  }
}
