/// <reference types="vite/client" />


interface ViteTypeOptions {

}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
