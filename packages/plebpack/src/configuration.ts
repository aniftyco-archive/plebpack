import FriendlyErrors from 'friendly-errors-webpack-plugin';
import {
  Output,
  Plugin,
  RuleSetRule,
  Configuration as WebpackConfiguration,
} from 'webpack';
import { Plebpack } from './plebpack';

export type ConfigurationMode = 'development' | 'production' | 'none';

export class Configuration {
  constructor(
    protected config: Plebpack,
    protected mode: ConfigurationMode,
    protected options: object
  ) {
    this.config.addPlugin((new FriendlyErrors() as unknown) as Plugin);
  }

  private entry() {
    const entries = this.config.getEntries();

    if (entries.size < 1) {
      throw new Error('No entry specified.');
    }

    const entry: any = {};

    entries.forEach((path: string, name: string) => {
      entry[name] = path;
    });

    return entry;
  }

  private output() {
    const output: Output | undefined = this.config.getOutput();

    if (!output) {
      throw new Error('No output specified.');
    }

    return output;
  }

  private rules() {
    const loaders: RuleSetRule[] = [];

    this.config.getLoaders().forEach((loader) => {
      loaders.push(loader);
    });

    return loaders;
  }

  private plugins() {
    const plugins: {
      plugin: Plugin;
      priority: number;
      position?: number;
    }[] = [];

    this.config.getPlugins().forEach((plugin) => {
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
      .map((plugin) => plugin.plugin) as Plugin[];
  }

  private extensions() {
    const extensions: string[] = [];

    this.config.getExtensions().forEach((extension) => {
      extensions.push(extension);
    });

    return extensions;
  }

  private aliases(): any {
    const aliases: any = {};

    this.config.getAliases().forEach((path: string, name: string) => {
      aliases[name] = path;
    });

    return aliases;
  }

  private externals(): any {
    const externals: any = {};

    this.config.getExternals().forEach((path: string, name: string) => {
      externals[name] = path;
    });

    return externals;
  }

  private modules(): string[] {
    const modules: string[] = [];

    this.config.getResolvePaths().forEach((path) => {
      modules.push(path);
    });

    return modules;
  }

  public build(): WebpackConfiguration {
    let config: WebpackConfiguration = {
      context: this.config.context,
      mode: this.mode || 'development',
      devtool: 'source-map',
      entry: this.entry(),
      output: this.output(),
      module: {
        rules: this.rules(),
      },
      plugins: this.plugins(),
      performance: {
        hints: false,
      },
      resolve: {
        extensions: this.extensions(),
        alias: this.aliases(),
        modules: this.modules(),
      },
      externals: this.externals(),
    };

    if (this.mode === 'development') {
      config.devtool = 'inline-source-map';
    }

    this.config.getConfigs().forEach((callback: Function) => {
      config = callback(config);
    });

    console.log(config);

    return config;
  }
}
