import React, { useState } from 'react';
import './relatorio_adicionar.css';

const RelatorioAdicionar = () => {
  const [novoAtletaVisible, setNovoAtletaVisible] = useState(true);

  const toggleNovoAtleta = () => {
    setNovoAtletaVisible(!novoAtletaVisible);
  };

  return (
    <div className="add-relatorio-container">
      {/* Seção Atleta Existente */}
      <div className="form-section">
        <h2>Atleta Existente</h2>
        <form>
          <div className="form-group">
            <label>Atleta</label>
            <input type="text" placeholder="John Doe" disabled />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input type="date" disabled value="2001-01-01" />
            </div>
            <div className="form-group">
              <label>Escalão</label>
              <select disabled>
                <option>SUB-16</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Clube</label>
              <select disabled>
                <option>SL Benfica</option>
              </select>
            </div>
            <div className="form-group">
              <label>Posição</label>
              <select disabled>
                <option>PL</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nacionalidade</label>
              <input type="text" placeholder="Portugal" disabled />
            </div>
            <div className="form-group">
              <label>Rating Final</label>
              <input type="number" disabled value="5" />
            </div>
          </div>
          <button className="btn">Selecionar atleta existente</button>
        </form>
      </div>

      {/* Seção Novo Atleta */}
      <div className="form-section novo-atleta-section">
        <div className="novo-atleta-header" onClick={toggleNovoAtleta}>
          <h2 className="novo-atleta-title">Novo atleta</h2>
          <span className={`toggle-icon ${novoAtletaVisible ? 'expanded' : 'collapsed'}`}>
            &#x25BC;
          </span>
        </div>
        {novoAtletaVisible && (
          <form>
            <div className="form-group">
              <label>Nome do atleta</label>
              <input type="text" placeholder="John Doe" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Data de Nascimento</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Escalão</label>
                <select>
                  <option>SUB-16</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Clube</label>
                <select>
                  <option>SL Benfica</option>
                </select>
              </div>
              <div className="form-group">
                <label>Posição</label>
                <select>
                  <option>PL</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nacionalidade</label>
                <input type="text" placeholder="Portugal" />
              </div>
              <div className="form-group">
                <label>Rating Final</label>
                <input type="number" placeholder="5" />
              </div>
            </div>

            <div className="form-group">
              <label>Link</label>
              <input type="text" placeholder="https://www.google.pt" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nome do Encarregado de Educação</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Contacto do Encarregado de Educação</label>
                <input type="text" placeholder="912345678" />
              </div>
            </div>

            <button className="btn">Adicionar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RelatorioAdicionar;