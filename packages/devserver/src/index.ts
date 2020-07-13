import { Plebpack } from 'plebpack';

type DevServerOptions = {};

export default function devServer(options: DevServerOptions = {}) {
  return (plebpack: Plebpack): void => {
    const output = plebpack.getOutput();

    plebpack.merge({
      devServer: {
        contentBase: output.path,
        ...options,
      },
    });
  };
}
