import {flatten} from 'lodash';
import {Configurator} from './configurator';

export interface IOutputOptions {
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
  addPlugin(plugin: any, priority: number): void;
  addLoader(loader: any): void;
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
  public plugins: Set<{plugin: any; priority: number}> = new Set();
  public loaders: Set<any> = new Set();
  public extensions: Set<string> = new Set();
  public resolvePaths: Set<string> = new Set();
  public externals: Map<string, string> = new Map();
  public config: object = {};

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

  public addPlugin(plugin: any, priority: number = 0): void {
    this.plugins.add({plugin, priority});
  }

  public addLoader(loader: any): void {
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
      this.config = config(this.config);
    } else {
      this.config = {
        ...(this.config as any),
        ...(config as any),
      };
    }
  }

  public toConfig(mode: string, options: object): object {
    this.hooks.forEach((hook: Function) => hook(this));

    return new Configurator(this, mode, options).build();
  }
}
