import React, { useEffect, useState } from "react";
import "./atletas.css";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

export default function Atletas() {
  const [atletas, setAtletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Função para buscar atletas
  const fetchAtletas = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/atleta/listar?page=${pageNum}&size=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Erro ao buscar atletas");
      const data = await response.json();
      setAtletas(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Erro ao buscar atletas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os atletas quando a página muda
  useEffect(() => {
    fetchAtletas(page);
  }, [page]);

  // Filtro por nome
  const filteredAtletas = atletas.filter((atleta) =>
    atleta.nome.toLowerCase().includes(search.toLowerCase())
  );

  // Remover Atleta
  const removerAtleta = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja remover este atleta?");
    if (!confirmacao) return;

    try {
      const response = await fetch("http://localhost:8080/atleta/apagar", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_atleta: id }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Atleta removido com sucesso.");
        fetchAtletas(page); // Recarrega a lista
      } else {
        alert("Erro ao remover atleta: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao remover atleta:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };

  // Paginação
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="atletas-page">
      <h1 className="TituloEquipas">Atletas</h1>

      <div className="searchbar-wrapper-atletas">
        <div className="searchbar bg-color-gray-800 rounded-pill">
          <input
            type="text"
            className="form-control"
            placeholder="Procurar por nome de atleta"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="material-symbols-outlined icon">search</span>
        </div>
        <Link to="/atletas/adicionar">
          <button className="add-button">Adicionar</button>
        </Link>
      </div>

      <table className="custom-table">
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
          {loading ? (
            <tr>
              <td colSpan="8">Carregando...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="8">Erro: {error}</td>
            </tr>
          ) : (
            filteredAtletas.map((atleta) => (
              <tr key={atleta.id_atleta}>
                <td>Ativo</td>
                <td>{atleta.nome}</td>
                <td>{atleta.ratinggeral} ★</td>
                <td>PL ATA</td>
                <td>{atleta.datanascimento.split("-")[0]}</td>
                <td>{atleta.escalao?.designacao || "Sem Escalão"}</td>

                {/* Nacionalidade (usa react-country-flag) */}
                <td>
                  {atleta.nacionalidades && atleta.nacionalidades.length > 0 ? (
                    atleta.nacionalidades.map((n) => (
                      <span key={n.id_nacionalidade} style={{ marginRight: "6px" }}>
                        {/* Se n.abreviatura for "BR", "PT", etc. */}
                        <ReactCountryFlag
                          countryCode={n.abreviatura || "BR"} 
                          svg
                          style={{ width: "1.25em", height: "1.25em", marginRight: "4px" }}
                        />
                        {n.designacao}
                      </span>
                    ))
                  ) : (
                    "Sem Nacionalidade"
                  )}
                </td>

                <td>
                  <button
                    className="action-button remove"
                    onClick={() => removerAtleta(atleta.id_atleta)}
                  >
                    Remover
                  </button>
                  <Link to={`/atletas/perfil/${atleta.id_atleta}`}>
                    <button className="action-button profile">Perfil</button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
}
