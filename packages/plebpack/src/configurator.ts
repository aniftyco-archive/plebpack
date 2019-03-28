import {Plebpack} from './plebpack';

export class Configurator {
  constructor(protected config: Plebpack, protected mode: string, protected options: object) {}

  private entry(): any {
    const entry: any = {};

    this.config.entries.forEach((path: string, name: string) => {
      entry[name] = path;
    });

    return entry;
  }

  private rules(): object[] {
    const loaders: object[] = [];

    this.config.loaders.forEach((loader) => {
      loaders.push(loader);
    });

    return loaders;
  }

  private plugins(): any[] {
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

  public build(): object {
    const config = {
      context: this.config.context,
      mode: this.mode || 'development',
      devtool: 'source-map',
      entry: this.entry(),
      output: this.config.output,
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

    return config;
  }
}
