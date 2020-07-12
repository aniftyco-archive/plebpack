import { resolve } from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import config from '../../packages/plebpack/src';
import { Plebpack } from '../../packages/plebpack/src/plebpack';

describe('index', () => {
  it('should return a function', () => {
    expect(config).toBeInstanceOf(Function);
  });

  it('should have a use method exposed to it', () => {
    expect(config.use).toBeInstanceOf(Function);
  });

  it('should return configuration object', () => {
    config.use((plebpack: Plebpack) => {
      plebpack.addEntry('foo', 'path/to/foo.js');
      plebpack.setOutput({ filename: 'bar', path: 'path/to/bar.js' });
    });

    const webpackConfig: WebpackConfiguration = {
      context: resolve(__dirname, '../../'),
      mode: 'development',
      entry: {
        foo: 'path/to/foo.js',
      },
      output: {
        filename: 'bar',
        path: 'path/to/bar.js',
      },
    };

    const result = config('development');

    expect(result).toEqual(expect.objectContaining(webpackConfig));
  });
});
