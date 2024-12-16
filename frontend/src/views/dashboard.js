import "./dashboard.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Dashboard() {
  // State for storing game data
  const [games, setGames] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ages, setAges] = useState([]);
  const [totalAthletes, setTotalAtheles] = useState([]);
  const [totalAtletasSombra, setTotalAtletasSombra] = useState([]);
  const [totalAtletasPropria, setTotalAtletasPropria] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [equipasProprias, setEquipasProprias] = useState([]);
  const [equipasSombra, setEquipasSombra] = useState([]);

  //-------------------------Umas funçoes
  const formatDate = (date) => {
    console.log(date); // Log the raw date value to check
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "Invalid Date"; // Return a fallback string if the date is invalid
    }
    return parsedDate.toLocaleDateString();
  };
  
  const formatTime = (date) => {
    console.log(date); // Log the raw date value to check
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "Invalid Time"; // Return a fallback string if the time is invalid
    }
    return parsedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };  
  //-------------------------Umas funçoes

  //-------------------------Fetching data from jogos
useEffect(() => {
const url = "http://localhost:8080/jogo/";
axios.get(url)
.then(res => {
if(res.data.success){
const games = res.data.data;
setGames(games);
}else{
alert("Error Web Service!");
}
})
.catch(error => {
alert(error)
});
},[]);

  useEffect(() => {
    const equipasPropriasData = [
      {
        escalao: "Sub-19",
        quantidadeAtletasEscalao: 9,
      },
      {
        escalao: "Sub-16",
        quantidadeAtletasEscalao: 7,
      },
    ];
    setEquipasProprias(equipasPropriasData);

    const equipasSombraData = [
      {
        escalao: "Sub-19",
        quantidadeAtletasEscalao: 8,
      },
      {
        escalao: "Sub-16",
        quantidadeAtletasEscalao: 5,
      },
    ];
    setEquipasSombra(equipasSombraData);

 /*    const gameData = [
      {
        team1: "Sporting",
        team2: "FC Porto",
        date: "2024-01-01T18:00:00Z",
        category: "Sub-15",
        coach: null,
      },
      {
        team1: "Sporting",
        team2: "FC Porto",
        date: "2024-01-01T18:00:00Z",
        category: "Sub-15",
        coach: "Jorge Fonseca",
      },
    ];
    setGames(gameData);
 */

    const ratingsData = [
      { stars: 1, count: 33, percentage: 5 },
      { stars: 2, count: 33, percentage: 5 },
      { stars: 3, count: 33, percentage: 5 },
      { stars: 4, count: 33, percentage: 5 },
      { stars: 5, count: 33, percentage: 5 },
    ];
    setRatings(ratingsData);

    const agesData = [
      { range: "<14", count: 33, percentage: 5 },
      { range: "14-16", count: 33, percentage: 5 },
      { range: "17-19", count: 33, percentage: 5 },
      { range: "20-22", count: 33, percentage: 5 },
      { range: ">23", count: 33, percentage: 5 },
    ];
    setAges(agesData);

    const totalAthletesData = [999];
    setTotalAtheles(totalAthletesData);

    const totalAtletasPropriaData = [999];
    setTotalAtletasPropria(totalAtletasPropriaData);

    const totalAtletasSombraData = [999];
    setTotalAtletasSombra(totalAtletasSombraData);

    const relatoriosData = [
      {
        quantidadeRelatorios: 13,
        ratingMedio: 3.6,
        quantidadeAtletasAvaliados: 7,
      },
    ];
    setRelatorios(relatoriosData);
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
    {games.map((game, index) => {
      // Extract the club names from the "clubes" array
      const club1 = game.clubes?.[0]?.nome || "Clube 1 Indisponível";
      const club2 = game.clubes?.[1]?.nome || "Clube 2 Indisponível";
      const escalao = game.escalao?.designacao || "Nenhum escalão associado";
      const utilizadores = game.utilizadors?.[0].nome || "Nenhum escalão associado";

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

      <section className="stats">
        <div className="stat athletes">
          <h3>Número de atletas</h3>
          <div className="athletes-content">
            {/* Ratings Section */}
            <div className="ratings">
              <p>por ratings</p>
              {ratings.map((rating) => (
                <div key={rating.stars}>
                  <span>
                    {rating.stars} {"★".repeat(rating.stars)}
                  </span>
                  <span>
                    {rating.count} ({rating.percentage}%)
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
          {relatorios.map((relatorio, index) => (
            <div key={index}>
              <p>
                Foram criados{" "}
                <span className="numeroReports">
                  {relatorio.quantidadeRelatorios}
                </span>{" "}
                relatórios nos últimos 7 dias
              </p>
              <p>
                O rating médio é de{" "}
                <span className="numeroReports">{relatorio.ratingMedio}</span>
              </p>
              <p>
                Foram avaliados{" "}
                <span className="numeroReports">
                  {relatorio.quantidadeAtletasAvaliados}
                </span>{" "}
                atletas nos últimos 7 dias
              </p>
            </div>
          ))}
        </div>
        <div className="stat teams">
          <h3>Equipas Próprias</h3>
          <div className="teams-content">
          {equipasProprias.map((equipa, index) => (
            <div key={index}>
             <span>{equipa.escalao}</span>
             <span>{equipa.quantidadeAtletasEscalao}</span>
            </div>
          ))}
          </div>
          <p className="total-athletes">
            {totalAtletasPropria} atletas no total
          </p>
        </div>
        <div className="stat teams">
          <h3>Equipas Sombra</h3>
          <div className="teams-content">
            {equipasSombra.map((equipa, index) => (
              <div key={index}>
                <span>{equipa.escalao}</span>
                <span>{equipa.quantidadeAtletasEscalao}</span>
              </div>
            ))}
          </div>
          <p className="total-athletes">
            {totalAtletasSombra} atletas no total
          </p>
        </div>
      </section>
    </div>
  );
}
