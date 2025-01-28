import React, { useEffect, useState } from "react";
import "./atletas.css";
import { Link } from "react-router-dom";

export default function Atletas() {
  const [atletas, setAtletas] = useState([]); // Estado para armazenar os atletas
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState(null); // Estado para erros
  const [search, setSearch] = useState(""); // Estado para a pesquisa
  const [page, setPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  // Função para buscar atletas da API
  const fetchAtletas = async (page = 1) => {
    try {
      setLoading(true); // Inicia o estado de carregamento
      const response = await fetch(
        `http://localhost:8080/atleta/listar?page=${page}&size=10`,
        {
          method: "GET",
          credentials: "include",  
        }
      );
      if (!response.ok) throw new Error("Erro ao buscar atletas");
      const data = await response.json();
      setAtletas(data.data); // Salva os atletas no estado
      setTotalPages(data.totalPages); // Atualiza o total de páginas
    } catch (err) {
      console.error("Erro ao buscar atletas:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // useEffect para carregar os dados quando a página carregar
  useEffect(() => {
    fetchAtletas(page); // Busca os atletas para a página atual
  }, [page]);

  // Filtra os atletas conforme a pesquisa
  const filteredAtletas = atletas.filter((atleta) =>
    atleta.nome.toLowerCase().includes(search.toLowerCase())
  );



  // Remover Atletas!!
  const removerAtleta = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja remover este atleta?");
    if (!confirmacao) return;
  
    try {
      const response = await fetch(`http://localhost:8080/atleta/apagar`, {
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
        fetchAtletas(page); // Atualiza a lista de atletas
      } else {
        alert("Erro ao remover atleta: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao remover atleta:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };
  

  // Funções de navegação
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
            onChange={(e) => setSearch(e.target.value)} // Atualiza o estado da pesquisa
          />
          <span className="material-symbols-outlined icon">search</span>
        </div>
        <Link to="/atletas/adicionar">
          <button className="add-button">Adicionar</button>
        </Link>
      </div>

      {/* Tabela */}
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
                <td>Sub-17</td>
                <td>🇵🇹 Portugal</td>
                <td>
  <button
    className="action-button remove"
    onClick={() => removerAtleta(atleta.id_atleta)} // Conecta a função ao botão
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

      {/* Botões de Paginação */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1} // Desativa o botão se for a primeira página
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages} // Desativa o botão se for a última página
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
