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
        SideBar: {
            dashboard: "Dashboard",
            calendar: "Calendar",
            properties: "My Properties",
            profile: "My Profile",
            harvests: "Harvests",
            opendata: "Open Data",
            signin: "Sign in",
            signup: "Sign up",
            languages: "Languages",
            exit: "Exit",
        },
        DatePicker: {
            locale: "en",
            cancel: "Cancel",
            confirm: "Confirm"
        },
        ProfilePage: {
            username: "Username",
            phoneNumber: "Phone number",
            bio: "Bio",
            birthdate: "Birthdate",
            email: "Email",
        }
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
        SideBar: {
            dashboard: "Dashboard",
            calendar: "Calendário",
            properties: "Minhas Propriedades",
            profile: "Meu Perfil",
            harvests: "Colheitas",
            opendata: "Dados Abertos",
            signin: "Entrar",
            signup: "Registrar",
            languages: "Linguagens",
            exit: "Sair",
        },
        DatePicker: {
          locale: "pt-br",
          cancel: "Cancelar",
          confirm: "Confirmar"
        },

        ProfilePage: {
            username: "Nome de usuário",
            phoneNumber: "Número de telefone",
            bio: "Bio",
            birthdate: "Data de nascimento",
            email: "Email",
        }
    },
}

const i18n = new VueI18n({ 
    locale: 'pt', 
    fallbackLocale: 'en',
    messages
})

export default i18n;