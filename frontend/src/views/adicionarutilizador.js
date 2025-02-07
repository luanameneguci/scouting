import React, { useState } from "react";
import axios from "axios"; // ✅ Importação do Axios
import "./adicionarutilizador.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const AdicionarUtilizador = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [tipoUtilizador, setTipoUtilizador] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmarPassword) {
      alert("As Passwords não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/utilizador", {
        nome,
        email,
        telefone,
        password,
        id_tipoutilizador: Number(tipoUtilizador),
      });

      alert("Utilizador criado com sucesso!");
      setNome("");
      setEmail("");
      setTelefone("");
      setPassword("");
      setConfirmarPassword("");
      setTipoUtilizador("");
    } catch (err) {
      console.error("Erro ao criar utilizador:", err.response?.data || err.message);
      alert("Erro ao criar utilizador. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="containeradic contentadic">
      <div className="form-group">
        <label>Nome</label>
        <div className="atletasadicionar-input-groupadic">
          <PersonIcon className="icon" />
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Mete o nome" required />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <div className="atletasadicionar-input-groupadic">
          <EmailIcon className="icon" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Mete o email" required />
        </div>
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <div className="atletasadicionar-input-groupadic">
          <PhoneIcon className="icon" />
          <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Mete o telefone" required />
        </div>
      </div>

      <div className="form-group">
        <label>Password</label>
        <div className="atletasadicionar-input-groupadic">
          <LockIcon className="icon" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mete a password" required />
        </div>
      </div>

      <div className="form-group">
        <label>Confirmar Password</label>
        <div className="atletasadicionar-input-groupadic">
          <LockIcon className="icon" />
          <input type="password" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} placeholder="Confirme a password" required />
        </div>
      </div>

      <div className="form-group">
        <label>Tipo de Utilizador</label>
        <div className="atletasadicionar-input-groupadic">
          <AccountBoxIcon className="icon" />
          <select value={tipoUtilizador} onChange={(e) => setTipoUtilizador(e.target.value)} required>
            <option value="">Selecione o tipo</option>
            <option value="1">Administrador</option>
            <option value="2">Scout</option>
            <option value="3">Convidado</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btnval">
        Adicionar
      </button>
    </form>
  );
};

export default AdicionarUtilizador;
