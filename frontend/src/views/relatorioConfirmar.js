import React, { useState } from 'react';
import './relatorioConfirmar.css';

// Importando ícones do Material Design
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const RelatorioAdicionar = () => {
  // Inicializando estados com a última opção selecionada
  const [tecnica, setTecnica] = useState(4);
  const [velocidade, setVelocidade] = useState(4);
  const [atitude, setAtitude] = useState(4);
  const [inteligencia, setInteligencia] = useState(4);
  const [altura, setAltura] = useState('Alto');
  const [morfologia, setMorfologia] = useState('Endomorfo');
  const [apontamentos, setApontamentos] = useState("");
  const [atleta, setAtleta] = useState("");

  return (
    <div className="containerRelConfir contentRelConfir">
      <div className="form-group">
        {/* Atleta + Validar botão */}
        <div className="atleta-containerRelConfir">
          <label>Atleta</label>
          <a href="/relatorio/validar" className="validar-buttonRelConfir">
            Validar &gt;
          </a>
        </div>
        <div className="atletasadicionar-input-groupRelConfir">
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
        <div className="atletasadicionar-input-groupRelConfir">
          <EventIcon className="icon" />
          <select>
            <option>SL Benfica v FC Porto (01/01/2001)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Treinador</label>
        <div className="atletasadicionar-input-groupRelConfir">
          <PersonIcon className="icon" />
          <select>
            <option>Nome</option>
          </select>
        </div>
      </div>

      {/* Campos de Avaliação */}
      <div className="avaliacao-containerRelConfir">
        <div className="campoRelConfir">
          <label>Técnica</label>
          <div className="opcoesRelConfir">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${tecnica === num ? 'selecionada' : ''}`}
                  onClick={() => setTecnica(num)}
                ></span>
                <span className="numeroRelConfir">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
          <label>Velocidade</label>
          <div className="opcoesRelConfir">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${velocidade === num ? 'selecionada' : ''}`}
                  onClick={() => setVelocidade(num)}
                ></span>
                <span className="numeroRelConfir">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
          <label>Atitude Competitiva</label>
          <div className="opcoesRelConfir">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${atitude === num ? 'selecionada' : ''}`}
                  onClick={() => setAtitude(num)}
                ></span>
                <span className="numeroRelConfir">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
          <label>Inteligência</label>
          <div className="opcoesRelConfir">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${inteligencia === num ? 'selecionada' : ''}`}
                  onClick={() => setInteligencia(num)}
                ></span>
                <span className="numeroRelConfir">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
          <label>Altura</label>
          <div className="opcoesRelConfir">
            {['Baixo', 'Médio', 'Alto'].map((opcao) => (
              <div key={opcao} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${altura === opcao ? 'selecionada' : ''}`}
                  onClick={() => setAltura(opcao)}
                ></span>
                <span className="textoRelConfir">{opcao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
          <label>Morfologia</label>
          <div className="opcoesRelConfir">
            {['Ectomorfo', 'Mesomorfo', 'Endomorfo'].map((opcao) => (
              <div key={opcao} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${morfologia === opcao ? 'selecionada' : ''}`}
                  onClick={() => setMorfologia(opcao)}
                ></span>
                <span className="textoRelConfir">{opcao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
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
