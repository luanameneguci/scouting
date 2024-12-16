import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import './jogos.css';

const Jogos = () => {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const handleAction = (action, identifier) => {
    alert(`Action: ${action}, Identifier: ${identifier}`);
  };

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const jogos = [
    {
      atribuido: true,
      realizado: true,
      "data e hora": "15/12/2024 18:00",
      treinador: "Rui Marques",
      "clube (casa)": "SL Benfica",
      "clube (fora)": "FC Porto",
      acoes: ["Editar", "Remover"]
    },
    {
      atribuido: true,
      realizado: true,
      "data e hora": "15/12/2024 18:00",
      treinador: "Rui Marques",
      "clube (casa)": "FC Porto",
      "clube (fora)": "SL Benfica",
      acoes: ["Editar", "Remover"]
    },
    {
      atribuido: false,
      realizado: true,
      "data e hora": "15/12/2024 18:00",
      treinador: "-",
      "clube (casa)": "SL Benfica",
      "clube (fora)": "FC Porto",
      acoes: ["Editar", "Remover"]
    }
  ];

  return (
    <div className="jogos-container">
      <h1 className="jogos-title">Jogos</h1>
      
      <div className="jogos-toolbar">
        <div className="jogos-search-container">
          <input 
            type="text" 
            placeholder="Pesquisar por nome de atleta" 
            className="jogos-search-input" 
          />
          <button className="jogos-search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        {/* Link para a página de Adicionar Jogo */}
        <Link to={'/jogos/adicionarjogo'}>
          <button className="jogos-add-button">Adicionar</button>
        </Link>
      </div>

      <table className="jogos-table">
        <thead>
          <tr>
            <th className="jogos-table-col-atribuido">Atribuído</th>
            <th className="jogos-table-col-realizado">Realizado</th>
            <th>Data e Hora</th>
            <th>Treinador</th>
            <th>Clube (casa)</th>
            <th>Clube (fora)</th>
            <th className="jogos-table-col-acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogos.map((jogo, index) => (
            <tr key={index}>
              <td className="jogos-table-col-atribuido">
                {jogo.atribuido ? (
                  <span className="material-symbols-outlined jogos-status-active">check</span>
                ) : (
                  <span className="material-symbols-outlined jogos-status-inactive">close</span>
                )}
              </td>
              <td className="jogos-table-col-realizado">
                {jogo.realizado ? (
                  <span className="material-symbols-outlined jogos-status-active">check</span>
                ) : (
                  <span className="material-symbols-outlined jogos-status-inactive">close</span>
                )}
              </td>
              <td>{truncateText(jogo["data e hora"])}</td>
              <td>{truncateText(jogo.treinador)}</td>
              <td>{truncateText(jogo["clube (casa)"])}</td>
              <td>{truncateText(jogo["clube (fora)"])}</td>
              <td className="jogos-table-col-acoes">
                <div className="jogos-actions">
                  {jogo.acoes.map((acao, index) => (
                    <button 
                      key={index}
                      className={`jogos-actions-button jogos-actions-${acao.toLowerCase().replace(' ', '-')}`}
                      onClick={() => handleAction(acao, jogo["data e hora"])}
                    >
                      {acao}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jogos;
