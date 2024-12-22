// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: 'https://freyja-70hj.onrender.com', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  css: ['@/assets/styles/all.scss'],
  modules: ['@samk-dev/nuxt-vcalendar', 'nuxt-swiper', '@pinia/nuxt'],
  swiper: {
    prefix: 'Swiper',
    styleLang: 'scss',
    modules: ['autoplay', 'navigation', 'pagination'],
  },
})

// terminal 報的錯 https://github.com/twbs/bootstrap/issues/40962