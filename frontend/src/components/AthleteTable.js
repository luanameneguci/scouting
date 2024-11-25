import React from "react";
import "./AthleteTable.css"; // Create this CSS file to match your image styling.

const AthleteTable = () => {
  const athletes = [
    {
      estado: "Ativo",
      nome: "John Doe",
      rating: 5,
      posicao: "PL ATA",
      ano: 2008,
      escalao: "Sub-17",
      nacionalidade: "Portugal",
      acoes: "Remover Perfil",
    },
    {
      estado: "Inativo",
      nome: "John Doe",
      rating: 5,
      posicao: "PL ATA",
      ano: 2008,
      escalao: "Sub-17",
      nacionalidade: "Portugal",
      acoes: "Adicionar Perfil",
    },
    {
      estado: "Ativo",
      nome: "John Doe",
      rating: 4,
      posicao: "PL ATA",
      ano: 2008,
      escalao: "Sub-17",
      nacionalidade: "Portugal",
      acoes: "Adicionar Perfil",
    },
  ];

  return (
    <div className="athlete-table">
      <div className="table-header">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar por nome de atleta"
        />
        <button className="add-button">Adicionar</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Nome</th>
            <th>Rating</th>
            <th>Posição</th>
            <th>Ano</th>
            <th>Escalão</th>
            <th>Nacionalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete, index) => (
            <tr key={index}>
              <td>{athlete.estado}</td>
              <td>{athlete.nome}</td>
              <td>
                {athlete.rating}{" "}
                {"★".repeat(athlete.rating).padEnd(5, "☆")}
              </td>
              <td>{athlete.posicao}</td>
              <td>{athlete.ano}</td>
              <td>{athlete.escalao}</td>
              <td>
                <img
                  src={`https://flagcdn.com/16x12/${athlete.nacionalidade
                    .toLowerCase()
                    .substring(0, 2)}.png`}
                  alt={athlete.nacionalidade}
                  className="flag-icon"
                />{" "}
                {athlete.nacionalidade}
              </td>
              <td>
                <button
                  className={`action-button ${
                    athlete.acoes === "Remover Perfil"
                      ? "remove"
                      : "add"
                  }`}
                >
                  {athlete.acoes}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteTable;
