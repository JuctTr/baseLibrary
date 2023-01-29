import { UserConfigExport } from 'vite'
import { builtinModules } from 'module'
import dts from 'vite-plugin-dts'

export function createConfig({ pkg, external = [] }): UserConfigExport {
    const _external = Object.keys(pkg.dependencies || {})
        .concat(Object.keys(pkg.peerDependencies || {}))
        .concat(builtinModules)
        .concat(external)
    return {
        build: {
            // minify: false,
            lib: {
                entry: './index.ts',
                name: pkg.name
            },
            rollupOptions: {
                external: _external,
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
                        dir: './dist/cjs'
                    },
                    {
                        format: 'es',
                        entryFileNames: '[name].js',
                        sourcemap: true,
                        // 让打包目录和我们目录对应
                        preserveModules: true,
                        dir: './dist/es',
                        plugins: [emitModulePackageFile()]
                    }
                ]
            }
        },
        plugins: [
            dts({
                outputDir: './dist/es'
            }),
            dts({
                outputDir: './dist/cjs'
            })
        ]
    }
}

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
