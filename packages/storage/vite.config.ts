import { readFileSync } from 'fs'

import { createConfig } from '../../shared/vite.config.base'

export default createConfig({
    pkg: JSON.parse(
        readFileSync(new URL('./package.json', import.meta.url), 'utf8')
    )
})
