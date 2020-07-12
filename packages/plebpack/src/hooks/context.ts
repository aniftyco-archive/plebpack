import { Plebpack } from '../plebpack';

export default (path: string): Function => (plebpack: Plebpack): void => {
  plebpack.setContext(path);
};
