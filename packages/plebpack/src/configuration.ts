import FriendlyErrors from 'friendly-errors-webpack-plugin';
import { Plugin, Configuration as WebpackConfiguration } from 'webpack';
import { Plebpack } from './plebpack';

export type ConfigurationMode = 'development' | 'production' | 'none';

export class Configuration {
  constructor(private config: Plebpack, private mode: ConfigurationMode) {
    this.config.addPlugin((new FriendlyErrors() as unknown) as Plugin);
  }

  public exec(): WebpackConfiguration {
    let config: WebpackConfiguration = {
      context: this.config.getContext(),
      mode: this.mode || 'development',
      devtool: 'source-map',
      entry: this.config.getEntries(),
      output: this.config.getOutput(),
      module: {
        rules: this.config.getLoaders(),
      },
      plugins: this.config.getPlugins(),
      performance: {
        hints: false,
      },
      resolve: {
        extensions: this.config.getExtensions(),
        alias: this.config.getAliases(),
        modules: this.config.getResolvePaths(),
      },
      externals: this.config.getExternals(),
    };

    if (this.mode === 'development') {
      config.devtool = 'inline-source-map';
    }

    this.config.getConfigs().forEach((callback: Function) => {
      config = callback(config);
    });

    return config;
  }
}
