import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '基础库文档',
    description: '本项目描述搭建一个基础工具库的工程化流程。',
    base: '/baseLibrary/',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: '指南', link: '/guide/Getting-Started' },
            { text: '基础库', link: '/examples/array' }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/jucttr/baseLibrary' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '基础',
                    items: [
                        {
                            text: '安装',
                            link: '/guide/installation'
                        },
                        {
                            text: '快速开始',
                            link: '/guide/quickstart'
                        }
                    ]
                },
                {
                    text: '进阶',
                    items: [
                        {
                            text: 'xx',
                            link: '/xx'
                        }
                    ]
                }
            ],
            '/examples/': [
                {
                    text: '使用步骤',
                    items: [
                        {
                            text: '数组',
                            link: '/examples/array'
                        },
                        {
                            text: '对象',
                            link: '/examples/object'
                        }
                    ]
                }
            ]
        }
    }
})
