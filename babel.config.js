module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@utils': './src/utils',
          '@types': './src/types',
          '@config': './src/config',
          '@theme': './src/theme',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
