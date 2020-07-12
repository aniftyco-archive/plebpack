import { Plebpack } from '../plebpack';
import { Hook } from '../hook';

export function context(path: string): Hook {
  return (plebpack: Plebpack): void => {
    plebpack.setContext(path);
  };
}
