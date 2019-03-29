import {resolve} from 'path';
import {IPlebpack} from '../plebpack';

export default (name: string, path?: string): Function => (plebpack: IPlebpack): void => {
  if (!path) {
    path = name;
    name = 'bundle';
  }

  plebpack.addEntry(name, resolve(plebpack.context, path));
};
