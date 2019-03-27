import {flatten} from 'lodash';
import {Configurator} from './configurator';

export interface IPlebpack {
  use(...hooks: Function[]): this;
  addEntry(name: string, path: string): void;
  addAlias(alias: string, path: string): void;
  addPlugin(plugin: any, priority: number): void;
  addLoader(loader: any): void;
  addExtension(extension: string): void;
  addResolvePath(path: string): void;
  merge(config: object): void;
}

export class Plebpack implements IPlebpack {
  private hooks: Set<Function> = new Set();
  protected entries: Map<string, string> = new Map();
  protected aliases: Map<string, string> = new Map();
  protected plugins: Set<{plugin: any; priority: number}> = new Set();
  protected loaders: Set<any> = new Set();
  protected extensions: Set<string> = new Set();
  protected resolvePaths: Set<string> = new Set();
  protected config: object = {};

  constructor(public pkg?: string | null) {}

  public use(...hooks: Function[]): this {
    flatten(hooks).forEach((hook: Function) => {
      this.hooks.add(hook);
    });

    return this;
  }

  public addEntry(name: string, path: string): void {
    if (this.entries.has(name)) {
      throw new Error(`Duplicate name "${name}". Entries must be unique.`);
    }

    this.entries.set(name, path);
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

  public merge(config: object): void {
    this.config = {
      ...(this.config as any),
      ...(config as any),
    };
  }

  public toConfig(env: string, options: object): object {
    this.hooks.forEach((hook: Function) => hook(this));

    return new Configurator(this, env, options).build();
  }
}
