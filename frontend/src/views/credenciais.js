import React, { useEffect, useState } from "react";
import "./credenciais.css";
import { useNavigate } from "react-router-dom"; // Importa a função de navegação

const CredentialsPage = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({}); 
  const [search, setSearch] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [page, setPage] = useState(1); 
  const [cargoFilter, setCargoFilter] = useState("Todos"); 
  const [activeStatus, setActiveStatus] = useState({}); 
  const USERS_PER_PAGE = 10; 
  const navigate = useNavigate(); // Hook para navegação

  // 🔹 Carregar status salvo no localStorage
  const loadActiveStatus = () => {
    const storedStatus = localStorage.getItem("userActiveStatus");
    return storedStatus ? JSON.parse(storedStatus) : {};
  };

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
      setFilteredUsers(data);

      // 🔹 Carregar status do localStorage ou definir como ativo por padrão
      const storedStatus = loadActiveStatus();
      const initialStatus = {};
      data.forEach(user => {
        initialStatus[user.id_utilizador] = storedStatus[user.id_utilizador] ?? true; 
      });
      setActiveStatus(initialStatus);
    } catch (error) {
      console.error("Erro ao buscar utilizadores:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Alternar status e salvar no localStorage
  const toggleUserStatus = (id) => {
    setActiveStatus(prevStatus => {
      const newStatus = { ...prevStatus, [id]: !prevStatus[id] };
      localStorage.setItem("userActiveStatus", JSON.stringify(newStatus)); 
      return newStatus;
    });
  };

  // 🔹 Alternar visibilidade da password
  const togglePasswordVisibility = (email) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  // 🔹 Remover utilizador com confirmação
  const removerUtilizador = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja remover este utilizador?");
    if (!confirmacao) return;

    try {
      const response = await fetch(`http://localhost:8080/utilizador/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Erro ao remover utilizador: ${response.status}`);
      }

      alert("Utilizador removido com sucesso!"); 
      fetchUsers();
    } catch (error) {
      console.error("Erro ao remover utilizador:", error.message);
      alert("Erro ao remover utilizador.");
    }
  };

  // 🔹 Ajustar os nomes dos cargos para comparação correta
  const cargoMapping = {
    "Scout": "Scout",
    "Convidado": "Convidado",
    "Administrador": "Admin",
    "Todos": null 
  };

  // 🔹 Filtrar utilizadores com base na pesquisa e filtro por cargo
  useEffect(() => {
    let result = users;

    if (search) {
      result = result.filter(user => user.nome.toLowerCase().includes(search.toLowerCase()));
    }

    if (cargoFilter !== "Todos") {
      result = result.filter(user => {
        const cargoUser = user.tipoutilizador?.designacao;
        return cargoUser && cargoUser === cargoMapping[cargoFilter];
      });
    }

    setFilteredUsers(result);
    setPage(1);
  }, [search, cargoFilter, users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Atualizar filtro por cargo
  const handleCargoFilter = (tipo) => {
    setCargoFilter(tipo);
  };

  // 🔹 Lógica de Paginação
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  // 🔹 Controle dos botões da paginação
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Credenciais</h1>

      {/* 🔹 Barra de Pesquisa, Botão Adicionar e Filtro Alinhados */}
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

         {/* 🔹 Redirecionar ao clicar no botão */}
         <button className="credentials-add-button" onClick={() => navigate("/credenciais/adicionar")}>
          Adicionar
        </button>


        <div className="spacer"></div> 

        {/* Filtro por Tipo de Utilizador - Agora com "Todos" */}
        <div className="credentials-filter">
          {["Todos", "Scout", "Convidado", "Administrador"].map((tipo) => (
            <div key={tipo} className="credentials-radio-container">
              <input
                type="radio"
                name="filter"
                id={tipo}
                checked={cargoFilter === tipo} 
                onChange={() => handleCargoFilter(tipo)}
              />
              <label htmlFor={tipo} className="credentials-radio-label">{tipo}</label>
            </div>
          ))}
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Tabela de Utilizadores */}
          <table className="credentials-table">
            <thead>
              <tr>
                <th>Ativo</th>
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
                  <td>
                    <span className={activeStatus[user.id_utilizador] ? "credentials-status-active" : "credentials-status-inactive"}></span>
                  </td>
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
                      <button 
                        className="credentials-actions-button credentials-actions-deactivate"
                        onClick={() => toggleUserStatus(user.id_utilizador)}
                      >
                        {activeStatus[user.id_utilizador] ? "Desativar" : "Ativar"}
                      </button>
                      <button 
                        className="credentials-actions-button credentials-actions-remove"
                        onClick={() => removerUtilizador(user.id_utilizador)} 
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CredentialsPage;
