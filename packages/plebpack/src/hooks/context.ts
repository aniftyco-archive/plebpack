import { Plebpack } from '../plebpack';
import { Hook } from '../plebpack';

export function context(path: string): Hook {
  return (plebpack: Plebpack): void => {
    plebpack.setContext(path);
  };
}
