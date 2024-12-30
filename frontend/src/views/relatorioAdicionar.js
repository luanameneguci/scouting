import React, { useState } from 'react';
import './relatorioAdicionar.css';

// Importando ícones do Material Design
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const RelatorioAdicionar = () => {
  const [tecnica, setTecnica] = useState(null);
  const [velocidade, setVelocidade] = useState(null);
  const [atitude, setAtitude] = useState(null);
  const [inteligencia, setInteligencia] = useState(null);
  const [altura, setAltura] = useState(null);
  const [morfologia, setMorfologia] = useState(null);
  const [apontamentos, setApontamentos] = useState("");
  const [atleta, setAtleta] = useState("");

  return (
    <div className="containeradic contentadic">
      <div className="form-group">
        <label>Atleta</label>
        <div className="atletasadicionar-input-groupadic">
          <PersonIcon className="icon" />
          <input
            type="text"
            value={atleta}
            onChange={(e) => setAtleta(e.target.value)}
            placeholder="Digite o nome do atleta"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Jogo</label>
        <div className="atletasadicionar-input-groupadic">
          <EventIcon className="icon" />
          <select>
            <option>SL Benfica v FC Porto (01/01/2001)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Treinador</label>
        <div className="atletasadicionar-input-groupadic">
          <PersonIcon className="icon" />
          <select>
            <option>Nome</option>
          </select>
        </div>
      </div>

      {/* Campos de Avaliação */}
      <div className="avaliacao-containeradic">
        <div className="campoadic">
          <label>Técnica</label>
          <div className="opcoesadic">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containeradic">
                <span
                  className={`bolaadic ${tecnica === num ? 'selecionada' : ''}`}
                  onClick={() => setTecnica(num)}
                ></span>
                <span className="numeroadic">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Velocidade</label>
          <div className="opcoesadic">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containeradic">
                <span
                  className={`bolaadic ${velocidade === num ? 'selecionada' : ''}`}
                  onClick={() => setVelocidade(num)}
                ></span>
                <span className="numeroadic">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Atitude Competitiva</label>
          <div className="opcoesadic">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containeradic">
                <span
                  className={`bolaadic ${atitude === num ? 'selecionada' : ''}`}
                  onClick={() => setAtitude(num)}
                ></span>
                <span className="numeroadic">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Inteligência</label>
          <div className="opcoesadic">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containeradic">
                <span
                  className={`bolaadic ${inteligencia === num ? 'selecionada' : ''}`}
                  onClick={() => setInteligencia(num)}
                ></span>
                <span className="numeroadic">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Altura</label>
          <div className="opcoesadic">
            {['Baixo', 'Médio', 'Alto'].map((opcao) => (
              <div key={opcao} className="bola-containeradic">
                <span
                  className={`bolaadic ${altura === opcao ? 'selecionada' : ''}`}
                  onClick={() => setAltura(opcao)}
                ></span>
                <span className="textoadic">{opcao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Morfologia</label>
          <div className="opcoesadic">
            {['Ectomorfo', 'Mesomorfo', 'Endomorfo'].map((opcao) => (
              <div key={opcao} className="bola-containeradic">
                <span
                  className={`bolaadic ${morfologia === opcao ? 'selecionada' : ''}`}
                  onClick={() => setMorfologia(opcao)}
                ></span>
                <span className="textoadic">{opcao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Apontamentos</label>
          <textarea
            placeholder="Apontamentos"
            value={apontamentos}
            onChange={(e) => setApontamentos(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RelatorioAdicionar;
