import { sync as pkgJson } from 'pkg-up';
import { Hook, Plebpack, ConfigurationMode } from './plebpack';
import { context } from './hooks/context';
import { entry } from './hooks/entry';
import { loader } from './hooks/loader';
import { output } from './hooks/output';
import { plugin } from './hooks/plugin';

const plebpack = new Plebpack(pkgJson());

export type Config = {
  (env?: ConfigurationMode): void;
  use: (hook: Hook) => void;
  debug: (value?: boolean) => void;
};

const config: Config = (
  env = (process.env.NODE_ENV ||
    process.env.PLEBPACK_ENV ||
    'development') as ConfigurationMode
) => {
  return plebpack.config(env);
};

config.debug = (value?: boolean) => {
  plebpack.setDebug(value || true);
};

config.use = (hook: Hook) => {
  plebpack.use(hook);
};

export { Plebpack, Hook, config, context, entry, loader, output, plugin };

export default config;
