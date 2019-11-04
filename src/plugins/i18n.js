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
            positiveStatus: "Logged in!",
            negativeStatus: "Email or password are incorrect",
            requireName: 'Type your name',
            requirePasswordCorrespondance: "Passwords must match",
            requireEmail: "Type your email",
            requirePassword: "Type your password",
            requreValidPassword: "Type a password with at least 8 chararcters",
            requireValidEmail: "Type a valid email"
        },
        RootPage: {
            title: "This is root page"
        },
        HarvestRegister: {
            register: "Harvest Registration",
            date: "Date",
            description: "Description",
            equipment: "Equipment",
            volunteerNumber: "Volunteers",
            minimum: "Minimum",
            maximum: "Maximum",
            rules: " Rules",
            create: "Register"
        },
        Global: {
            locale: "en",
        },
        DatePicker: {
            locale: "en",
            cancel: "Cancel",
            confirm: "Confirm"
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
            positiveStatus: "Você entrou na sua conta!",
            negativeStatus: "Email ou senha estão incorretos",
            requireName: 'Digite seu nome',
            requirePasswordCorrespondance: "As senhas devem ser iguais",
            requireEmail: "Digite seu email",
            requirePassword: "Digite sua senha",
            requreValidPassword: "Digite uma senha com, ao menos, 8 caracteres",
            requireValidEmail: "Digite um email válido"
        },         
        RootPage: {
            title: "Essa é a pagina root"
        },
        HarvestRegister: {
            register: "Criar colheita",
            date: "Data de colheita",
            description: "Descrição",
            equipment: "Equipamento",
            volunteerNumber: "Número de voluntários",
            minimum: "Mínimo",
            maximum: "Máximo",
            rules: " Regras da colheita",
            create: "Cadastrar"
        },
        Global: {
            locale: "pt-br",
        },
        DatePicker: {
          locale: "pt-br",
          cancel: "Cancelar",
          confirm: "Confirmar"
        },

    },
}

const i18n = new VueI18n({ 
    locale: 'pt', 
    fallbackLocale: 'en',
    messages
})

export default i18n;