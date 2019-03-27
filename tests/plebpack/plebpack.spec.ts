import {Plebpack} from '../../packages/plebpack/src/plebpack';

describe('Plebpack', () => {
  it('should be an instance of Plebpack', () => {
    const plebpack = new Plebpack();

    expect(plebpack).toBeInstanceOf(Plebpack);
  });
});
