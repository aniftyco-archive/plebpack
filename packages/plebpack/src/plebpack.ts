import flatten from 'lodash.flatten';
import {Output as IWebpackOutputOptions, Plugin, RuleSetRule} from 'webpack';
import {Configuration} from './configuration';

export interface IOutputOptions extends IWebpackOutputOptions {
  path: string;
  filename: string;
}

export interface IPlebpack {
  context: string;
  use(...hooks: Function[]): void;
  addEntry(name: string, path: string): void;
  setOutput(options: IOutputOptions): void;
  setContext(context: string): void;
  addAlias(alias: string, path: string): void;
  addPlugin(plugin: Plugin, priority: number): void;
  addLoader(loader: RuleSetRule): void;
  addExtension(extension: string): void;
  addExternal(name: string, path: string): void;
  addResolvePath(path: string): void;
  merge(config: object | Function): void;
}

export class Plebpack implements IPlebpack {
  private hooks: Set<Function> = new Set();
  public context: string = process.cwd();
  public entries: Map<string, string> = new Map();
  public output?: IOutputOptions;
  public aliases: Map<string, string> = new Map();
  public plugins: Set<{plugin: Plugin; priority: number}> = new Set();
  public loaders: Set<RuleSetRule> = new Set();
  public extensions: Set<string> = new Set();
  public resolvePaths: Set<string> = new Set();
  public externals: Map<string, string> = new Map();
  public configs: Set<Function> = new Set();

  constructor(public pkg?: string | null) {}

  public use(...hooks: Function[]): void {
    flatten(hooks).forEach((hook: Function) => {
      this.hooks.add(hook);
    });
  }

  public addEntry(name: string, path: string): void {
    if (this.entries.has(name)) {
      throw new Error(`Duplicate name "${name}". Entries must be unique.`);
    }

    this.entries.set(name, path);
  }

  public setOutput(output: IOutputOptions) {
    this.output = output;
  }

  public setContext(context: string) {
    this.context = context;
  }

  public addAlias(alias: string, path: string): void {
    this.aliases.set(alias, path);
  }

  public addPlugin(plugin: Plugin, priority: number = 0): void {
    this.plugins.add({plugin, priority});
  }

  public addLoader(loader: RuleSetRule): void {
    this.loaders.add(loader);
  }

  public addExtension(extension: string): void {
    this.extensions.add(extension);
  }
  public addResolvePath(path: string): void {
    this.resolvePaths.add(path);
  }

  public addExternal(name: string, path: string): void {
    if (this.externals.has(name)) {
      throw new Error(`Duplicate name "${name}". Externals must be unique.`);
    }

    this.externals.set(name, path);
  }

  public merge(config: object | Function): void {
    if (typeof config === 'function') {
      this.configs.add(config);
    }

    this.configs.add((c: object) => ({...c, ...config}));
  }

  public toConfig(mode: string, options: object): object {
    this.hooks.forEach((hook: Function) => hook(this));

    return new Configuration(this, mode, options).build();
  }
}
