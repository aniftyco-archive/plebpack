import flatten from 'lodash.flatten';
import { Output as WebpackOutputOptions, Plugin, RuleSetRule } from 'webpack';
import { Configuration, ConfigurationMode } from './configuration';
import { Hook } from './hook';

export type PluginSet = {
  plugin: Plugin;
  priority: number;
  position?: number;
};

export class Plebpack {
  private readonly hooks: Set<Hook> = new Set();
  private context: string = process.cwd();
  private entries: Map<string, string> = new Map();
  private output?: WebpackOutputOptions;
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

  public use(...hooks: Hook[]): void {
    flatten(hooks).forEach((hook: Hook) => {
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
    if (this.entries.size === 0) {
      throw new Error('No entry specified.');
    }

    const entries: Record<string, any> = {};

    this.entries.forEach((path: string, name: string) => {
      entries[name] = path;
    });

    return entries;
  }

  public setOutput(output: WebpackOutputOptions) {
    this.output = output;
  }

  public getOutput() {
    if (!this.output) {
      throw new Error('Not output specified.');
    }

    return this.output;
  }

  public setContext(context: string) {
    this.context = context;
  }

  public getContext() {
    return this.context;
  }

  public addAlias(alias: string, path: string): void {
    this.aliases.set(alias, path);
  }

  public getAliases() {
    const aliases: Record<string, any> = {};

    this.aliases.forEach((path: string, name: string) => {
      aliases[name] = path;
    });

    return aliases;
  }

  public addPlugin(plugin: Plugin, priority: number = 0): void {
    this.plugins.add({ plugin, priority });
  }

  public getPlugins() {
    const plugins: PluginSet[] = [];

    this.plugins.forEach((plugin) => {
      plugins.push(plugin);
    });

    return plugins
      .map((plugin, position) => ({ ...plugin, position }))
      .sort((a, b) => {
        // Keep the original order if two plugins have the same priority
        if (a.priority === b.priority) {
          return (a.position = b.position);
        }

        // A plugin with a priority of -10 will be placed after one
        // that has a priority of 0.
        return b.priority - a.priority;
      })
      .map((plugin): Plugin => plugin.plugin);
  }

  public addLoader(loader: RuleSetRule): void {
    this.loaders.add(loader);
  }

  public getLoaders() {
    const loaders: RuleSetRule[] = [];

    this.loaders.forEach((loader) => {
      loaders.push(loader);
    });

    return loaders;
  }

  public addExtension(extension: string): void {
    this.extensions.add(extension);
  }

  public getExtensions() {
    const extensions: string[] = [];

    this.extensions.forEach((extension) => {
      extensions.push(extension);
    });

    return extensions.length > 0 ? extensions : undefined;
  }

  public addResolvePath(path: string): void {
    this.resolvePaths.add(path);
  }

  public getResolvePaths() {
    const resolvePaths: string[] = [];

    this.resolvePaths.forEach((path) => {
      resolvePaths.push(path);
    });

    return resolvePaths.length > 0 ? resolvePaths : undefined;
  }

  public addExternal(name: string, path: string): void {
    if (this.externals.has(name)) {
      throw new Error(`Duplicate name "${name}". Externals must be unique.`);
    }

    this.externals.set(name, path);
  }

  public getExternals() {
    const externals: Record<string, any> = {};

    this.externals.forEach((path: string, name: string) => {
      externals[name] = path;
    });

    return externals;
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

  public config(mode: ConfigurationMode): Record<string, any> {
    this.hooks.forEach((hook: Hook) => hook(this));

    const config = new Configuration(this, mode);

    return config.exec();
  }
}
