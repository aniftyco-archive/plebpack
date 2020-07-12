import { resolve, dirname, basename } from 'path';
import { Plebpack } from '../plebpack';
import { Hook } from '../hook';

export function entry(path: string): Hook;
export function entry(name: string, path?: string): Hook {
  if (!path) {
    path = name;
    name = 'bundle';
  }

  return (plebpack: Plebpack): void => {
    const context = plebpack.getContext();
    const file = resolve(`${context}/${path}`);
    const filename = basename(file);
    const directory = dirname(file);

    plebpack.setContext(directory);

    plebpack.addEntry(name, `./${filename}`);
  };
}
