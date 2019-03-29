import {resolve} from 'path';
import config from '../../packages/plebpack/src';

describe('index', () => {
  it('should return a function', () => {
    expect(config).toBeInstanceOf(Function);
  });

  it('should have a use method exposed to it', () => {
    expect(config.use).toBeInstanceOf(Function);
  });

  it('should return configuration object', () => {
    const result = config('development');

    expect(result).toMatchObject({
      context: resolve(__dirname, '../../'),
      mode: 'development',
    });
  });
});
