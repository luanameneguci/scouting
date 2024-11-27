import React from "react";
import './atletas.css';

export default function Atletas() {
  return (
    <div className="atletas-page">
      <h1 className="TituloEquipas">Atletas</h1>
      <div className="searchbar-wrapper">
        {/* Barra de busca */}
        <div className="searchbar-container">
          <input
            type="text"
            className="searchbar-input"
            placeholder="Procurar por nome de atleta"
          />
          <span className="searchbar-icon material-symbols-outlined">search</span>
        </div>
        {/* Botão Adicionar */}
        <button className="add-button">Adicionar</button>
      </div>
      {/* Tabela */}
      <table className="custom-table">
        <thead>
          <tr>
            <th className="text-left">Estado</th>
            <th className="text-left">Nome</th>
            <th className="text-left">Rating</th>
            <th className="text-left">Posição</th>
            <th className="text-left">Ano</th>
            <th className="text-left">Escalão</th>
            <th className="text-left">Nacionalidade</th>
            <th className="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">Ativo</td>
            <td className="text-left">John Doe</td>
            <td className="text-left">5 ★★★★★</td>
            <td className="text-left">PL <span className="text-secondary">ATA</span></td>
            <td className="text-left">2008</td>
            <td className="text-left">Sub-17</td>
            <td className="text-left">
              <span role="img" aria-label="Portugal">🇵🇹</span> Portugal
            </td>
            <td className="text-left action-column">
              <button className="action-button remove">Remover</button>
              <button className="action-button profile">Perfil</button>
            </td>
          </tr>
          <tr>
            <td className="text-left">Inativo</td>
            <td className="text-left">John Doe</td>
            <td className="text-left">5 ★★★★★</td>
            <td className="text-left">PL <span className="text-secondary">ATA</span></td>
            <td className="text-left">2008</td>
            <td className="text-left">Sub-17</td>
            <td className="text-left">
              <span role="img" aria-label="Portugal">🇵🇹</span> Portugal
            </td>
            <td className="text-left action-column">
              <button className="action-button remove">Remover</button>
              <button className="action-button profile">Perfil</button>
            </td>
          </tr>
          <tr>
            <td className="text-left">Ativo</td>
            <td className="text-left">John Doe</td>
            <td className="text-left">4 ★★★★</td>
            <td className="text-left">PL <span className="text-secondary">ATA</span></td>
            <td className="text-left">2008</td>
            <td className="text-left">Sub-17</td>
            <td className="text-left">
              <span role="img" aria-label="Portugal">🇵🇹</span> Portugal
            </td>
            <td className="text-left action-column">
              <button className="action-button remove">Remover</button>
              <button className="action-button profile">Perfil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
