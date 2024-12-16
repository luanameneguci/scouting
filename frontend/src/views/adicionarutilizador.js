import React, { useState } from 'react';
import './adicionarutilizador.css';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';

const AdicionarUtilizador = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfil, setPerfil] = useState('Treinador');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar o novo utilizador
    console.log('Novo utilizador adicionado:', { nome, email, senha, telefone, perfil });
  };

  return (
    <div className="container-adicionar-utilizador">
      <h2>Adicionar Utilizador</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <div className="input-icon">
            <PersonIcon className="icon" />
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-icon">
            <EmailIcon className="icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="input-icon">
            <LockIcon className="icon" />
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <div className="input-icon">
            <PhoneIcon className="icon" />
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite o telefone"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Perfil</label>
          <div className="radio-buttons">
            <div>
              <input
                type="radio"
                id="treinador"
                name="perfil"
                value="Treinador"
                checked={perfil === 'Treinador'}
                onChange={(e) => setPerfil(e.target.value)}
              />
              <label htmlFor="treinador">Treinador</label>
            </div>
            <div>
              <input
                type="radio"
                id="convidado"
                name="perfil"
                value="Convidado"
                checked={perfil === 'Convidado'}
                onChange={(e) => setPerfil(e.target.value)}
              />
              <label htmlFor="convidado">Convidado</label>
            </div>
            <div>
              <input
                type="radio"
                id="administrador"
                name="perfil"
                value="Administrador"
                checked={perfil === 'Administrador'}
                onChange={(e) => setPerfil(e.target.value)}
              />
              <label htmlFor="administrador">Administrador</label>
            </div>
          </div>
        </div>
        <button type="submit" className="adicionar-button">Adicionar</button>
      </form>
    </div>
  );
};

export default AdicionarUtilizador;