import { resolve } from 'path';
import { Plebpack } from '../plebpack';

export default (name: string, path?: string): Function => (
  plebpack: Plebpack
): void => {
  if (!path) {
    path = name;
    name = 'bundle';
  }

  plebpack.addEntry(name, resolve(plebpack.context, path));
};
