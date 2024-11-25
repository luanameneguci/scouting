import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

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
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Pesquisar por nome de atleta"
          className="form-control w-50"
        />
        <button className="btn btn-warning">Adicionar</button>
      </div>
      <table className="table table-dark table-striped">
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
              <td className={report.confirmed ? "text-success" : "text-warning"}>
                {report.confirmed ? "✔" : "!"}
              </td>
              <td>{report.athlete}</td>
              <td>{report.date}</td>
              <td>{report.coach}</td>
              <td>{report.homeClub}</td>
              <td>{report.awayClub}</td>
              <td>
                <button
                  className="btn btn-link text-primary p-0"
                  onClick={() => handleAction("Ver", report.id)}
                >
                  Ver
                </button>
                <button
                  className="btn btn-link text-warning p-0"
                  onClick={() => handleAction("Transferir", report.id)}
                >
                  Transferir
                </button>
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => handleAction("Remover", report.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
