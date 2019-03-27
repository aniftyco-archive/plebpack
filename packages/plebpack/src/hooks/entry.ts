import {IPlebpack} from '../plebpack';

export const entry = (name: string, path: string): Function => (plebpack: IPlebpack): void => {
  plebpack.addEntry(name, path);
};
