import {Plebpack} from './plebpack';

const plebpack = new Plebpack();

const config = (env = process.env.NODE_ENV || 'development', argv) => {
  plebpack.setEnv(env);
  plebpack.setArgv(argv);

  return plebpack.toConfig();
};

config.use = plebpack.use.bind(plebpack);

export default config;
