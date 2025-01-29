import React, { useState } from "react";
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
import { useEffect } from "react";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

export default function Atletaspersonalpage() {
  const { id } = useParams(); // Captura o ID da URL
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAtleta() {
      try {
        const response = await fetch(`http://localhost:8080/atleta/${id}`); // Altere a URL se necessário
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
  const [jogadorConfirmado, setJogadorConfirmado] = useState(true);
  const [ratings, setRatings] = useState({
    Tecnica: 2,
    Velocidade: 3,
    AtitudeCompetitiva: 1,
    Inteligencia: 0,
  });

  // Friendly names mapping
  const friendlyNames = {
    Tecnica: "Técnica",
    Velocidade: "Velocidade",
    AtitudeCompetitiva: "Atitude Competitiva",
    Inteligencia: "Inteligência",
  };

  const handleToggleConfirmado = () => {
    setJogadorConfirmado(!jogadorConfirmado);
  };

  const handleRatingChange = (category, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  // Line chart data and options
  const chartData = {
    labels: ["Jan", "Fev", "Mar", "Abril", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: "Performance",
        data: [3, 2, 2, 3, 4, 4, 3, 4, 4, 3, 3, 2], // Replace with dynamic backend data if needed
        fill: true,
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderColor: "#FFC107",
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
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
        min: 1, // Start at 1
        max: 5, // End at 5
        ticks: {
          stepSize: 1, // Increment by 1
          color: "#FFF",
          callback: function (value) {
            return value; // Display only integer values on the Y-axis
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
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
            Ponta de Lança (PL) <span className="atletaspersonalpage-text-secondary">Avançate</span>
          </p>
          <p className="atletaspersonalpage-idade">
            12/12/2000 <span className="atletaspersonalpage-text-secondary">20 anos</span>
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
            <span className="atletaspersonalpage-detail-value">Simba SC</span>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Nacionalidade</span>
            <span className="atletaspersonalpage-detail-value">Portugal</span>
          </div>
        </div>
        {/* Team and Escalation */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Equipa</span>
            <span className="atletaspersonalpage-detail-value">Sombra</span>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Escalão</span>
            <span className="atletaspersonalpage-detail-value">Sub 23</span>
          </div>
        </div>
        {/* Ratings */}
        <div className="atletaspersonalpage-detail-container">
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Rating final</span>
            <span className="atletaspersonalpage-detail-value">★★★★★</span>
          </div>
          <div className="atletaspersonalpage-detail-box">
            <span className="atletaspersonalpage-detail-title">Rating médio</span>
            <span className="atletaspersonalpage-detail-value">3.6</span>
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
    </div>
  );
}
