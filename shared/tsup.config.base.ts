import { defineConfig } from 'tsup'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export function createConfig(options: { pkgPath: string; outDir?: string }) {
    const pkg = JSON.parse(readFileSync(options.pkgPath, 'utf8'))
    const outDir = options.outDir || 'dist'

    // 收集所有外部依赖
    const external = [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        // Node 内置模块
        'fs',
        'path',
        'os',
        'events',
        'stream',
        'util',
        'url',
        'querystring',
        'crypto',
        'buffer',
        'timers',
        'process',
        'assert',
        'http',
        'https'
    ]

    return defineConfig([
        // CommonJS 配置
        {
            entry: ['src/index.ts'],
            format: ['cjs'],
            dts: false, // 我们单独处理类型声明
            splitting: false,
            sourcemap: true,
            clean: true, // 清理旧文件
            external,
            outDir: `${outDir}/cjs`,
            bundle: false, // 保持模块结构
            onSuccess: 'echo "CJS build completed"'
        },
        // ES Module 配置
        {
            entry: ['src/index.ts'],
            format: ['esm'],
            dts: false, // 我们单独处理类型声明
            splitting: false,
            sourcemap: true,
            clean: false, // 不清理，保留CJS的文件
            external,
            outDir: `${outDir}/es`,
            bundle: false, // 保持模块结构
            onSuccess: () => {
                // 为 ESM 生成 package.json
                writeFileSync(
                    join(process.cwd(), `${outDir}/es/package.json`),
                    JSON.stringify({ type: 'module' }, null, 2)
                )
                console.log('ESM build completed')
            }
        },
        // 类型声明生成 - ESM
        {
            entry: ['src/index.ts'],
            dts: { only: true },
            clean: false, // 不清理，保留构建文件
            external,
            outDir: `${outDir}/es`,
            bundle: false, // 保持模块结构
            onSuccess: 'echo "DTS generation completed for ESM"'
        },
        // 类型声明生成 - CJS
        {
            entry: ['src/index.ts'],
            dts: { only: true },
            clean: false,
            external,
            outDir: `${outDir}/cjs`,
            bundle: false, // 保持模块结构
            onSuccess: 'echo "DTS generation completed for CJS"'
        }
    ])
}
