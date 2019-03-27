import src from '../../packages/plebpack/src';

describe('index', () => {
  it('should return a function', () => {
    expect(src).toBeInstanceOf(Function);
  });
});
