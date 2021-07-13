export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  dev: process.env.DEV || false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Toko - Sanity x NuxtJS Starter Template',
    script: [
      {
        src: 'https://plausible.io/js/plausible.js',
        async: true,
        defer: true,
        'data-domain': 'toko-sanity.netlify.app',
      },
    ],
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  googleFonts: {
    display: 'swap',
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/api.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  image: {
    sanity: {
      projectId: process.env.SANITY_ID,
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sanity/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-stripe-module',
      {
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
