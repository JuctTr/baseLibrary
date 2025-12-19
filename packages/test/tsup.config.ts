import { createConfig } from '../../shared/tsup.config.base'
import { resolve } from 'path'

export default createConfig({
    pkgPath: resolve(__dirname, './package.json')
})
