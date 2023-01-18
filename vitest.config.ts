// import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

// const timeout = process.env.CI ? 50000 : 30000

export default defineConfig({
    resolve: {
        // alias: {}
    },
    test: {
        include: ['./packages/**/*.spec.[tj]s'],
        // exclude: []
        setupFiles: ['./packages/vitestSetup.ts'],
        // globalSetup: ['./packages/vitestGlobalSetup.ts'],
        // testTimeout: timeout,
        // hookTimeout: timeout,
        // reporters: 'dot',
        // onConsoleLog(log) {
        //     if (log.match(/experimental|jit engine|emitted file|tailwind/i))
        //         return false
        // }
        environment: 'jsdom'
        // environmentOptions: {}
    },
    esbuild: {
        target: 'node14'
    }
})
