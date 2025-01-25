import "./dashboard.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Dashboard() {
  // State for storing game data
  const [games, setGames] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ages, setAges] = useState([]);
  const [totalAthletes, setTotalAthletes] = useState([]);
  const [relatorios, setRelatorios] = useState({});
  const [equipasProprias, setEquipasProprias] = useState({});
  const [equipasSombra, setEquipasSombra] = useState({});
  const [ratingMedio, setRatingMedio] = useState([]);

   //-------------------------Fetching data from jogos
   useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from multiple endpoints concurrently
        const [
          gamesRes,
          ratingsRes,
          agesRes,
          totalAthletesRes,
          relatoriosRes,
          equipasSombraRes,
          equipasPropriasRes
        ] = await Promise.all([
          axios.get("http://localhost:8080/jogo"),
          axios.get("http://localhost:8080/atleta/getRatingsData"),
          axios.get("http://localhost:8080/atleta/getAgesData"),
          axios.get("http://localhost:8080/atleta/getTotalAthletes"),
          axios.get("http://localhost:8080/relatorio/relatoriosData"),
          axios.get("http://localhost:8080/equipa/dashInfo"+1),
          axios.get("http://localhost:8080/equipa/dashInfo"+2),
        ]);
  
        // Debugging: log each API response to check their data
        console.log("Games Response: ", gamesRes.data);
        console.log("Ratings Response: ", ratingsRes.data);
        console.log("Ages Response: ", agesRes.data);
        console.log("Total Athletes Response: ", totalAthletesRes.data);
        console.log("Relatorios Response: ", relatoriosRes.data);
  
        // Check if each API response is successful and update state
        if (gamesRes.data.success) {
          setGames(gamesRes.data.data);
        } 
  
        if (ratingsRes.data.success) {
          setRatings(ratingsRes.data.data);
        } 
  
        if (agesRes.data.success) {
          setAges(agesRes.data.data);
        } 
  
        if (totalAthletesRes.data.success) {
          setTotalAthletes(totalAthletesRes.data.data);
        } 
  
        if (relatoriosRes.data.success) {
          setRelatorios(relatoriosRes.data);
        } 

        if (equipasSombraRes.data.success) {
          setEquipasSombra(equipasPropriasRes.data);
        }

        if (equipasPropriasRes.data.success) {
          setEquipasProprias(equipasPropriasRes.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error); // Log the complete error object
        alert("Error fetching data");
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
  

    const ratingMedioData = [3.6];
    setRatingMedio(ratingMedioData);

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
            const utilizadores = game.utilizadors?.[0].nome || "Nenhum treinador associado";

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
              {[1, 2, 3, 4, 5].map((stars, index) => (
                <div key={index} className="rating-row">
                  <span className="stars">
                    {"★".repeat(stars)}{""}
                    {"☆".repeat(5 - stars)} {/* Visual representation of stars */}
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
                <span className="numeroReports">
                {relatorios.quantidadeRelatorios}
                </span>{" "}
                relatórios nos últimos 7 dias
              </p>
              <p>
               {/*  O rating médio é de{" "}
                <span className="numeroReports">{relatorios.ratingMedio}</span> */}
              </p>
              <p>
                Foram avaliados{" "}
                <span className="numeroReports">
                  {relatorios.quantidadeAtletasAvaliados}
                </span>{" "}
                atletas nos últimos 7 dias
              </p>
            </div>
        
        </div>
        <div className="stat teams">
          <h3>Equipas Próprias</h3>
          <div className="teams-content">           
              <div>
                <span>{equipasProprias.escalao}</span>
                <span>{equipasProprias.quantidadeAtletasEscalao}</span>
              </div>
   
          </div>
          <p className="total-athletes">
          {/*   {totalAtletasPropria} atletas no total */}
          </p>
        </div>
        <div className="stat teams">
          <h3>Equipas Sombra</h3>
          <div className="teams-content">           
              <div>
                <span>{equipasSombra.escalao}</span>
                <span>{equipasSombra.quantidadeAtletasEscalao}</span>
              </div>        
          </div>
          <p className="total-athletes">
           {/*  {totalAtletasSombra} atletas no total */}
          </p>
        </div>
      </section>
    </div>
  );
}
