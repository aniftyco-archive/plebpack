import { resolve, dirname, basename, extname } from 'path';
import { Hook, Plebpack } from '../plebpack';

export function entry(path: string): Hook;
export function entry(name: string, path?: string): Hook;
export function entry(name: any, path?: any): Hook {
  if (!path) {
    path = name;
    name = 'bundle';
  }

  return (plebpack: Plebpack): void => {
    const context = plebpack.getContext();
    const file = resolve(`${context}/${path}`);
    const filename = basename(file);
    const directory = dirname(file);
    const ext = extname(filename);

    plebpack.setContext(directory);
    plebpack.addEntry(name, `./${filename}`);
    plebpack.addExtension(ext);
  };
}
