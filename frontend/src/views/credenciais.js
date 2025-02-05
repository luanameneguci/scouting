<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./credenciais.css";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './credenciais.css';

const API_URL = "http://localhost:8080/utilizador/";
>>>>>>> 2804864750153ecb6b5e09b4e459e67f5c972196

const CredentialsPage = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // 🔹 Buscar utilizadores autenticados
  const fetchUsers = async () => {
    try {
        setLoading(true);

        console.log("Buscando utilizadores sem autenticação..."); // 🔹 Debug

        const response = await fetch("http://localhost:8080/utilizador", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Resposta da API:", response.status); // 🔹 Debug

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
    } catch (error) {
        console.error("Erro ao buscar utilizadores:", error.message);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};



  useEffect(() => {
    fetchUsers(); // Buscar utilizadores ao carregar a página
  }, []);

  const togglePasswordVisibility = (email) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Credenciais</h1>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="credentials-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Password</th>
              <th>Telefone</th>
              <th>Tipo de Utilizador</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
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
                <td>{user.tipoUtilizador?.designacao || "Desconhecido"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CredentialsPage;
