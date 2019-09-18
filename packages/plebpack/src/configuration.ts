import FriendlyErrors from 'friendly-errors-webpack-plugin';
import {Configuration as WebpackConfiguration, Output, Plugin, RuleSetRule} from 'webpack';
import {Plebpack} from './plebpack';

export type ConfigurationMode = 'development' | 'production' | 'none';

export class Configuration {
  constructor(protected config: Plebpack, protected mode: ConfigurationMode, protected options: object) {
    this.config.addPlugin(new FriendlyErrors());
  }

  private entry(): any {
    if (this.config.entries.size < 1) {
      throw new Error('No entry specified.');
    }

    const entry: any = {};

    this.config.entries.forEach((path: string, name: string) => {
      entry[name] = path;
    });

    return entry;
  }

  private output(): Output {
    if (!this.config.output) {
      throw new Error('No output specified.');
    }

    return this.config.output;
  }

  private rules(): RuleSetRule[] {
    const loaders: RuleSetRule[] = [];

    this.config.loaders.forEach((loader) => {
      loaders.push(loader);
    });

    return loaders;
  }

  private plugins(): Plugin[] {
    const plugins: any[] = [];

    this.config.plugins.forEach((plugin, position) => {
      plugins.push({...plugin, position});
    });

    return plugins
      .sort((a, b) => {
        // Keep the original order if two plugins have the same priority
        if (a.priority === b.priority) {
          return (a.position = b.position);
        }

        // A plugin with a priority of -10 will be placed after one
        // that has a priority of 0.
        return b.priority - a.priority;
      })
      .map((plugin) => plugin.plugin);
  }

  private extensions(): string[] {
    const extensions: string[] = [];

    this.config.extensions.forEach((extension) => {
      extensions.push(extension);
    });

    return extensions;
  }

  private aliases(): any {
    const aliases: any = {};

    this.config.aliases.forEach((path: string, name: string) => {
      aliases[name] = path;
    });

    return aliases;
  }

  private externals(): any {
    const externals: any = {};

    this.config.externals.forEach((path: string, name: string) => {
      externals[name] = path;
    });

    return externals;
  }

  private modules(): string[] {
    const modules: string[] = [];

    this.config.resolvePaths.forEach((path) => {
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

    this.config.configs.forEach((callback: Function) => {
      config = callback(config);
    });

    return config;
  }
}
