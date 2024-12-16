import React, { useState } from 'react';
import './adicionarutilizador.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';

const RelatorioAdicionar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfil, setPerfil] = useState('Treinador');

  return (
    <div className="containerRelConfir">
      <h2>Adicionar Utilizador</h2>

      {/* Nome */}
      <div className="atletasadicionar-input-groupRelConfir">
        <PersonIcon />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="atletasadicionar-input-groupRelConfir">
        <EmailIcon />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="atletasadicionar-input-groupRelConfir">
        <LockIcon />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Telefone */}
      <div className="atletasadicionar-input-groupRelConfir">
        <PhoneIcon />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      {/* Perfil */}
      <div className="campoRelConfir">
        <h4>Perfil</h4>
        <div className="opcoesRelConfir">
          {['Treinador', 'Convidado', 'Administrador'].map((role) => (
            <label key={role}>
              <input
                type="radio"
                value={role}
                checked={perfil === role}
                onChange={(e) => setPerfil(e.target.value)}
              />
              {role}
            </label>
          ))}
        </div>
      </div>

      {/* Botão Adicionar */}
      <button className="adicionar-buttonRelConfir">Adicionar</button>
    </div>
  );
};

export default RelatorioAdicionar;
