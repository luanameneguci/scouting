import React, { useState } from 'react';
import './credenciais.css';

const CredentialsPage = () => {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const handleAction = (action, email) => {
    alert(`Action: ${action}, Email: ${email}`);
  };

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

  const users = [
    { 
      active: true, 
      name: "John Doe", 
      email: "johndoe@email.com", 
      password: "soufadesopa", 
      phone: "912334678", 
      profile: "Treinador" 
    },
    { 
      active: true, 
      name: "John Doe", 
      email: "johndoe2@email.com", 
      password: "tostamistaradical!t", 
      phone: "912334678", 
      profile: "Treinador" 
    },
    { 
      active: false, 
      name: "John Doe", 
      email: "johndoe3@email.com", 
      password: "elaéovelhaelaéchoné", 
      phone: "912334678", 
      profile: "Administrador" 
    },
  ];

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Credentials Management</h1>
      
      <div className="credentials-toolbar">
        <div className="credentials-search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="credentials-search-input" 
          />
          <button className="credentials-add-button">
            Add
          </button>
        </div>
        <div className="credentials-filter">
          <div className="credentials-radio-container">
            <input type="radio" name="filter" id="treinador" />
            <label htmlFor="treinador" className="credentials-radio-label">
            Treinador
            </label>
          </div>
          <div className="credentials-radio-container">
            <input type="radio" name="filter" id="convidado" />
            <label htmlFor="convidado" className="credentials-radio-label">
           Convidado
            </label>
          </div>
          <div className="credentials-radio-container">
            <input type="radio" name="filter" id="administrador" />
            <label htmlFor="administrador" className="credentials-radio-label">
            Administrador
            </label>
          </div>
        </div>
      </div>

      <table className="credentials-table">
        <thead>
          <tr>
            <th>Active</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Profile</th>
            <th>Actions</th>
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
                    onClick={() => handleAction("Edit", user.email)}
                  >
                    Edit
                  </button>
                  <button 
                    className="credentials-actions-button credentials-actions-deactivate"
                    onClick={() => handleAction("Deactivate", user.email)}
                  >
                    Deactivate
                  </button>
                  <button 
                    className="credentials-actions-button credentials-actions-remove"
                    onClick={() => handleAction("Remove", user.email)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CredentialsPage;