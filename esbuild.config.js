const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    minify: false,
    sourcemap: true,
    target: 'es6',
    platform: 'browser',
    loader: {
      '.ts': 'ts',
      '.json': 'json',
    },
  })
  .catch(() => process.exit(1));
