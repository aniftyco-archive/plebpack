import flatten from 'lodash.flatten';
import { Output as WebpackOutputOptions, Plugin, RuleSetRule } from 'webpack';
import { Configuration, ConfigurationMode } from './configuration';

export type OutputOptions = WebpackOutputOptions & {
  path: string;
  filename: string;
};

export type PluginSet = {
  plugin: Plugin;
  priority: number;
};

export class Plebpack {
  private readonly hooks: Set<Function> = new Set();
  public context: string = process.cwd();
  private entries: Map<string, string> = new Map();
  private output?: OutputOptions;
  private aliases: Map<string, string> = new Map();
  private plugins: Set<PluginSet> = new Set();
  private loaders: Set<RuleSetRule> = new Set();
  private extensions: Set<string> = new Set();
  private resolvePaths: Set<string> = new Set();
  private externals: Map<string, string> = new Map();
  private configs: Set<Function> = new Set();

  constructor(private pkg?: string | null) {}

  public getPkg() {
    return this.pkg;
  }

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

  public getEntries() {
    return this.entries;
  }

  public setOutput(output: OutputOptions) {
    this.output = output;
  }

  public getOutput() {
    return this.output;
  }

  public setContext(context: string) {
    this.context = context;
  }

  public addAlias(alias: string, path: string): void {
    this.aliases.set(alias, path);
  }

  public getAliases() {
    return this.aliases;
  }

  public addPlugin(plugin: Plugin, priority: number = 0): void {
    this.plugins.add({ plugin, priority });
  }

  public getPlugins() {
    return this.plugins;
  }

  public addLoader(loader: RuleSetRule): void {
    this.loaders.add(loader);
  }

  public getLoaders() {
    return this.loaders;
  }

  public addExtension(extension: string): void {
    this.extensions.add(extension);
  }

  public getExtensions() {
    return this.extensions;
  }

  public addResolvePath(path: string): void {
    this.resolvePaths.add(path);
  }

  public getResolvePaths() {
    return this.resolvePaths;
  }

  public addExternal(name: string, path: string): void {
    if (this.externals.has(name)) {
      throw new Error(`Duplicate name "${name}". Externals must be unique.`);
    }

    this.externals.set(name, path);
  }

  public getExternals() {
    return this.externals;
  }

  public merge(config: Record<string, any> | Function): void {
    if (typeof config === 'function') {
      this.configs.add(config);
    }

    this.configs.add((c: Record<string, any>) => ({ ...c, ...config }));
  }

  public getConfigs() {
    return this.configs;
  }

  public toConfig(
    mode: ConfigurationMode,
    options: Record<string, any>
  ): Record<string, any> {
    this.hooks.forEach((hook: Function) => {
      hook(this);
    });

    return new Configuration(this, mode, options).build();
  }
}
