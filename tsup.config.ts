import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/schemas/**/*.ts', 'src/types/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
  skipNodeModulesBundle: true,
  outExtension: ({ format }) => ({
    js: format === 'cjs' ? '.cjs' : '.mjs',
  }),
  target: 'esnext',
  external: ['drizzle-kit', 'drizzle-orm', 'pg'],
  treeshake: true,
  bundle: true,
}));
