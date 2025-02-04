import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import './relatorios.css'; // Importando os estilos fornecidos
import axios from 'axios';
import LoadingAnim from '../components/loadingAnim';
import generatePDF from '../components/relatorioPDF';

const Relatorios = () => {
  const url = process.env.REACT_APP_API_URL;
  const [dados, setDados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {

        await axios.get(url + `/relatorio/listar/${page}`).then((res) => {
          if (res.status === 200) {
            setDados(res.data.relatorios)
            setTotalPages(res.data.totalPages)
            console.log(res.data);
          }
          else { throw new Error("Erro na resposta") }
        })
      }
      catch (e) { console.error(e) }
    }

    fetchdata();
  }, [page])
  const handleSearch = () => {
    alert('Pesquisar clicado!');
  };

  if (!dados || !totalPages) { return (<div className='reports-container'> <LoadingAnim /> </div>) }
  return (
    <div className="reports-container">
      <main>
        <h1 className="reports-title">Relatórios</h1>
        <div className="reports-toolbar">
          <div className="reports-search-container">
            <input
              type="text"
              placeholder="Pesquisar por nome de atleta"
              className="reports-search-input"
            />
            <button className="reports-search-button" onClick={handleSearch}>
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          {/* botão adicionar */}
          <Link to="/relatorios/confirmar">
            <button className="reports-add-button">Adicionar</button>
          </Link>
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
            {dados.map((report) => (
              <tr key={report.id_relatorio}>
                <td>{report.id_relatorio}</td>
                <td
                  className={report.atletum.id_statusatleta == 1 ? "reports-status-true" : "reports-status-false"}
                >
                  {report.atletum.id_statusatleta == 1 ? "✓" : <span className="material-symbols-outlined">error</span>}
                </td>
                <td>{report.atletum.nome}</td>
                <td>{report.data}</td>
                <td>{report.utilizador.nome}</td>
                <td>{report.jogo.JogoClubes[0].RelatedClube.nome}</td>
                <td>{report.jogo.JogoClubes[1].RelatedClube.nome}</td>
                <td className="text-left action-column">

                  {/* ligação das páginas' */}
                  <Link to={`/relatorios/confirmar/${report.id_relatorio}`}>
                    <button className="action-button view">Ver</button>
                  </Link>
                  <button
                    className="reports-actions-button reports-actions-transfer"
                    onClick={()=>{generatePDF(report)}}
                  >
                    Transferir
                  </button>
                  <button
                    className="reports-actions-button reports-actions-remove"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Botões de Paginação */}
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1} // Desativa o botão se for a primeira página
            className='rounded-pill'
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages} // Desativa o botão se for a última página
            className='rounded-pill'>
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
};

export default Relatorios;
