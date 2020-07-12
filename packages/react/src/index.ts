import { Plebpack } from 'plebpack';

export default (): Function => (plebpack: Plebpack): void => {
  console.log(plebpack);
};
