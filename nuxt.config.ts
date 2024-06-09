// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '@': '/',
    '#ui': '/path/to/ui'
  },
  typescript: {
    shim: false
  },
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/image"]

})