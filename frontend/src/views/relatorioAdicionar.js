import React, { useState, useEffect } from "react";
import axios from "axios";
import "./relatorioAdicionar.css";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";

const RelatorioAdicionar = () => {
  const url = process.env.REACT_APP_API_URL;
  const [tecnica, setTecnica] = useState(null);
  const [velocidade, setVelocidade] = useState(null);
  const [atitude, setAtitude] = useState(null);
  const [inteligencia, setInteligencia] = useState(null);
  const [RatingGeral, setRatingGeral] = useState(null);
  const [altura, setAltura] = useState(null);
  const [morfologia, setMorfologia] = useState(null);
  const [apontamentos, setApontamentos] = useState("");
  const [atleta, setAtleta] = useState("");
  const [jogo, setJogo] = useState("");
  const [treinador, setTreinador] = useState("");
  const [jogos, setJogos] = useState([]);
  const [treinadores, setTreinadores] = useState([]);
  const [atletas, setAtletas] = useState([]);

  useEffect(() => {
    // Buscar lista de jogos
    axios.get(url + "/jogo/listar").then((res) => {
      if (res.status === 200) {
        setJogos(res.data.data);
      }
    });

    // Buscar lista de treinadores
    axios.get(url + "/utilizador/treinadores").then((res) => {
      if (res.status === 200) {
        setTreinadores(res.data.treinadores);
      }
    });

    // Buscar lista de atletas
    axios.get(url + "/atleta/listar").then((res) => {
      if (res.status === 200) {
        setAtletas(res.data.data);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoRelatorio = {
      id_utilizador: treinador, // ID do treinador
      id_jogo: jogo, // ID do jogo selecionado
      id_atleta: atleta, // ID do atleta selecionado
      tecnica,
      velocidade,
      atitudecompetitiva: atitude,
      inteligencia,
      altura,
      morfologia,
      apontamentos,
    };

    try {
      const response = await axios.post(url + "/relatorio/criar", novoRelatorio);
      if (response.status === 200) {
        alert("Relatório adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar relatório:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="containeradic contentadic">
      <div className="form-group">
        <label>Atleta</label>
        <div className="atletasadicionar-input-groupadic">
          <PersonIcon className="icon" />
          <select value={atleta} onChange={(e) => setAtleta(e.target.value)} required>
            <option value="">Selecione um atleta</option>
            {atletas.map((atleta) => (
              <option key={atleta.id_atleta} value={atleta.id_atleta}>
                {atleta.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Jogo</label>
        <div className="atletasadicionar-input-groupadic">
          <EventIcon className="icon" />
          <select value={jogo} onChange={(e) => setJogo(e.target.value)} required>
            <option value="">Selecione um jogo</option>
            {jogos.map((jogo) => (
              <option key={jogo.id_jogo} value={jogo.id_jogo}>
                {jogo.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Treinador</label>
        <div className="atletasadicionar-input-groupadic">
          <PersonIcon className="icon" />
          <select value={treinador} onChange={(e) => setTreinador(e.target.value)} required>
            <option value="">Selecione um treinador</option>
            {treinadores.map((treinador) => (
              <option key={treinador.id_utilizador} value={treinador.id_utilizador}>
                {treinador.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="avaliacao-containeradic">
        <div className="campoadic">
          <label>Técnica</label>
          <div className="opcoesadic">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containeradic">
                <span
                  className={`bolaadic ${tecnica === num ? "selecionada" : ""}`}
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
                  className={`bolaadic ${velocidade === num ? "selecionada" : ""}`}
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
                  className={`bolaadic ${atitude === num ? "selecionada" : ""}`}
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
                  className={`bolaadic ${inteligencia === num ? "selecionada" : ""}`}
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
        <div>

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
          <label>Rating Geral</label>
          <div className="opcoesadic">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bola-containeradic">
                <span
                  className={`bolaadic ${RatingGeral === num ? "selecionada" : ""}`}
                  onClick={() => setRatingGeral(num)}
                ></span>
                <span className="numeroadic">{num}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div className="campoadic">
        <label>Apontamentos</label>
        <textarea
          className="textareaRelConfir"
          placeholder="Apontamentos"
          value={apontamentos}
          onChange={(e) => setApontamentos(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btnval">
        Adicionar
      </button>
    </form>
  );
};

export default RelatorioAdicionar;
