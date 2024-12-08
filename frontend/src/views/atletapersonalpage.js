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

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

export default function Atletaspersonalpage() {
  const [jogadorConfirmado, setJogadorConfirmado] = useState(true);
  const [ratings, setRatings] = useState({
    tecnica: 2,
    velocidade: 3,
    atitudeCompetitiva: 1,
    inteligencia: 0,
  });

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
        data: [3, 2, 4, 5, 4, 5, 3, 4, 5, 6, 7, 8], // Replace with dynamic backend data if needed
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
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "#FFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#FFF",
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
          <h1 className="atletaspersonalpage-nome">Francisco Machado</h1>
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
      <div className="atletaspersonalpage-graphs-container">
        {/* Line Graph */}
        <div className="atletaspersonalpage-graph">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Star Rating Chart */}
        <div className="atletaspersonalpage-star-chart">
          {Object.keys(ratings).map((category) => (
            <div className="atletaspersonalpage-star-row" key={category}>
              <span className="atletaspersonalpage-star-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="atletaspersonalpage-stars">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`atletaspersonalpage-star ${
                      index < ratings[category] ? "filled" : ""
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
