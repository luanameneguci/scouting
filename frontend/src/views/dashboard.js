import './dashboard.css';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  // State for storing game data
  const [games, setGames] = useState([]);

  // Simulating fetching data on component mount
  useEffect(() => {
    const gameData = [
      {
        team1: "Sporting",
        team2: "FC Porto",
        date: "2024-01-01T18:00:00Z",
        category: "Sub-15",
        coach: null
      },
      {
        team1: "Sporting",
        team2: "FC Porto",
        date: "2024-01-01T18:00:00Z",
        category: "Sub-15",
        coach: "Jorge Fonseca"
      }
    ];
    setGames(gameData);
  }, []); // Empty dependency array ensures it runs only once

  // JSX rendering
  return (
    <div className="dashboard">
      <title>Dashboard</title>
      <div className="sidebar">
        <h2>Ações rápidas</h2>
        <button>Criar relatório</button>
        <button>Adicionar jogo</button>
        <button>Adicionar atleta a analisar num jogo</button>
        <button>Adicionar atleta</button>
        <button>Atletas com maior rating</button>
        <button>Adicionar utilizador</button>
      </div>

      <section className="games">
        <h2>Próximos jogos</h2>
        <div id="game-container">
          {games.map((game, index) => (
            <div
              key={index}
              className={`game-card ${!game.coach ? 'pending' : ''}`}
            >
              <p>
                <strong>{game.team1}</strong> vs <strong>{game.team2}</strong>
              </p>
              <p>
                {new Date(game.date).toLocaleDateString()}{" "}
                {new Date(game.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}{" "}
                | {game.category}
              </p>
              <p>
                {game.coach ? (
                  `Treinador: ${game.coach}`
                ) : (
                  <em>Sem treinador atribuído</em>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
      <div class="stat athletes">
  <h3>Número de atletas</h3>
  <div class="athletes-content">
    <div class="ratings">
    <p>por ratings</p>
      <div><span>1</span> ★ <span>33 (5%)</span></div>
      <div><span>2</span> ★★ <span>33 (5%)</span></div>
      <div><span>3</span> ★★★ <span>33 (5%)</span></div>
      <div><span>4</span> ★★★★ <span>33 (5%)</span></div>
      <div><span>5</span> ★★★★★ <span>33 (5%)</span></div>
    </div>
    <div class="ages">
      <p>por idades</p>
      <div><span>&lt;14</span> <span>33 (5%)</span></div>
      <div><span>14-16</span> <span>33 (5%)</span></div>
      <div><span>17-19</span> <span>33 (5%)</span></div>
      <div><span>20-22</span> <span>33 (5%)</span></div>
      <div><span>&gt;23</span> <span>33 (5%)</span></div>
    </div>
  </div>
  <p class="total-athletes">999 atletas no total</p>
</div>

        <div className="stat reports">
          <h3>Relatórios</h3>
          <ul>
            <li>Foram criados <strong>13</strong> relatórios</li>
            <li>O rating médio é de <strong>3.6</strong></li>
            <li>Foram avaliados <strong>7</strong> jogos</li>
          </ul>
        </div>
        <div className="stat teams">
          <h3>Equipas Próprias</h3>
          <p>999 atletas no total</p>
        </div>
        <div className="stat shadow-teams">
          <h3>Equipas Sombra</h3>
          <p>999 atletas no total</p>
        </div>
      </section>
    </div>
  );
}
