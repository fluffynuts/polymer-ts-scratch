interface WindowWithJquery extends Window {
  $: Function;
}

interface TemplateInfo {
  window: WindowWithJquery;
  document: Document;
  template$: any;
}

// largely snarfed from @types/jsdom
//  which ts seems quite adamant to ignore :/
//  some parts have been any'd because I ran out of fux.
interface Callback {
  (errors: Error[], window: Window): any;
}

interface EnvDocument {
  referrer?: string;
  cookie?: string;
  cookieDomain?: string;
}

interface FeatureOptions {
  FetchExternalResources?: string[] | boolean;
  ProcessExternalResources?: string[] | boolean;
  SkipExternalResources?: string | boolean;
}

interface Config {
    html?: string;
    file?: string;
    url?: string;
    scripts?: string[];
    src?: string[];
    jar?: any;
    parsingMode?: string;
    document?: EnvDocument;
    features?: FeatureOptions;
    virtualConsole?: any;
    done?: Callback;
    loaded?: Callback;
    created?: (error: Error, window: Window) => void;
}

interface JSDom {
  env(urlOrHtml: string, scripts: string, config: Config, callback?: Callback): void;
  env(urlOrHtml: string, scripts: string, callback: Callback): void;
  env(urlOrHtml: string, scripts: string[], config: Config, callback?: Callback): void;
  env(urlOrHtml: string, scripts: string[], callback: Callback): void;
  env(urlOrHtml: string, callback: Callback): void;
  env(urlOrHtml: string, config: Config, callback?: Callback): void;
  env(config: Config, callback?: Callback): void;
}

declare var jsdom: JSDom;
