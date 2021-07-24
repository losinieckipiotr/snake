/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { esbuildPlugin } from '@web/dev-server-esbuild'
import { fromRollup } from '@web/dev-server-rollup'
import rollupReplace from '@rollup/plugin-replace'

const replace = fromRollup(rollupReplace)

export default {
  files: 'src/**/*.test.js',
  concurrency: 16,
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    exclude: ['node_modules/**', 'mocks/**', 'test/**', 'src/**/index.ts']
  },
  testRunnerHtml: testFramework => `
    <html>
      <body>
        <script type="module" src="${testFramework}"></script>
        <div id="sketchContainer"></div>
      </body>
    </html>
  `,
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true
    })
  ]
}
