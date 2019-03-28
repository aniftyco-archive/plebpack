import {IPlebpack} from '../plebpack';

export default (loader: object): Function => (plebpack: IPlebpack): void => {
  plebpack.addLoader(loader);
};
