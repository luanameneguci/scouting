import React from 'react';
import './relatorios.css'; // Arquivo de estilos

const App = () => {
  const handleAction = (action, id) => {
    alert(`Ação: ${action}, ID: ${id}`);
  };

  const reports = [
    { id: 999, confirmed: true, athlete: "John Doe", date: "15/12/2024 18:00", coach: "Rui Marques", homeClub: "SL Benfica", awayClub: "FC Porto" },
    { id: 998, confirmed: true, athlete: "John Doe", date: "15/12/2024 18:00", coach: "Rui Marques", homeClub: "FC Porto", awayClub: "SL Benfica" },
    { id: 997, confirmed: false, athlete: "Joaquim Almeida", date: "15/12/2024 18:00", coach: "Rui Marques", homeClub: "SL Benfica", awayClub: "FC Porto" },
  ];

  return (
    <div className="reports-container">
      <main>
        <div className="reports-toolbar">
          <input
            type="text"
            placeholder="Pesquisar por nome de atleta"
            className="reports-search-input"
          />
          <button className="reports-add-button">Adicionar</button>
        </div>
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Confirmado</th>
              <th>Atleta</th>
              <th>Data e Hora</th>
              <th>Treinador</th>
              <th>Clube (casa)</th>
              <th>Clube (fora)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td
                  className={
                    report.confirmed
                      ? "reports-status-true"
                      : "reports-status-false"
                  }
                >
                  {report.confirmed ? "✔" : "!"}
                </td>
                <td>{report.athlete}</td>
                <td>{report.date}</td>
                <td>{report.coach}</td>
                <td>{report.homeClub}</td>
                <td>{report.awayClub}</td>
                <td>
                  <button
                    className="reports-actions-button reports-actions-view"
                    onClick={() => handleAction("Ver", report.id)}
                  >
                    Ver
                  </button>
                  <button
                    className="reports-actions-button reports-actions-transfer"
                    onClick={() => handleAction("Transferir", report.id)}
                  >
                    Transferir
                  </button>
                  <button
                    className="reports-actions-button reports-actions-remove"
                    onClick={() => handleAction("Remover", report.id)}
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

export default App;
