module.exports = (babel) => {
  babel.cache(false);

  return {
    presets: [
      '@babel/typescript',
      [
        '@babel/env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: ['add-module-exports'],
  };
};
