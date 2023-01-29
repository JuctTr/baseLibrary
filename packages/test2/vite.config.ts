import { mergeConfig } from 'vite'
import type { UserConfigExport } from 'vite'
import { readFileSync } from 'fs'
import dts from 'vite-plugin-dts'
import { createConfig } from '../../shared/vite.config.base'
// import util from 'node:util'

const baseConfig = createConfig({
    pkg: JSON.parse(
        readFileSync(new URL('./package.json', import.meta.url), 'utf8')
    )
})

const currentConfig = mergeConfig(baseConfig, {
    build: {
        rollupOptions: {
            input: './src/index.ts',
            output: [
                {
                    format: 'cjs',
                    exports: 'named',
                    entryFileNames: '[name].js',
                    footer: 'module.exports = Object.assign(exports.default, exports);',
                    sourcemap: true,
                    // 让打包目录和我们目录对应
                    preserveModules: true,
                    dir: 'cjs'
                },
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    sourcemap: true,
                    // 让打包目录和我们目录对应
                    preserveModules: true,
                    dir: 'es',
                    plugins: [emitModulePackageFile()]
                }
            ]
        }
    },
    plugins: [
        dts({
            outputDir: 'es'
        }),
        dts({
            outputDir: 'cjs'
        })
    ]
})

export function emitModulePackageFile() {
    return {
        name: 'emit-module-package-file',
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'package.json',
                source: `{"type":"module"}`
            })
        }
    }
}

// console.log(util.inspect(config, true, 5, true))

export default currentConfig
