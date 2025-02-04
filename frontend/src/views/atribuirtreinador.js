import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./credenciais.css"; // Assuming a CSS file for table styles

export default function AtribuirTreinador() {
  const { id } = useParams();
  const [treinadores, setTreinadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/utilizador/treinadores")
      .then((res) => res.json())
      .then((data) => setTreinadores(data.data || []))
      .catch(console.error);
  }, []);

  const handleAssignTreinador = async (treinadorId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/utilizador/associar-jogo-existente/${treinadorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ treinadorId }),
        }
      );

      if (!response.ok) throw new Error("Erro ao atribuir treinador");
      alert("Treinador atribuído com sucesso!");
      navigate("/jogos");
    } catch (error) {
      console.error(error);
      alert("Erro ao atribuir treinador");
    }
  };

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Atribuir treinador</h1>
      <table className="credentials-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {treinadores.map((treinador) => (
            <tr key={treinador.email}>
              <td>{treinador.nome}</td>
              <td>{treinador.telefone}</td>
              <td>{treinador.email}</td>
              <td>
                <button
                  className="credentials-actions-button credentials-actions-select"
                  onClick={() => handleAssignTreinador(treinador.id_utilizador)}
                >
                  Selecionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
