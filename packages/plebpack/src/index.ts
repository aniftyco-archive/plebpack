import {sync as pkgJson} from 'pkg-up';
import {ConfigurationMode} from './configuration';
import context from './hooks/context';
import entry from './hooks/entry';
import loader from './hooks/loader';
import output from './hooks/output';
import plugin from './hooks/plugin';
import {IPlebpack, Plebpack} from './plebpack';

const plebpack = new Plebpack(pkgJson());

const config = (
  env = (process.env.NODE_ENV || process.env.PLEBPACK_ENV || 'development') as ConfigurationMode,
  options: object = {}
) => {
  return plebpack.toConfig(env, options);
};

config.use = plebpack.use.bind(plebpack);

export {IPlebpack};

export {config, context, entry, loader, output, plugin};

export default config;
