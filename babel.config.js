module.exports = (babel) => {
  babel.cache(false);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/typescript',
    ],
    plugins: [
      ['@babel/proposal-object-rest-spread', {useBuiltIns: true}],
      ['@babel/proposal-class-properties'],
      'add-module-exports',
    ],
  };
};
