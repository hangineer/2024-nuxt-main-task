// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // nitro: {
  //   preset: 'render_com'
  // },
  css: ['@/assets/styles/all.scss'],
  modules: ['@nuxt/icon', '@samk-dev/nuxt-vcalendar'],
})