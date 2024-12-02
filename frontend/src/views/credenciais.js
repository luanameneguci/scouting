import React from 'react';
import './credenciais.css';

const Credenciais = () => {
  const handleAction = (action, email) => {
    alert(`Ação: ${action}, Email: ${email}`);
  };

  const users = [
    { active: true, name: "John Doe", email: "johndoe@email.com", password: "soufadesopa", telefone: "912334678", perfil: "Treinador" },
    { active: true, name: "John Doe", email: "johndoe@email.com", password: "tostamistaradical!t", telefone: "912334678", perfil: "Treinador" },
    { active: true, name: "John Doe", email: "johndoe@email.com", password: "elaéovelhaelaéchonégo", telefone: "912334678", perfil: "Treinador" },
  ];

  return (
    <div className="credentials-container">
      <main>
        <h1 className="credentials-title">Gestão de Credenciais</h1>
        <div className="credentials-toolbar">
          <input
            type="text"
            placeholder="Pesquisar por nome de utilizador"
            className="credentials-search-input"
          />
          <button className="credentials-add-button">Adicionar</button>
        </div>
        <div className="credentials-filter">
          <label className="credentials-radio-container">
            <input type="radio" name="userType" value="treinador" />
            <span className="credentials-radio-label">Treinador</span>
          </label>
          <label className="credentials-radio-container">
            <input type="radio" name="userType" value="convidado" />
            <span className="credentials-radio-label">Convidado</span>
          </label>
          <label className="credentials-radio-container">
            <input type="radio" name="userType" value="administrador" />
            <span className="credentials-radio-label">Administrador</span>
          </label>
        </div>
        <table className="credentials-table rounded bg-color-gray-800">
          <thead>
            <tr>
              <th>Ativo</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Password</th>
              <th>Telefone</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="credentials-status">
                  {user.active ? "✓" : ""}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.password}
                  <button className="credentials-view-password">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </td>
                <td>{user.telefone}</td>
                <td>{user.perfil}</td>
                <td className="credentials-actions">
                  <button
                    className="credentials-actions-button credentials-actions-edit"
                    onClick={() => handleAction("Editar", user.email)}
                  >
                    Editar
                  </button>
                  <button
                    className="credentials-actions-button credentials-actions-deactivate"
                    onClick={() => handleAction("Desativar", user.email)}
                  >
                    Desativar
                  </button>
                  <button
                    className="credentials-actions-button credentials-actions-remove"
                    onClick={() => handleAction("Remover", user.email)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Credenciais;