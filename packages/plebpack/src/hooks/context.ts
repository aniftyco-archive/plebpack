import {IPlebpack} from '../plebpack';

export default (path: string): Function => (plebpack: IPlebpack): void => {
  plebpack.setContext(path);
};
