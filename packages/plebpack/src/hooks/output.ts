import {basename, dirname, resolve} from 'path';
import {IOutputOptions, IPlebpack} from '../plebpack';

export default (options: IOutputOptions | string): Function => (plebpack: IPlebpack): void => {
  if (typeof options === 'string') {
    options = {filename: basename(options), path: resolve(process.cwd(), dirname(options))};
  }

  plebpack.setOutput(options);
};
