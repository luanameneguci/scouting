const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/database");
var initModels = require("../models/init-models");
var models = initModels(sequelize); // Inicializa os modelos

const JWT_SECRET = process.env.JWT_SECRET || "criaENV";

const authController = {};

const createToken = (id, nome, email, telefone, tipo) => {
    // Gerar o token JWT com as permissões
    return token = jwt.sign(
        {
            id,
            nome,
            email,
            telefone,
            tipo
        },
        JWT_SECRET,
        { expiresIn: "1d" } 
    );
}

// Função para registar um novo utilizador
authController.register = async (req, res) => {
    try {
        const { nome, email, password, telefone, id_tipoutilizador } = req.body;

        // Validar campos obrigatórios
        if (!nome || !email || !password || !telefone) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Verificar se o utilizador já existe
        const existingUser = await models.utilizador.findOne({ where: { email } });
        if (existingUser) {
            console.log("Erro: Email já registrado");
            return res.status(400).json({ message: "Email já registado." });
        }

        // Encriptar a palavra-passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const tipoUtilizador = id_tipoutilizador ? id_tipoutilizador : 1; // Se não for fornecido, assume o tipo 1 (scout)


        // Criar novo utilizador
        const newUser = await models.utilizador.create({
            nome,
            email,
            password: hashedPassword,
            telefone,
            id_tipoutilizador: tipoUtilizador,
        });


        return res.status(200).json({
            message: "Registo realizado com sucesso."});

    } catch (error) {
        console.error("Erro no servidor durante o registo:", error.message, error.stack);
        return res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
};


// Função para login
authController.login = async (req, res) => {
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
            return res.status(400).json({ message: "Palavra-passe incorreta." });
        }

        const token = createToken(user.id_utilizador, user.nome, user.email, user.telefone, user.id_tipoutilizador);


        return res.status(200).json({ message: "Login realizado com sucesso.", token,
            user: {
                id: user.id_utilizador,
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                tipoUtilizador: user.id_tipoutilizador
            } });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro no servidor." });
    }
};


authController.verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        jwt.verify(token, JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({ message: "Token inválido." });
            }
            console.log("Token verificado.");
            next(); 
        });
    } catch (error) {
        console.error("Erro ao verificar o token:", error.message, error.stack);
        return res.status(401).json({ message: error.message });
    }
};
authController.tokenValidation = (req, res) => {
    return res.status(200).json({ message: "Token válido." });
};
authController.adminValidation = (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.tipo !== 2) {
        return res.status(401).json({ message: "Acesso autorizado apenas a administradores." });
    }
    return res.status(200).json({ message: "Utilizador válido." });
};
module.exports = authController;
