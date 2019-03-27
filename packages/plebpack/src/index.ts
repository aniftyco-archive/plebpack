import {sync as pkgJson} from 'pkg-up';
import {Plebpack} from './plebpack';

const plebpack = new Plebpack(pkgJson());

const config = (env: string = process.env.NODE_ENV || 'development', options: object = {}) => {
  return plebpack.toConfig(env, options);
};

config.use = plebpack.use.bind(plebpack);

export default config;
