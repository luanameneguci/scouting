import React, { useEffect, useState } from "react";
import './atletas.css';
import { Link } from "react-router-dom";

export default function Atletas() {
  const [atletas, setAtletas] = useState([]); // Estado para armazenar os atletas
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState(null); // Estado para erros
  const [search, setSearch] = useState(""); // Estado para a pesquisa

  // Função para buscar atletas da API
  const fetchAtletas = async () => {
    try {
      const response = await fetch("http://localhost:8080/atleta/listar");
      if (!response.ok) throw new Error("Erro ao buscar atletas");
      const data = await response.json();
      setAtletas(data.data); // Salva os atletas no estado
    } catch (err) {
      console.error("Erro ao buscar atletas:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // useEffect para carregar os dados quando a página carregar
  useEffect(() => {
    fetchAtletas();
  }, []);

  // Filtra os atletas conforme a pesquisa
  const filteredAtletas = atletas.filter((atleta) =>
    atleta.nome.toLowerCase().includes(search.toLowerCase())
  );

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
                  <button className="action-button remove">Remover</button>
                  <Link to="/atletas/pagina">
                    <button className="action-button profile">Perfil</button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
