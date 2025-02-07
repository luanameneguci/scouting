import "./dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { setupContentNavbarMargin } from "./utils";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ages, setAges] = useState([]);
  const [totalAthletes, setTotalAthletes] = useState([]);
  const [relatorios, setRelatorios] = useState({});
  const [equipasProprias, setEquipasProprias] = useState([]);
  const [equipasSombra, setEquipasSombra] = useState([]);
  const [ratingmedio, setRatingMedio] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const [
          gamesRes,
          ratingsRes,
          agesRes,
          totalAthletesRes,
          relatoriosRes,
          equipasSombraRes,
          equipasPropriasRes,
          ratingMedioRes
        ] = await Promise.all([
          axios.get("http://localhost:8080/jogo/dash", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/atleta/getRatingsData", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/atleta/getAgesData", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/atleta/getTotalAthletes", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/relatorio/relatoriosData", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/equipa/dashInfo" + 1, {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/equipa/dashInfo" + 2, {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/atleta/avgRating", {
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
        updateState(ratingsRes, setRatings);
        updateState(agesRes, setAges);
        updateState(totalAthletesRes, setTotalAthletes);
        updateState(relatoriosRes, setRelatorios);
        updateState(equipasSombraRes, setEquipasSombra);
        updateState(equipasPropriasRes, setEquipasProprias);
        updateState(ratingMedioRes, setRatingMedio);
      } catch (error) {
        console.error(
          "Error fetching data: ",
          error.response || error.message || error
        );
        alert("Error fetching data");
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchData();
  }, []);

  // Ensure the layout adjusts correctly
  useEffect(() => {
    setupContentNavbarMargin("dashboard");
  }, []);

  // JSX rendering
  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading data, please wait...</p>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <title>Dashboard</title>
      <div className="sidebar">
        <h2>Ações rápidas</h2>
        <NavLink to="/relatorios/adicionar" className="button">  Criar relatório </NavLink>
        <NavLink to="/jogos/adicionar" className="button">  Adicionar jogo </NavLink>
        <NavLink to="/home" className="button">  Adicionar atleta a analisar num jogo </NavLink>
        <NavLink to="/atletas/adicionar" className="button">  Adicionar atleta </NavLink>
        <NavLink to="/atletas/atletasrating" className="button">  Atletas com maior rating </NavLink>
        <NavLink to="/home" className="button">  Adicionar utilizador </NavLink>
      </div>

      <section className="games">
        <h2>Próximos jogos</h2>
        <div id="game-container">
          {games.map((game, index) => {
            // Extract the club names from the "clubes" array
            const club1 =
              game.JogoClubes[0]?.RelatedClube.nome || "Clube 1 Indisponível";
            const club2 =
              game.JogoClubes[1]?.RelatedClube.nome || "Clube 2 Indisponível";
            const escalao =
              game.escalao?.designacao || "Nenhum escalão associado";
            const utilizadores =
              game.UtilizadoresJogo[0]?.RelatedJogoUtilizador.nome ||
              "Nenhum treinador associado";

            return (
              <div
                key={index}
                className={`game-card ${!utilizadores ? "pending" : ""}`}
              >
                <p className="game-clubs">
                  {club1} vs {club2}
                </p>
                <p className="game-details">
                  {new Date(game.data).toLocaleDateString()} |{" "}
                  {new Date(game.data).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <p>Escalão: {escalao}</p>
                </p>
                <p className="game-coaches">
                  {utilizadores ? (
                    <strong>Treinador: {utilizadores}</strong>
                  ) : (
                    <em>Sem treinador atribuído</em>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="statsContainer">
       
          <div className="stat athletes">
            <h3>Número de atletas</h3>
            <div className="athletes-content">
              {/* Ratings Section */}
              <div className="ratings">
                <p>por ratings</p>
                {[1, 2, 3, 4, 5].map((stars, index) => (
                  <div key={index} className="rating-row">
                    <span className="stars">
                      {"★".repeat(stars)}
                      {""}
                      {"☆".repeat(5 - stars)}{" "}
                      {/* Visual representation of stars */}
                    </span>
                    <span>
                      {ratings[index]?.count || 0} (
                      {ratings[index]?.percentage || 0}%)
                    </span>
                  </div>
                ))}
              </div>

              {/* Ages Section */}
              <div className="ages">
                <p>por idades</p>
                {ages.map((age, index) => (
                  <div key={index}>
                    <span>{age.range}</span>{" "}
                    <span>
                      {age.count} ({age.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="total-athletes">{totalAthletes} atletas no total</p>
          </div>

          <div className="stat reports">
            <h3>Relatórios</h3>

            <div>
              <p>
                Foram criados{" "}
                <span className="numeroReports">{relatorios[0]}</span>{" "}
                relatórios nos últimos 7 dias
              </p>

              <p>
                Foram avaliados{" "}
                <span className="numeroReports">{relatorios[1]}</span> atletas
                nos últimos 7 dias
              </p>
              <p>
                O rating geral médio é {" "}
                  <span className="numeroReports">{ratingmedio}</span>
              </p>
            </div>
          </div>
      
      
          <div className="stat proprias">
            <h3>Equipas Próprias</h3>
            <div className="teams-content">
              {equipasProprias.map((equipa, index) => (
                <div key={index}>
                  <p>{equipa.escalao}</p>
                  <span>{equipa.quantidadeAtletasEscalao}</span>
                </div>
              ))}
            </div>
            <p className="total-athletes">
              {/*   {totalAtletasPropria} atletas no total */}
            </p>
          </div>
          <div className="stat sombra">
            <h3>Equipas Sombra</h3>
            <div className="teams-content">
              {equipasSombra.map((equipa, index) => (
                <div key={index}>
                  <p>{equipa.escalao}</p>
                  <p>{equipa.quantidadeAtletasEscalao}</p>
                </div>
              ))}
            </div>
            <p className="total-athletes">
              {/*  {totalAtletasSombra} atletas no total */}
            </p>
          </div>
       
      </div>
    </div>
  );
}
