import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './relatorioConfirmar.css';

// Importando ícones do Material Design
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';

const RelatorioAdicionar = () => {
  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams()
  const [relatorio, setRelatorio] = useState({})
  useEffect(() => {
    const fetchRelatorio = async () => {
      await axios.get(url + '/relatorio/unico/' + id).then((res) => {
        if (res.status === 200) {
          console.log(res)
          setRelatorio(res.data);
        } else throw new Error('erro procurar relatório')
      })
    }
    try {
      fetchRelatorio();
    } catch (error) {
      console.error("Erro ao buscar equipa do atleta:", error);
    }
  }, [])

if(!relatorio.atletum) return <div>a carregar</div>
  return (
    <div className="containerRelConfir contentRelConfir">
      <div className="form-group">
        <div className="atleta-containerRelConfir">
          <label>Atleta</label>
        </div>
        <div className="atletasadicionar-input-groupRelConfir">
          <PersonIcon className="icon" />
          <select disabled> {/* Desativa o select */}
            <option value="">{relatorio.atletum.nome}</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Jogo</label>
        <div className="atletasadicionar-input-groupRelConfir">
          <EventIcon className="icon" />
          <select disabled> {/* Desativa o select */}
            <option>{`${relatorio.jogo.clubes[0].nome} - ${relatorio.jogo.clubes[1].nome} (${relatorio.jogo.data}`}</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Treinador</label>
        <div className="atletasadicionar-input-groupRelConfir">
          <PersonIcon className="icon" />
          <select disabled> {/* Desativa o select */}
            <option>{relatorio.utilizador.nome}</option>
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
                  className={`bolaRelConfir ${relatorio.tecnica == num.toString()?'selecionada':''}`}
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
                  className={`bolaRelConfir ${relatorio.velocidade == num.toString()?'selecionada':''}`}
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
                  className={`bolaRelConfir ${relatorio.atitudecompetitiva == num.toString()?'selecionada':''}`}
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
                  className={`bolaRelConfir ${relatorio.inteligencia == num.toString()?'selecionada':''}`}
                ></span>
                <span className="numeroRelConfir">{num}</span>
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
                  className={`bolaRelConfir'}`}
                ></span>
                <span className="textoRelConfir">{opcao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="campoadic">
          <label>Apontamentos</label>
          <textarea
            className="textareaRelConfir"
            placeholder="Apontamentos"
            value={relatorio.apontamentos}
            disabled // Desativa o textarea
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RelatorioAdicionar;
