import {IPlebpack} from 'plebpack';

export default (): Function => (plebpack: IPlebpack): void => {
  console.log(plebpack);
};
