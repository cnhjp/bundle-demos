/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_KEY: string | number
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
