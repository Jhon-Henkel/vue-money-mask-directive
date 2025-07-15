import moneyMask from "~/plugins/money/moneyMask";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive('money', moneyMask)
})
