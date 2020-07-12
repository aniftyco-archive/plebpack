import { basename, dirname, resolve } from 'path';
import { OutputOptions, Plebpack } from '../plebpack';

export default (options: OutputOptions | string): Function => (
  plebpack: Plebpack
): void => {
  if (typeof options === 'string') {
    options = {
      filename: basename(options),
      path: resolve(process.cwd(), dirname(options)),
    };
  }

  plebpack.setOutput(options);
};
