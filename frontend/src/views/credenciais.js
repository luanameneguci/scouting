import React, { useEffect, useState } from "react";
import "./credenciais.css";

const CredentialsPage = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [search, setSearch] = useState(""); // Estado para pesquisa
  const [filteredUsers, setFilteredUsers] = useState([]); // Estado para usuários filtrados
  const [page, setPage] = useState(1); // Estado para paginação
  const [cargoFilter, setCargoFilter] = useState(""); // Estado para filtro por tipo de utilizador
  const USERS_PER_PAGE = 10; // Máximo de utilizadores por página

  // 🔹 Buscar utilizadores
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/utilizador", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data); // Inicializa lista filtrada
    } catch (error) {
      console.error("Erro ao buscar utilizadores:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Filtrar utilizadores com base na pesquisa e filtro por cargo
  useEffect(() => {
    let result = users;

    if (search) {
      result = result.filter(user => user.nome.toLowerCase().includes(search.toLowerCase()));
    }

    if (cargoFilter) {
      result = result.filter(user => user.tipoutilizador?.designacao === cargoFilter);
    }

    setFilteredUsers(result);
    setPage(1); // Sempre volta para a primeira página após filtrar
  }, [search, cargoFilter, users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Alternar visibilidade da password
  const togglePasswordVisibility = (email) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  // 🔹 Lógica de Paginação
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Credenciais</h1>

      {/* Barra de Pesquisa e Botão Adicionar */}
      <div className="credentials-toolbar">
        <div className="credentials-search-container">
          <input
            type="text"
            placeholder="Pesquisar por nome do utilizador"
            className="credentials-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="credentials-search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <button className="credentials-add-button">Adicionar</button>
      </div>

      {/* Filtro por Tipo de Utilizador */}
      <div className="credentials-filter">
        {["Scout", "Convidado", "Administrador"].map((tipo) => (
          <div key={tipo} className="credentials-radio-container">
            <input
              type="radio"
              name="filter"
              id={tipo}
              checked={cargoFilter === tipo}
              onChange={() => setCargoFilter(cargoFilter === tipo ? "" : tipo)}
            />
            <label htmlFor={tipo} className="credentials-radio-label">{tipo}</label>
          </div>
        ))}
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Tabela de Utilizadores */}
          <table className="credentials-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Password</th>
                <th>Telefone</th>
                <th>Tipo de Utilizador</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user.id_utilizador}>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="credentials-password-text">
                      {visiblePasswords[user.email] ? user.password : "*".repeat(8)}
                    </span>
                    <button 
                      className="credentials-view-password"
                      onClick={() => togglePasswordVisibility(user.email)}
                    >
                      <span className="material-symbols-outlined">
                        {visiblePasswords[user.email] ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </td>
                  <td>{user.telefone}</td>
                  <td>{user.tipoutilizador?.designacao || "Desconhecido"}</td>
                  <td>
                    <div className="credentials-actions">
                      <button className="credentials-actions-button credentials-actions-edit">Editar</button>
                      <button className="credentials-actions-button credentials-actions-deactivate">Desativar</button>
                      <button className="credentials-actions-button credentials-actions-remove">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CredentialsPage;
