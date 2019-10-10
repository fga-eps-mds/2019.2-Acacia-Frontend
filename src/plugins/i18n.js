import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = { 
    'en': {
        IWillFurarTheRenato: "this is a message in english" 
    },
    'pt': {
        IWillFurarTheRenato: "Isso é uma mensagem em português"
    },
}

const i18n = new VueI18n({ 
    locale: 'pt', 
    fallbackLocale: 'pt',
    messages
})

export default i18n;