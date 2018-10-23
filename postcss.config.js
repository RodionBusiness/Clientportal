module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-cssnext': {
      warnForDuplicates: false,
    },
    'cssnano': (env === 'production')
      ? Object.assign({ reduceIdents: false }, options.cssnano)
      : false,
  }
});
