import './dashboard.css';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function Dashboard(){
    <div>
    <title>Dashboard</title>
<body>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="sidebar-header">
        <button class="menu-button">☰</button>
      </div>
      <div class="quick-actions">
        <h2>Ações rápidas</h2>
        <button>Criar relatório</button>
        <button>Adicionar jogo</button>
        <button>Adicionar atleta a analisar num jogo</button>
        <button>Adicionar atleta</button>
        <button>Atletas com maior rating</button>
        <button>Adicionar utilizador</button>
        <button>Ver equipas sombra</button>
        <button>Ver equipas próprias</button>
        <button>Enviar notificação a todos os utilizadores</button>
      </div>
    </aside>

    <main class="main-content">
      <section class="games">
        <h2>Jogos desta semana</h2>
        <div class="game-card pending">
          <p><strong>Sporting</strong> vs <strong>FC Porto</strong></p>
          <p>01 Jan, 18:00 | Sub-15</p>
          <p><em>Sem treinador atribuído</em></p>
        </div>
        <div class="game-card">
          <p><strong>Sporting</strong> vs <strong>FC Porto</strong></p>
          <p>01 Jan, 18:00 | Sub-15</p>
          <p>Treinador: Jorge Fonseca</p>
        </div>
        <div class="game-card result">
          <p><strong>Sporting</strong> 2 vs 0 <strong>FC Porto</strong></p>
          <p>Treinador: Jorge Fonseca</p>
        </div>
      </section>

      <section class="stats">
        <div class="stat athletes">
          <h3>Número de atletas</h3>
          <p>5 ★★★★★ | 33 (5%)</p>
          <p>999 atletas no total</p>
        </div>
        <div class="stat reports">
          <h3>Relatórios</h3>
          <ul>
            <li>Foram criados <strong>13</strong> relatórios</li>
            <li>O rating médio é de <strong>3.6</strong></li>
            <li>Foram avaliados <strong>7</strong> jogos</li>
          </ul>
        </div>
        <div class="stat teams">
          <h3>Equipas Próprias</h3>
          <p>999 atletas no total</p>
        </div>
        <div class="stat shadow-teams">
          <h3>Equipas Sombra</h3>
          <p>999 atletas no total</p>
        </div>
      </section>
    </main>
  </div>
</body>
</div>

}