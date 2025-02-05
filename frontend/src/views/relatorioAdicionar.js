import React, { useState, useEffect } from "react";
import axios from "axios";
import "./relatorioAdicionar.css";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";

const RelatorioAdicionar = () => {
  const url = "http://localhost:8080"; // Alterado para mesma URL da página Atletas
  const [tecnica, setTecnica] = useState(null);
  const [velocidade, setVelocidade] = useState(null);
  const [atitude, setAtitude] = useState(null);
  const [inteligencia, setInteligencia] = useState(null);
  const [ratingGeral, setRatingGeral] = useState(null);
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
    console.log("Buscando dados da API...");

    axios.get(`${url}/jogo/listar`, { withCredentials: true })
      .then((res) => {
        console.log("Jogos recebidos:", res.data);
        setJogos(res.data.data || []);
      })
      .catch((error) => console.error("Erro ao buscar jogos:", error));

    axios.get(`${url}/utilizador/treinadores`, { withCredentials: true })
      .then((res) => {
        console.log("Treinadores recebidos:", res.data);
        setTreinadores(res.data.treinadores || []);
      })
      .catch((error) => console.error("Erro ao buscar treinadores:", error));

    axios.get(`${url}/atleta/listar`, { withCredentials: true })
      .then((res) => {
        console.log("Atletas recebidos:", res.data);
        setAtletas(res.data.data || []);
      })
      .catch((error) => console.error("Erro ao buscar atletas:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoRelatorio = {
      id_utilizador: treinador,
      id_jogo: jogo,
      id_atleta: atleta,
      tecnica,
      velocidade,
      atitudecompetitiva: atitude,
      inteligencia,
      altura,
      morfologia,
      apontamentos,
    };

    try {
      const response = await axios.post(`${url}/relatorio/criar`, novoRelatorio, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Relatório adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar relatório:", error);
      alert("Erro ao enviar relatório. Verifique os dados.");
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
        {[{ label: "Técnica", state: tecnica, setState: setTecnica },
          { label: "Velocidade", state: velocidade, setState: setVelocidade },
          { label: "Atitude Competitiva", state: atitude, setState: setAtitude },
          { label: "Inteligência", state: inteligencia, setState: setInteligencia },
          { label: "Rating Geral", state: ratingGeral, setState: setRatingGeral }]
          .map(({ label, state, setState }) => (
            <div key={label} className="campoadic">
              <label>{label}</label>
              <div className="opcoesadic">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bola-containeradic">
                    <span className={`bolaadic ${state === num ? "selecionada" : ""}`}
                          onClick={() => setState(num)}>
                    </span>
                    <span className="numeroadic">{num}</span>
                  </div>
                ))}
              </div>
            </div>
        ))}

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
      </div>
    </form>
  );
};

export default RelatorioAdicionar;
