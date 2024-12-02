import React, { useState } from 'react';
import './relatorioConfirmar.css';

const RelatorioConfirmar = () => {
  const [tecnica, setTecnica] = useState(null);
  const [velocidade, setVelocidade] = useState(null);
  const [atitude, setAtitude] = useState(null);
  const [inteligencia, setInteligencia] = useState(null);
  const [altura, setAltura] = useState(null);
  const [morfologia, setMorfologia] = useState(null);
  const [apontamentos, setApontamentos] = useState("");

  return (
    <div className="avaliacao-container">
      <h1>Avaliação do Jogador</h1>
      
      <div className="campo">
        <label>Atleta</label>
        <input type="text" value="John Doe" disabled />
      </div>

      <div className="campo">
        <label>Jogo</label>
        <select>
          <option>SL Benfica v FC Porto (01/01/2001)</option>
        </select>
      </div>

      <div className="campo">
        <label>Treinador</label>
        <select>
          <option>Nome</option>
        </select>
      </div>

      <div className="campo">
        <label>Técnica</label>
        <div className="opcoes">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bola-container">
              <span
                className={`bola ${tecnica === num ? 'selecionada' : ''}`}
                onClick={() => setTecnica(num)}
              ></span>
              <span className="numero">{num}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Velocidade</label>
        <div className="opcoes">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bola-container">
              <span
                className={`bola ${velocidade === num ? 'selecionada' : ''}`}
                onClick={() => setVelocidade(num)}
              ></span>
              <span className="numero">{num}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Atitude Competitiva</label>
        <div className="opcoes">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bola-container">
              <span
                className={`bola ${atitude === num ? 'selecionada' : ''}`}
                onClick={() => setAtitude(num)}
              ></span>
              <span className="numero">{num}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Inteligência</label>
        <div className="opcoes">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bola-container">
              <span
                className={`bola ${inteligencia === num ? 'selecionada' : ''}`}
                onClick={() => setInteligencia(num)}
              ></span>
              <span className="numero">{num}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Altura</label>
        <div className="opcoes">
          {['Baixo', 'Médio', 'Alto'].map((opcao) => (
            <div key={opcao} className="bola-container">
              <span
                className={`bola ${altura === opcao ? 'selecionada' : ''}`}
                onClick={() => setAltura(opcao)}
              ></span>
              <span className="texto">{opcao}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Morfologia</label>
        <div className="opcoes">
          {['Ectomorfo', 'Mesomorfo', 'Endomorfo'].map((opcao) => (
            <div key={opcao} className="bola-container">
              <span
                className={`bola ${morfologia === opcao ? 'selecionada' : ''}`}
                onClick={() => setMorfologia(opcao)}
              ></span>
              <span className="texto">{opcao}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Apontamentos</label>
        <textarea 
          placeholder="Apontamentos"
          value={apontamentos}
          onChange={(e) => setApontamentos(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default RelatorioConfirmar;
