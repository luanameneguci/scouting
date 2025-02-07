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
import { useParams, useNavigate } from "react-router-dom";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

export default function Atletaspersonalpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatorios, setRelatorios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [escalao, setEscalao] = useState(null);
  const [posicao, setPosicao] = useState(null);

  // ★ Novo estado: "equipa" para armazenar a designação do tipoequipa
  const [equipa, setEquipa] = useState(null);

  // ---------------------------------------------------------
  // 1) Buscar o "nome" (na verdade 'designacao') da equipa
  //    via /equipa/byatleta/:id
  // ---------------------------------------------------------
  useEffect(() => {
    async function fetchEquipaAtleta() {
      try {
        // Ajuste a rota conforme seu EquipaRouter:
        // Se for "GET /equipa/byatleta/:id", use a URL abaixo:
        const response = await fetch(`http://localhost:8080/equipa/byatleta/${id}`);
        if (!response.ok) throw new Error("Equipa do atleta não encontrada");
        const data = await response.json();
        // data.equipa.designacao é o que definimos no Controller
        if (data.equipa) {
          setEquipa(data.equipa.designacao); // Ex: "FC Barcelona"
        }
      } catch (error) {
        console.error("Erro ao buscar equipa do atleta:", error);
      }
    }
    fetchEquipaAtleta();
  }, [id]);

  // ---------------------------------------------------------
  // 2) Buscar dados do Atleta (já existia)
  // ---------------------------------------------------------
  useEffect(() => {
    async function fetchAtleta() {
      try {
        const response = await fetch(`http://localhost:8080/atleta/${id}`);
        if (!response.ok) throw new Error("Atleta não encontrado");
        const data = await response.json();
        setAtleta(data);

        // Se houver escalão
        if (data.escalao) {
          setEscalao(data.escalao.designacao);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAtleta();
  }, [id]);

    useEffect(() => {
    async function fetchAtleta() {
      try {
        const response = await fetch(`http://localhost:8080/atleta/${id}`);
        if (!response.ok) throw new Error("Atleta não encontrado");
        const data = await response.json();
        setAtleta(data);

        // Armazena a primeira posição do atleta (se houver)
        if (data.posicoes?.length > 0) {
          setPosicao(data.posicoes[0].designacao);
        }

        // Verifica se o escalão do atleta está disponível
        if (data.escalao) {
          setEscalao(data.escalao.designacao);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAtleta();
  }, [id]);


  useEffect(() => {
    async function fetchRelatorios() {
      try {
        const response = await fetch(
          `http://localhost:8080/relatorio/${id}?page=${currentPage}&limit=5`
        );
        if (!response.ok) throw new Error("Erro ao buscar relatórios");
        const data = await response.json();
        setRelatorios(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    fetchRelatorios();
  }, [id, currentPage]);

  // ---------------------------------------------------------
  // 3) Buscar dados do Atleta (novamente, para posicoes, etc.)
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // 4) Buscar últimos ratings (sem mudanças)
  // ---------------------------------------------------------
  const [ratings, setRatings] = useState({
    Tecnica: 2,
    Velocidade: 3,
    AtitudeCompetitiva: 1,
    Inteligencia: 0,
  });

  useEffect(() => {
    async function fetchLatestRatings() {
      try {
        console.log(`Buscando últimos ratings para o atleta ${id}...`);
        const response = await fetch(`http://localhost:8080/relatorio/ultimos/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar últimas avaliações");
        const json = await response.json();
        console.log("Dados recebidos do backend:", json);

        if (json.success && json.data) {
          setRatings({
            Tecnica: json.data.tecnica ?? 0,
            Velocidade: json.data.velocidade ?? 0,
            AtitudeCompetitiva: json.data.atitudecompetitiva ?? 0,
            Inteligencia: json.data.inteligencia ?? 0,
          });
        } else {
          setRatings({
            Tecnica: 0,
            Velocidade: 0,
            AtitudeCompetitiva: 0,
            Inteligencia: 0,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar últimas avaliações:", error);
        setRatings({
          Tecnica: 0,
          Velocidade: 0,
          AtitudeCompetitiva: 0,
          Inteligencia: 0,
        });
      }
    }
    fetchLatestRatings();
  }, [id]);

  // ---------------------------------------------------------
  // 5) Buscar relatórios (lista) do Atleta
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // 6) Dropdown: selecionar qual atributo mostrar (velocidade, etc.)
  // ---------------------------------------------------------
  const [campoSelecionado, setCampoSelecionado] = useState("velocidade");
  const [campoMensalData, setCampoMensalData] = useState([]);

  useEffect(() => {
    async function fetchCampoMensal() {
      try {
        const response = await fetch(
          `http://localhost:8080/relatorio/mensal/${id}?campo=${campoSelecionado}`
        );
        if (!response.ok)
          throw new Error("Erro ao buscar médias mensais de " + campoSelecionado);
        const json = await response.json();
        if (json.success) {
          setCampoMensalData(json.data);
        }
      } catch (error) {
        console.error("Erro ao buscar medias de " + campoSelecionado, error);
      }
    }
    fetchCampoMensal();
  }, [id, campoSelecionado]);

  // chart config
  const MONTHS_PT = ["Jan","Fev","Mar","Abril","Maio","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const currentYear = new Date().getFullYear();
  const campoMonthlyArray = MONTHS_PT.map((_, index) => {
    const monthNumber = String(index + 1).padStart(2, "0");
    const yearMonth = `${currentYear}-${monthNumber}`;
    const found = campoMensalData.find((item) => item.mes === yearMonth);
    return found ? Number(found.mediaMensal) : null;
  });

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
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#FFF" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        min: 0.8,
        max: 5.2,
        ticks: {
          color: "#fff",
          stepSize: 1,
          callback: function (value) {
            if (value < 1) return 1;
            if (value > 5) return 5;
            return value;
          },
        },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
  };

  // ---------------------------------------------------------
  // 7) Botão de removerAtleta
  // ---------------------------------------------------------
  const removerAtleta = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja remover este atleta?");
    if (!confirmacao) return;
    try {
      const response = await fetch("http://localhost:8080/atleta/apagar", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_atleta: id }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Atleta removido com sucesso.");
        navigate("/atletas");
      } else {
        alert("Erro ao remover atleta: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao remover atleta:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };

  // Jogador confirmado
  const [jogadorConfirmado, setJogadorConfirmado] = useState(true);
  const handleToggleConfirmado = () => setJogadorConfirmado(!jogadorConfirmado);

  // Star ratings local
  const friendlyNames = {
    Tecnica: "Técnica",
    Velocidade: "Velocidade",
    AtitudeCompetitiva: "Atitude Competitiva",
    Inteligencia: "Inteligência",
  };

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
            Posição {posicao ? `(${posicao})` : "(Posição não definida)"}{" "}
            <span className="atletaspersonalpage-text-secondary">
              {escalao || "Escalão não definido"}
            </span>
          </p>
          <p className="atletaspersonalpage-idade">
            {atleta?.datanascimento || "--/--/----"}{" "}
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
              {atleta?.nacionalidades?.length > 0
                ? atleta.nacionalidades[0].designacao
                : "Nacionalidade não informada"}
            </span>
          </div>
        </div>

        {/* Equipa (via "equipa" state) e Escalão */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Equipa</span>
            <span className="atletaspersonalpage-detail-value">
              {/* Mostra a designacao do tipoequipa (ex "FC Barcelona") */}
              {equipa || "Sem equipa"}
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
                  className={`atletaspersonalpage-star ${
                    index < Math.floor(atleta?.ratingfinal || 0) ? "filled" : ""
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
            <button
              className="atletaspersonalpage-detail-remove"
              onClick={removerAtleta}
            >
              Remover Jogador
            </button>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="atletaspersonalpage-graphs">
        {/* Line Graph */}
        <div className="atletaspersonalpage-graph">
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
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="atletaspersonalpage-graph" style={{ height: "250px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
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
                    className={`atletaspersonalpage-star ${
                      index < ratings[category] ? "filled" : ""
                    }`}
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
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima ▶
          </button>
        </div>
      </div>
    </div>
  );
}

  