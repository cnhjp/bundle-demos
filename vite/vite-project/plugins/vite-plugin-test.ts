import type { UserConfig, ResolvedConfig, ViteDevServer, PreviewServerForHook } from "vite"

export default function testPlugin() {
    const virtualModules = ['virtual:test']
    const resolvedVirtualModules = virtualModules.map((id) => '\0' + id)

    return {
        name: 'my-plugin', // required, will show up in warnings and errors

        /// 下面三个钩子函数会在每个传入模块被请求时调用
        /**
         * 对源码进行转换
         * @param code 文件内容
         * @param id 文件路径
         * @returns 转换后的内容和source map
         */
        transform(code: string, id: string) {
            if (id.includes('utils.js')) {
                const transformCode = code.replace('const', 'var')
                return {
                    code: transformCode,
                    map: null // provide source map if available
                }
            }
        },
        /**
         * 自定义模块解析逻辑
         * @param source 模块id
         * @param importer 导入该模块的id
         * @returns 返回解析后的模块id
         */
        resolveId(source: string, importer: string | undefined) {
            if (virtualModules.includes(source)) {
                console.log('resolveId', source, importer)
                return resolvedVirtualModules[virtualModules.indexOf(source)]
            }
        },
        /**
         * 加载模块内容
         * @param source 模块id
         * @returns 返回模块内容
         */
        load(source: string) {
            if (resolvedVirtualModules.includes(source)) {
                console.log('load', source)
                return 'export default "This is virtual!"'
            }
        },

        /// 下面两个钩子函数在服务器启动时调用
        buildStart() {
            console.log('buildStart')
        },
        options(options: any) {
            console.log('options', /** options */)
        },

        /// 下面两个钩子函数在服务器关闭时调用
        buildEnd() {
            console.log('buildEnd')
        },
        /**
         * 可用于清理任何正在运行的外部服务
         */
        closeBundle() {
            console.log('closeBundle')
        },

        /// 下面钩子函数为vite特有
        /**
         * 在解析 Vite 配置前调用 async, sequential
         * @param config 
         * @param env 
         */
        config(config: UserConfig, env: { mode: string, command: string }) {
            if (env.mode === 'development') {
                config.define = {
                    __DEV__: true
                }
            } else {
                config.define = {
                    __DEV__: false
                }
            }
        },
        /**
         * 在解析 Vite 配置后调用 async, parallel
         * @param config 
         */
        configResolved(config: ResolvedConfig) {
            console.log('configResolved', /** config */)
        },
        /**
         * 用于配置开发服务器的钩子 async, sequential
         * @param server 
         */
        configureServer(server: ViteDevServer) {
            console.log('configureServer', server)
        },
        /**
         * async, sequential
         * @param server 
         */
        configurePreviewServer(server: PreviewServerForHook) {
            console.log('configurePreviewServer', server)
        }
        // transformIndexHtml // 转换 index.html 的专用钩子
        // handleHotUpdate // 执行自定义 HMR 更新处理
    }
}