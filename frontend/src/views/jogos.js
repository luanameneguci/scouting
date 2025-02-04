import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; // Importa o Link para navegação
import "./jogos.css";

export default function Jogos() {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesRes] = await Promise.all([
          axios.get("http://localhost:8080/jogo/dash", {
            withCredentials: true,
          }),
        ]);

        // Utility function to update state only if data is successful
        const updateState = (response, setter) => {
          if (response.data.success) {
            setter(response.data.data);
          }
        };
        updateState(gamesRes, setGames);
      } catch (error) {
        console.error(
          "Error fetching data: ",
          error.response || error.message || error
        );
        alert("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleAction = (action, identifier) => {
    alert(`Action: ${action}, Identifier: ${identifier}`);
  };

  const acoes = ["Editar", "Apagar", "+Atleta"];

  return (
    <div className="jogos-container">
      <h1 className="jogos-title">Jogos</h1>

      <div className="jogos-toolbar">
        <div className="jogos-search-container">
          <input
            type="text"
            placeholder="Pesquisar por nome do treinador"
            className="jogos-search-input"
          />
          <button className="jogos-search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        {/* Link para a página de Adicionar Jogo */}
        <Link to={"/jogos/adicionar"}>
          <button className="jogos-add-button">Adicionar</button>
        </Link>
      </div>

      <table className="jogos-table">
        <thead>
          <tr>
            <th className="jogos-table-col-atribuido">Atribuído</th>
            {/*             <th className="jogos-table-col-realizado">Realizado</th> */}
            <th>Escalão</th>
            <th>Data e Hora</th>
            <th>Treinador</th>
            <th>Clube 1</th>
            <th>Clube 2</th>
            <th className="jogos-table-col-acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {games.map((jogo, index) => (
          
            <tr key={index}>
              <td className="jogos-table-col-atribuido">
                {jogo.UtilizadoresJogo[0] ? (
                  <span className="material-symbols-outlined jogos-status-active">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined jogos-status-inactive"
                  onClick={() => navigate(`/jogos/atribuir-treinador/${jogo.id_jogo}`)}
                  style={{ cursor: "pointer", color: "red" }}
                  title="Atribuir Treinador"
                >
                    close
                  </span>
                )}
              </td>
              {/*  <td className="jogos-table-col-realizado">
                 ? (
                  <span className="material-symbols-outlined jogos-status-active">check</span>
                ) : (
                  <span className="material-symbols-outlined jogos-status-inactive">close</span>
                )}
              </td> */}
              <td>{jogo.escalao?.designacao}</td>
              <td>
                {new Date(jogo.data).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td>{jogo.UtilizadoresJogo[0]?.RelatedJogoUtilizador.nome}</td>
              <td>{jogo.JogoClubes[0]?.RelatedClube.nome}</td>
              <td>{jogo.JogoClubes[1]?.RelatedClube.nome}</td>
              <td className="jogos-table-col-acoes">
                <div className="jogos-actions">
                  {acoes.map((acao, index) => (
                    <button
                      key={index}
                      className={`jogos-actions-button jogos-actions-${acao
                        .toLowerCase()
                        .replace(" ", "-")}`}
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
}
