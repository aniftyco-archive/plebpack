module.exports = (babel) => {
  babel.cache(false);

  return {
    presets: [
      [
        '@babel/plugin-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/plugin-typescript',
    ],
    plugins: [
      ['@babel/proposal-object-rest-spread', {useBuiltIns: true}],
      ['@babel/proposal-class-properties'],
    ],
  };
};
