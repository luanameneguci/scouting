import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './credenciais.css';

const API_URL = "http://localhost:8080/utilizador/";

const CredentialsPage = () => {
  const [users, setUsers] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        const fetchedUsers = response.data.map(user => ({
          active: true, // Adapta se houver um campo para status ativo/inativo
          name: user.nome,
          email: user.email,
          password: user.password,
          phone: user.telefone,
          profile: user.tipoUtilizador ? user.tipoUtilizador.designacao : "Desconhecido"
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar utilizadores:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const togglePasswordVisibility = (email) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Credenciais</h1>

      {loading ? <p>Carregando utilizadores...</p> : (
        <>
          <div className="credentials-toolbar">
            <div className="credentials-search-container">
              <input 
                type="text" 
                placeholder="Pesquisar por nome do utilizador" 
                className="credentials-search-input" 
              />
              <button className="credentials-search-button">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
            <button className="credentials-add-button">Adicionar</button>
          </div>

          <table className="credentials-table">
            <thead>
              <tr>
                <th>Ativo</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Password</th>
                <th>Telemóvel</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>
                    <span 
                      className={
                        user.active 
                          ? 'credentials-status-active' 
                          : 'credentials-status-inactive'
                      }
                    ></span>
                  </td>
                  <td>{truncateText(user.name)}</td>
                  <td>{truncateText(user.email)}</td>
                  <td className="credentials-password-cell">
                    <span className="credentials-password-text">
                      {visiblePasswords[user.email] 
                        ? user.password 
                        : '*'.repeat(user.password.length)}
                    </span>
                    <button 
                      className="credentials-view-password"
                      onClick={() => togglePasswordVisibility(user.email)}
                    >
                      <span className="material-symbols-outlined">
                        {visiblePasswords[user.email] ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </td>
                  <td>{truncateText(user.phone)}</td>
                  <td>{truncateText(user.profile)}</td>
                  <td>
                    <div className="credentials-actions">
                      <button 
                        className="credentials-actions-button credentials-actions-edit"
                      >
                        Edit
                      </button>
                      <button 
                        className="credentials-actions-button credentials-actions-deactivate"
                      >
                        Deactivate
                      </button>
                      <button 
                        className="credentials-actions-button credentials-actions-remove"
                      >
                        Remove
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
