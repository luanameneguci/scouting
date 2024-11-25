import React from 'react';
import './relatorioValidar.css'; // Importa o CSS para os estilos.

const RelatorioValidar = () => {
  return (
    <div className="relatorio-container">
      <h4 className="relatorio-title">Validar Atleta</h4>

      {/* Atleta Existente */}
      <div className="relatorio-section">
        <h5 className="section-title">Atleta Existente</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Atleta</label>
            <select className="form-select">
              <option>John Doe</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Data de Nascimento</label>
            <input type="date" className="form-control" value="2001-01-01" disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Escalão</label>
            <input type="text" className="form-control" value="SUB-16" disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Clube</label>
            <input type="text" className="form-control" value="SL Benfica" disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Posição</label>
            <input type="text" className="form-control" value="PL" disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Nacionalidade</label>
            <input type="text" className="form-control" value="Portugal" disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Rating Final</label>
            <input type="number" className="form-control" value="5" disabled />
          </div>
        </div>
        <button className="btn btn-custom-yellow mt-3 w-100">Selecionar atleta existente</button>
      </div>

      {/* Novo Atleta */}
      <div className="relatorio-section">
        <h5 className="section-title">Novo atleta</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome do atleta</label>
            <input type="text" className="form-control" value="John Doe" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Data de Nascimento</label>
            <input type="date" className="form-control" value="2001-01-01" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Escalão</label>
            <select className="form-select">
              <option>SUB-16</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Clube</label>
            <select className="form-select">
              <option>SL Benfica</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Posição</label>
            <select className="form-select">
              <option>PL</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Nacionalidade</label>
            <select className="form-select">
              <option>Portugal</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Rating Final</label>
            <select className="form-select">
              <option>5</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label">Link</label>
            <input type="url" className="form-control" value="https://www.google.pt" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Nome do Encarregado de Educação</label>
            <input type="text" className="form-control" value="John Doe" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contacto do Encarregado de Educação</label>
            <input type="text" className="form-control" value="912345678" />
          </div>
        </div>
        <button className="btn btn-custom-yellow mt-3 w-100">Adicionar</button>
      </div>
    </div>
  );
};

export default RelatorioValidar;
