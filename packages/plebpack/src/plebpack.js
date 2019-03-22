export class Plebpack {
  constructor() {
    this.config = {};
    this.env = null;
    this.argv = null;
  }

  use(plugin) {
    if (Array.isArray(plugin)) {
      plugin.map((plugn) => plugn(this));
    } else {
      plugin(this);
    }

    return this;
  }

  setEnv(env) {
    this.env = env;

    return this;
  }

  setArgv(argv) {
    this.argv = argv;

    return this;
  }

  toConfig() {
    const config = {
      ...this.config,
      mode: this.env,
    };

    return config;
  }
}
