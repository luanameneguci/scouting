import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
} from "chart.js";
import "./atletapersonalpage.css";
import { useParams } from "react-router-dom";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

export default function Atletaspersonalpage() {
  const { id } = useParams(); // Captura o ID da URL
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatorios, setRelatorios] = useState([]);

  // Buscar dados do Atleta
  useEffect(() => {
    async function fetchAtleta() {
      try {
        const response = await fetch(`http://localhost:8080/atleta/${id}`);
        if (!response.ok) throw new Error("Atleta não encontrado");
        const data = await response.json();
        setAtleta(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAtleta();
  }, [id]);

  // Buscar relatórios (lista) do Atleta
  useEffect(() => {
    async function fetchRelatorios() {
      try {
        const response = await fetch(`http://localhost:8080/relatorio/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar relatórios");
        const data = await response.json();
        setRelatorios(data.data);
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    fetchRelatorios();
  }, [id]);

  // ---------------------------------------
  // Dropdown: selecionar qual atributo mostrar
  // ---------------------------------------
  const [campoSelecionado, setCampoSelecionado] = useState("velocidade");
  const [campoMensalData, setCampoMensalData] = useState([]);

  // Sempre que id ou campoSelecionado mudar, buscamos a média mensal desse campo
  useEffect(() => {
    async function fetchCampoMensal() {
      try {
        // Exemplo: GET /relatorio/mensal/3?campo=velocidade
        const response = await fetch(
          `http://localhost:8080/relatorio/mensal/${id}?campo=${campoSelecionado}`
        );
        if (!response.ok) throw new Error("Erro ao buscar médias mensais de " + campoSelecionado);
        const json = await response.json();

        if (json.success) {
          // json.data = [{ mes: "2025-01", mediaMensal: "3.5" }, ...]
          setCampoMensalData(json.data);
        }
      } catch (error) {
        console.error("Erro ao buscar medias de " + campoSelecionado, error);
      }
    }
    fetchCampoMensal();
  }, [id, campoSelecionado]);

  // Array fixo para o eixo X (meses em PT)
  const MONTHS_PT = ["Jan", "Fev", "Mar", "Abril", "Maio", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const currentYear = new Date().getFullYear();

  // Para cada mês do ano atual, busca mediaMensal no array retornado do back-end
  const campoMonthlyArray = MONTHS_PT.map((_, index) => {
    const monthNumber = String(index + 1).padStart(2, "0");
    const yearMonth = `${currentYear}-${monthNumber}`;
    const found = campoMensalData.find((item) => item.mes === yearMonth);
    return found ? Number(found.mediaMensal) : null;
  });

  // chartData usa o array "campoMonthlyArray"
  const chartData = {
    labels: MONTHS_PT,
    datasets: [
      {
        label: "Performance",
        data: campoMonthlyArray,
        fill: true,
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderColor: "#FFC107",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Mantém suas opções originais
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          color: "#FFF",
          callback: function (value) {
            return value;
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  // State for scouting confirmation
  const [jogadorConfirmado, setJogadorConfirmado] = useState(true);
  const handleToggleConfirmado = () => {
    setJogadorConfirmado(!jogadorConfirmado);
  };

  // Star ratings example
  const [ratings, setRatings] = useState({
    Tecnica: 2,
    Velocidade: 3,
    AtitudeCompetitiva: 1,
    Inteligencia: 0,
  });
  const friendlyNames = {
    Tecnica: "Técnica",
    Velocidade: "Velocidade",
    AtitudeCompetitiva: "Atitude Competitiva",
    Inteligencia: "Inteligência",
  };
  const handleRatingChange = (category, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  // Exemplo Relatórios Data (estático)
  const [relatoriosData] = useState([
    {
      id: 1,
      data: "2025-01-10",
      competicao: "Liga Regional",
      resultado: "3-1",
      observacoes: "Ótima atuação no segundo tempo.",
    },
    {
      id: 2,
      data: "2025-01-24",
      competicao: "Taça Juvenil",
      resultado: "2-2",
      observacoes: "Jogador se mostrou decisivo na defesa.",
    },
    {
      id: 3,
      data: "2025-02-02",
      competicao: "Amistoso",
      resultado: "1-0",
      observacoes: "Boas jogadas de ataque, mas precisa melhorar finalização.",
    },
  ]);

  return (
    <div className="atletaspersonalpage-container">
      {/* Top Action Buttons */}
      <div className="atletaspersonalpage-actions">
        <button className="atletaspersonalpage-action-button-left">Editar</button>
        <button className="atletaspersonalpage-action-button-right">Arquivar</button>
      </div>

      {/* Main Profile Card */}
      <div className="atletaspersonalpage-card">
        <div className="atletaspersonalpage-info">
          <h2 className="atletaspersonalpage-section-title">Atleta</h2>
          <h1 className="atletaspersonalpage-nome">
            {loading ? "Carregando..." : error ? "Erro ao carregar" : atleta?.nome}
          </h1>
          <p className="atletaspersonalpage-posicao">
            Ponta de Lança (PL){" "}
            <span className="atletaspersonalpage-text-secondary">Avançate</span>
          </p>
          <p className="atletaspersonalpage-idade">
            {atleta?.datanascimento || "--/--/----"}
            <span className="atletaspersonalpage-text-secondary">
              {atleta?.idade ? `${atleta.idade} anos` : "Idade não disponível"}
            </span>
          </p>
        </div>
        <div className="atletaspersonalpage-imagem"></div>
      </div>

      {/* Bottom Info Section */}
      <div className="atletaspersonalpage-detalhes">
        {/* Club and Nationality */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Clube</span>
            <span className="atletaspersonalpage-detail-value">
              {atleta?.clube?.nome || "Clube não informado"}
            </span>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Nacionalidade</span>
            <span className="atletaspersonalpage-detail-value">
              {atleta?.nacionalidades?.map((nacionalidade, index) => (
                <span key={nacionalidade.id_nacionalidade}>
                  {nacionalidade.designacao}
                  {index < atleta.nacionalidades.length - 1 ? ", " : ""}
                </span>
              )) || "Nacionalidade não informada"}
            </span>
          </div>
        </div>
        {/* Team and Escalation */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Equipa</span>
            <span className="atletaspersonalpage-detail-value">
              {atleta?.equipas?.map((equipa, index) => (
                <span key={index}>
                  {equipa.nome}
                  {index < atleta.equipas.length - 1 ? ", " : ""}
                </span>
              )) || "Sem equipa"}
            </span>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Escalão</span>
            <span className="atletaspersonalpage-detail-value">
              {atleta?.escalao?.designacao || "Escalão não definido"}
            </span>
          </div>
        </div>
        {/* Ratings */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Rating final</span>
            <span className="atletaspersonalpage-detail-value">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`atletaspersonalpage-star ${index < Math.floor(atleta?.ratingfinal || 0) ? "filled" : ""
                    }`}
                >
                  ★
                </span>
              ))}
            </span>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Rating médio</span>
            <span className="atletaspersonalpage-detail-value">
              {atleta?.ratinggeral?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
        {/* Confirmation and Removal */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Jogador confirmado</span>
            <label className="atletaspersonalpage-switch">
              <input
                type="checkbox"
                checked={jogadorConfirmado}
                onChange={handleToggleConfirmado}
              />
              <span className="atletaspersonalpage-slider"></span>
            </label>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-remove">Remover Jogador</span>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="atletaspersonalpage-graphs">
        {/* Line Graph */}
        <div className="atletaspersonalpage-graph">
          {/* SELECT MINÚSCULO no topo, canto direito */}
          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <select
              className="performance-select"
              value={campoSelecionado}
              onChange={(e) => setCampoSelecionado(e.target.value)}
            >
              <option value="velocidade">Velocidade</option>
              <option value="tecnica">Técnica</option>
              <option value="atitudecompetitiva">Atitude Competitiva</option>
              <option value="inteligencia">Inteligência</option>
            </select>
          </div>


          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Star Rating Chart */}
        <div className="atletaspersonalpage-star-chart">
          {Object.keys(ratings).map((category) => (
            <div className="atletaspersonalpage-star-row" key={category}>
              <span className="atletaspersonalpage-star-title">
                {friendlyNames[category] || category}
              </span>
              <div className="atletaspersonalpage-stars">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`atletaspersonalpage-star ${index < ratings[category] ? "filled" : ""
                      }`}
                    onClick={() => handleRatingChange(category, index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scouting Card */}
      <div className="atletaspersonalpage-card scouting-card">
        <div className="atletaspersonalpage-info scouting-info">
          <h2 className="atletaspersonalpage-section-title scouting-section-title">
            Encarregado
          </h2>
          <h1 className="atletaspersonalpage-nome scouting-nome">
            {loading
              ? "Carregando..."
              : error
                ? "Erro ao carregar"
                : atleta?.nomeencarregado || "Não informado"}
          </h1>
          <span className="atletaspersonalpage-text-secondary scouting-text-secondary">
            {atleta?.contactoencarregado || "Não informado"}
          </span>
        </div>
        <div className="atletaspersonalpage-imagem scouting-imagem"></div>
      </div>

      {/* Tabela de Relatórios */}
      <div className="relatorios-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Criado Por</th>
              <th>Morfologia</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.map((relatorio) => (
              <tr key={relatorio.id_relatorio}>
                <td>{new Date(relatorio.data).toLocaleDateString()}</td>
                <td>{relatorio["utilizador.nome"] || "N/A"}</td>
                <td>{relatorio.morfologia || "N/A"}</td>
                <td>{relatorio.apontamentos}</td>
                <td>
                  <div className="action-column">
                    <button className="action-button profile">Ver</button>
                    <button className="action-button remove">Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

