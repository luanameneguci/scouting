import React from "react";
import './atletas.css';
import { Link } from "react-router-dom";

export default function Atletas() {
  return (
    <div className="atletas-page">
      <h1 className="TituloEquipas">Atletas</h1>
      <div className="searchbar-wrapper-atletas">
        {/* Search bar */}
        <div className="searchbar bg-color-gray-800 rounded-pill">
          <input
            type="text"
            className="form-control"
            placeholder="Procurar por nome de atleta"
          />
          <span className="material-symbols-outlined icon">search</span>
        </div>
        {/* Add Button */}
        <Link to="/atletas/adicionar">
          <button className="add-button">Adicionar</button>
        </Link>
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
              <Link to="/atletas/pagina">
                <button className="action-button profile">Perfil</button>
              </Link>
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
              <Link to="/atletas/pagina">
                <button className="action-button profile">Perfil</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
