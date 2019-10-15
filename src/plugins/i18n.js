import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = { 
    'en': {
        SignPages: {
            name: "Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm your password",
            forgotPassword: "Forgot your password?",
            createAccount: "Create account",
            login: "Log in",
            logout: "Log out",
        },
        RootPage: {
            title: "This is root page"
        },
    },
    'pt': {
        SignPages: {
            name: "Nome",
            email: "Email",
            password: "Senha",
            confirmPassword: "Confirme sua senha",
            forgotPassword: "Esqueceu sua senha?",
            createAccount: "Criar conta",
            login: "Entrar",
            logout: "Sair",
        },         
        RootPage: {
            title: "Essa é a pagina root"
        },
    },
}

const i18n = new VueI18n({ 
    locale: 'pt', 
    fallbackLocale: 'pt',
    messages
})

export default i18n;