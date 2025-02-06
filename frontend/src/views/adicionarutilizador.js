import React, { useState } from 'react';
import './adicionarutilizador.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const AdicionarUtilizador = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoUtilizador, setTipoUtilizador] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Verifica se os elementos existem antes de acessar seus valores
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const telefoneInput = document.getElementById("telefone");
    const passwordInput = document.getElementById("password");
    const tipoUtilizadorInput = document.getElementById("id_tipoutilizador");

    if (!nomeInput || !emailInput || !telefoneInput || !passwordInput || !tipoUtilizadorInput) {
        console.error("❌ Erro: Alguns elementos do formulário não foram encontrados.");
        alert("Erro interno: Alguns campos não foram encontrados. Verifica o JS.");
        return;
    }

    const formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        password: document.getElementById("password").value,
        id_tipoutilizador: document.getElementById("id_tipoutilizador").value,
    };

    console.log("🔹 Enviando dados:", formData); // Debug para verificar os dados antes do envio

    try {
        const response = await fetch("http://localhost:8080/utilizador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Erro ao criar utilizador.");
        }

        console.log("✅ Utilizador criado:", result);
        alert("Utilizador registado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao criar utilizador:", error.message);
        alert(error.message);
    }
};

window.onload = () => {
  const form = document.getElementById("formAdicionarUtilizador");
  if (form) {
      form.addEventListener("submit", handleSubmit);
  } else {
      console.error("❌ Erro: O formulário não foi encontrado no DOM.");
  }
};

  return (
    <form onSubmit={handleSubmit} className="containeradic contentadic">
      <div className="form-group">
        <label>Nome</label>
        <div className="atletasadicionar-input-groupadic">
          <PersonIcon className="icon" />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <div className="atletasadicionar-input-groupadic">
          <EmailIcon className="icon" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <div className="atletasadicionar-input-groupadic">
          <PhoneIcon className="icon" />
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite o telefone"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Senha</label>
        <div className="atletasadicionar-input-groupadic">
          <LockIcon className="icon" />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Confirmar Senha</label>
        <div className="atletasadicionar-input-groupadic">
          <LockIcon className="icon" />
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme a senha"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Tipo de Utilizador</label>
        <div className="atletasadicionar-input-groupadic">
          <AccountBoxIcon className="icon" />
          <select 
            value={tipoUtilizador} 
            onChange={(e) => setTipoUtilizador(e.target.value)}
            required
          >
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
