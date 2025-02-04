import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AtribuirTreinador() {
  const { id } = useParams();
  const [treinadores, setTreinadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/treinadores/listar")
      .then((res) => res.json())
      .then((data) => setTreinadores(data.data || []))
      .catch(console.error);
  }, []);

  const handleAssignTreinador = async (treinadorId) => {
    try {
      const response = await fetch(`http://localhost:8080/jogos/atribuir/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treinadorId }),
      });

      if (!response.ok) throw new Error("Erro ao atribuir treinador");
      alert("Treinador atribuído com sucesso!");
      navigate("/jogos");
    } catch (error) {
      console.error(error);
      alert("Erro ao atribuir treinador");
    }
  };

  return (
    <div>
      <h1>Selecionar Treinador para o Jogo {id}</h1>
      <ul>
        {treinadores.map((treinador) => (
          <li key={treinador.id}>
            {treinador.nome}{" "}
            <button onClick={() => handleAssignTreinador(treinador.id)}>
              Selecionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
