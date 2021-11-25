require('dotenv').config()
const routes = require('./routes/index.js')
const webpack = require('webpack')

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  env: {
    apiUrl: process.env.API_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://nsdbytes.com/template/ericssion/assets/plugins/bootstrap/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/assets/css/style.min.css' },
      { rel: 'stylesheet', href: 'https://nsdbytes.com/template/ericssion/assets/plugins/summernote/dist/summernote.css' },
      { rel: 'stylesheet', href: 'https://nsdbytes.com/template/ericssion/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/solid.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css' },
    ],
    script: [
      {src: 'https://nsdbytes.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js'},
      {src: 'https://nsdbytes.com/template/ericssion/assets/bundles/lib.vendor.bundle.js'},
      {src: 'https://nsdbytes.com/template/ericssion/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js'},
      {src: 'https://nsdbytes.com/template/ericssion/assets/bundles/counterup.bundle.js'},
      {src: 'https://nsdbytes.com/template/ericssion/assets/bundles/apexcharts.bundle.js'},
      {src: 'https://nsdbytes.com/template/ericssion/assets/bundles/summernote.bundle.js'},
      {src: 'https://nsdbytes.com/template/ericssion/assets/js/core.js'},
      {src: '/assets/js/page/index.js'},
      {src: '/assets/js/page/summernote.js'},
      {src: '/assets/js/page/dialogs.js'},
      {src: 'https://ajax.cloudflare.com/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js'},
      {src: 'https://static.cloudflareinsights.com/beacon.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/solid.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/fontawesome.min.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axios',
    { src: "@/plugins/sweetalert", ssr: false },
    { src: "@/plugins/bootstrap-vue", ssr: false },
    { src: "@/plugins/bootstrap-vue", ssr: false },
    { src: "@/plugins/moment", ssr: false },
    { src: "@/plugins/phone-number", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash',
        'moment': 'moment',
        // $: 'jquery',
        // jQuery: 'jquery'
      })
    ],
    babel: {
      compact: true
    }
  },

  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },

  axios: {
    baseURL: process.env.API_URL
  },

  extend (config, ctx) {
    config.resolve.symlinks = false
  },

  router: {
    middleware: 'check-auth',
    extendRoutes (nuxtRoutes, resolve) {
      routes.forEach((route)=>{
        nuxtRoutes.push({
          name: route.name,
          path: route.path,
          component: resolve(__dirname, route.component)
        })
      })
    }
  },

  hooks: {
    build: {
      done (builder) {
        // Copy dist files to public/_nuxt
        if (builder.nuxt.options.dev === false && builder.nuxt.options.mode === 'spa') {
          const publicDir = join(builder.nuxt.options.rootDir, 'public', '_nuxt')
          removeSync(publicDir)
          copySync(join(builder.nuxt.options.generate.dir, '_nuxt'), publicDir)
          copySync(join(builder.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
        }
      }
    }
  }
}
