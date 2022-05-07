import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import DefineOptions from 'unplugin-vue-define-options/vite'
const config = ({ mode }) =>
  defineConfig({
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src')}`,
      },
      dedupe: ['vue-demi'],
    },

    build: {
      minify: loadEnv(mode, process.cwd()).NODE_ENV === 'production',
      sourcemap: loadEnv(mode, process.cwd()).NODE_ENV !== 'production',
    },

    plugins: [
      Vue2(),
      ScriptSetup(),
      WindiCSS(),
      Components({
        resolvers: [
          IconsResolver({
            componentPrefix: 'icon',
            customCollections: ['svg'],
          }),
        ],
        dts: 'src/components.d.ts',
      }),
      Icons({
        compiler: 'vue2',
        customCollections: { svg: FileSystemIconLoader('src/assets/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')) },
        defaultClass: 'app-icon-svg',
      }),
      AutoImport({
        imports: ['@vue/composition-api', 'vue-router', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
      }),
      DefineOptions(),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/global.scss";',
        },
      },
    },
    server: {
      port: 3333,
    },
  })

export default config
