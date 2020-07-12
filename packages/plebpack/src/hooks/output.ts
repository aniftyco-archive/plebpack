import { basename, dirname, resolve } from 'path';
import { Output as WebpackOutputOptions } from 'webpack';
import { Hook, Plebpack } from '../plebpack';

export function output(file: string): Hook;
export function output(options: WebpackOutputOptions): Hook;
export function output(options: any): Hook {
  return (plebpack: Plebpack): void => {
    if (typeof options === 'string') {
      options = {
        filename: basename(options),
        path: resolve(process.cwd(), dirname(options)),
      };
    }

    plebpack.setOutput(options);
  };
}
