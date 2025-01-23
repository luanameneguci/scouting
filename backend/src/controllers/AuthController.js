const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/database");
var initModels = require("../models/init-models");
var models = initModels(sequelize); // Inicializa os modelos

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_seguro";

const authController = {
    // Função para registrar um novo utilizador

   register: async (req, res) => {
    try {
        console.log("Dados recebidos no corpo:", req.body); // Log dos dados recebidos

        const { nome, email, password, telefone, id_tipoutilizador } = req.body;

        // Validar campos obrigatórios
        if (!nome || !email || !password || !telefone || !id_tipoutilizador) {
            console.log("Erro: Campos obrigatórios ausentes");
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Verificar se o email já existe no banco
        console.log("Verificando se o email já existe...");
        const existingUser = await models.utilizador.findOne({ where: { email } });
        if (existingUser) {
            console.log("Erro: Email já registrado");
            return res.status(400).json({ message: "Email já registrado." });
        }

        // Criptografar a senha
        console.log("Criptografando a senha...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo utilizador sem o id_utilizador
        console.log("Criando novo utilizador...");
        const newUser = await models.utilizador.create({
            nome,
            email,
            password: hashedPassword,
            telefone,
            id_tipoutilizador, // Não inclua o id_utilizador, pois ele será gerado automaticamente
        });

        console.log("Utilizador criado com sucesso:", newUser);
        return res.status(201).json({
            message: "Utilizador registrado com sucesso.",
            user: {
                id_utilizador: newUser.id_utilizador,
                nome: newUser.nome,
                email: newUser.email,
                telefone: newUser.telefone,
                id_tipoutilizador: newUser.id_tipoutilizador,
            },
        });
    } catch (error) {
        console.error("Erro no servidor durante o registro:", error.message, error.stack);
        return res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
},
    

    // Função para login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email e password são obrigatórios." });
            }

            // Verificar se o utilizador existe
            const user = await models.utilizador.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "Utilizador não encontrado." });
            }

            // Verificar a senha
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            // Gerar o token JWT com as permissões
            const token = jwt.sign(
                { 
                    id_utilizador: user.id_utilizador,
                    id_tipoutilizador: user.id_tipoutilizador 
                },
                JWT_SECRET,
                { expiresIn: "1h" } // O token expira em 1 hora
            );

            return res.status(200).json({ message: "Login realizado com sucesso.", token });
        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: "Erro no servidor." });
        }
    },


    // Função para verificar um token (opcional, útil para testes)
    verifyToken: (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token não fornecido." });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            return res.status(200).json({ message: "Token válido.", decoded });
        } catch (error) {
            console.error("Erro ao verificar o token:", error.message, error.stack);
            return res.status(401).json({ message: "Token inválido." });
        }
    },
};

module.exports = authController;
