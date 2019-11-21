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
            requireValidPassword: "Type a password with at least 8 chararcters",
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
            rules: "Rules",
            creation: "Register",
        },
        TreeRegister:{
            fruit_height: "Fruits average height",
            image: "Tree image file",
            months: "Tree fruinting months",
            number_tree: "Number of trees available",
            type: "Tree type",
            register: "Register tree",
            property: "Property",
            harvest_average: "Average harvests per year",

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
            confirm: "Confirm",
        },
        Dashboard: {
            weekly: "Weekly",
            jan: "January",
            feb: "February",
            mar: "March",
            apr: "April",
            may: "May",
            jun: "June",
            jul: "July",
            aug: "August",
            sep: "September",
            oct: "October",
            nov: "November",
            dec: "December",
        },
        HarvestDigest: {
            volunteer: "Volunteers",
            date: "Date",
            to: "to",
            message: "Sign in to subscribe in harvests",
            noharvest: "No harvests were found this week",
            subscribed: "Subscribed harvests",
            weekharvests: "Week harvests",
        },
        HarvestView: {
            placeholderTitle: "Harvest",
            harvestNotFound: "Harvest was not found",
            owner: "Owner",
            leader: "Leader",
            where: "Where",
            when: "When",
            volunteers: "Volunteers",
            minimum: "Maximum",
            maximum: "Minimum",
            rules: "Rules and Guidelines",
            info: "Harvest Information"
        },
        ProfilePage: {
            username: "Username",
            phoneNumber: "Phone number",
            bio: "Bio",
            birthdate: "Birthdate",
            email: "Email",
        },
        UserUpdate: {
            profile_photo: "Upload your photo",
            edite_profile: "Profile Update",
            birthdate: "Birthdate",
            telephone: "Phone number",
            bio: "Bio",
            requirePhoneNumber: 'Phone number field accept just numbers',
            requireBio: 'Bio field must be less than 800 characters',
            updatedUser: 'User is up to date'
        },
        Calendar: {
            harvest: "Harvest",
            volunteers: "Volunteers:",
            minimum: "Minimum:",
            maximum: "Maximum:",
            description: "Description:",
            rules: "Rules:",
            about: "About this harvest",
            hoharvest: "No harvest was found this month"
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
            requireValidPassword: "Digite uma senha com, ao menos, 8 caracteres",
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
            creation: "Cadastrar",
        },
        TreeRegister:{
            fruit_height: "Altura média dos frutos",
            image: "Arquivo de Imagem da árvore",
            months: "Meses da frutificação da árvore",
            number_tree: "Número de árvores disponíveis",
            type: "Espécie da árvore/fruta",
            register: "Cadastrar árvore",
            property: "Selecione a propriedade:",
            harvest_average: "Média de colheitas por ano",

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
        },
        Dashboard: {
            weekly: "Semanal",
            jan: "Janeiro",
            feb: "Fevereiro",
            mar: "Março",
            apr: "Abril",
            may: "Maio",
            jun: "Junho",
            jul: "Julho",
            aug: "Agosto",
            sep: "Setembro",
            oct: "Outubro",
            nov: "Novembro",
            dec: "Dezembro",
        },
        HarvestDigest: {
            volunteer: "Voluntários",
            date: "Data",
            to: "até",
            message: "Entre para poder se inscrever em colheitas",
            noharvest: "Nenhuma colheita foi encontrada essa semana",
            subscribed: "Colheitas inscritas",
            weekharvests: "Colheitas da semana",
        },
        HarvestView: {
            placeholderTitle: "Colheita",
            harvestNotFound: "Colheita não foi encontrada",
            owner: "Proprietário",
            leader: "Líder",
            where: "Onde",
            when: "Quando",
            volunteers: "Voluntários",
            minimum: "Mínimo",
            maximum: "Máximo",
            rules: "Regras e Avisos",
            info: "Informações de colheita"
        },
        UserUpdate: {
            profile_photo: "Adicione uma foto",
            edite_profile: "Editar Conta",
            birthdate: "Aniversário",
            telephone: "Telefone",
            bio: "Bio",
            requirePhoneNumber: 'O campo telefone só aceita números',
            requireBio: 'O campo deve ter no máximo 800 caracteres',
            updatedUser: 'Dados do usuário atualizados'
        },
        Calendar: {
            harvest: "Colheita",
            volunteers: "Voluntários:",
            minimum: "Mínimo:",
            maximum: "Máximo:",
            description: "Descrição:",
            rules: "Regras:",
            about: "Sobre esta colheita",
            hoharvest: "Nenhuma colheita foi encontrada neste mês"
        },
    },
}

const i18n = new VueI18n({
    locale: 'pt',
    fallbackLocale: 'en',
    messages
})

export default i18n;
