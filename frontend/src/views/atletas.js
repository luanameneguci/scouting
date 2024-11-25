import React from "react";
import './atletas.css';

export default function Atletas() {
  return (
    <div className="container my-4">
      {/* Título da Página */}
      <h1 className="text-light">Atletas</h1>

      {/* Barra de Busca */}
      <div className="d-flex align-items-center mb-3">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome de atleta"
            aria-label="Pesquisar por nome de atleta"
          />
          <span className="input-group-text bg-dark text-light">
            <i className="bi bi-search"></i>
          </span>
        </div>
        <button className="btn btn-warning ms-3">Adicionar</button>
      </div>

      {/* Tabela */}
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Nome</th>
              <th scope="col">Rating</th>
              <th scope="col">Posição</th>
              <th scope="col">Ano</th>
              <th scope="col">Escalão</th>
              <th scope="col">Nacionalidade</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ativo</td>
              <td>John Doe</td>
              <td>5 ★★★★★</td>
              <td>PL <span className="text-secondary">ATA</span></td>
              <td>2008</td>
              <td>Sub-17</td>
              <td>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
                  alt="Portugal"
                  width="30"
                />{" "}
                Portugal
              </td>
              <td>
                <button className="btn btn-danger btn-sm">Remover Perfil</button>
              </td>
            </tr>
            <tr>
              <td>Inativo</td>
              <td>Jane Smith</td>
              <td>4 ★★★★☆</td>
              <td>GK</td>
              <td>2009</td>
              <td>Sub-16</td>
              <td>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
                  alt="Portugal"
                  width="30"
                />{" "}
                Portugal
              </td>
              <td>
                <button className="btn btn-warning btn-sm">Adicionar Perfil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
