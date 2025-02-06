import React, { useState } from 'react';
import './relatorioConfirmar.css';

// Importando ícones do Material Design
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const RelatorioAdicionar = () => {
  const [tecnica, setTecnica] = useState(4);
  const [velocidade, setVelocidade] = useState(4);
  const [atitude, setAtitude] = useState(4);
  const [inteligencia, setInteligencia] = useState(4);
  const [RatingGeral, setRatingGeral] = useState(4);
  const [altura, setAltura] = useState('Alto');
  const [morfologia, setMorfologia] = useState('Endomorfo');
  const [apontamentos, setApontamentos] = useState('');
  const [atleta, setAtleta] = useState('');
  const [isBlocked, setIsBlocked] = useState(true); // Estado para bloquear/desbloquear os campos

  return (
    <div className="containerRelConfir contentRelConfir">
      <div className="form-group">
        <div className="atleta-containerRelConfir">
          <label>Atleta</label>
          <a href="/relatorios/validar" className="validar-buttonRelConfir">
            Validar &gt;
          </a>
        </div>
        <div className="atletasadicionar-input-groupRelConfir">
          <PersonIcon className="icon" />
          <select value={atleta} onChange={(e) => setAtleta(e.target.value)}> 
            <option value="">Selecione um atleta</option>
            <option value="Atleta 1">Atleta 1</option>
            <option value="Atleta 2">Atleta 2</option>
            <option value="Atleta 3">Atleta 3</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Jogo</label>
        <div className="atletasadicionar-input-groupRelConfir">
          <EventIcon className="icon" />
          <select disabled={isBlocked}> {/* Desativa o select */}
            <option>SL Benfica v FC Porto (01/01/2001)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Treinador</label>
        <div className="atletasadicionar-input-groupRelConfir">
          <PersonIcon className="icon" />
          <select disabled={isBlocked}> {/* Desativa o select */}
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
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
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
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
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
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
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
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
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
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
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
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
                ></span>
                <span className="textoRelConfir">{opcao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoRelConfir">
          <label>Rating Geral</label>
          <div className="opcoesRelConfir">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containerRelConfir">
                <span
                  className={`bolaRelConfir ${RatingGeral === num ? 'selecionada' : ''}`}
                  onClick={() => setRatingGeral(num)}
                  style={{ pointerEvents: isBlocked ? 'none' : 'auto' }} // Desativa o clique nas bolas
                ></span>
                <span className="numeroRelConfir">{num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Apontamentos</label>
          <textarea
            className="textareaRelConfir"
            placeholder="Apontamentos"
            value={apontamentos}
            onChange={(e) => setApontamentos(e.target.value)}
            disabled={isBlocked} // Desativa o textarea
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RelatorioAdicionar;
