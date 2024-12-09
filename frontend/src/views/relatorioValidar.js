import React from 'react';
import './relatorioValidar.css';

// Importando ícones do Material Design
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import LinkIcon from '@mui/icons-material/Link';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PhoneIcon from '@mui/icons-material/Phone';

const RelatorioValidar = () => {
  return (
    <div className="container content">
      {/* Seção Atleta Existente */}
      <div className="form-section">
        <h2>Atleta Existente</h2>
        <form>
          <div className="form-group">
            <label>Atleta</label>
            <div className="input-icon">
              <PersonIcon className="icon" />
              <input type="text" placeholder="John Doe" disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <div className="input-icon">
                <CalendarTodayIcon className="icon" />
                <input type="date" disabled value="2001-01-01" />
              </div>
            </div>
            <div className="form-group">
              <label>Escalão</label>
              <div className="input-icon">
                <GroupIcon className="icon" />
                <select disabled>
                  <option>SUB-16</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Clube</label>
              <div className="input-icon">
                <SportsSoccerIcon className="icon" />
                <select disabled>
                  <option>SL Benfica</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Posição</label>
              <div className="input-icon">
                <SportsSoccerIcon className="icon" />
                <select disabled>
                  <option>PL</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nacionalidade</label>
              <div className="input-icon">
                <FlagIcon className="icon" />
                <input type="text" placeholder="Portugal" disabled />
              </div>
            </div>
            <div className="form-group">
              <label>Rating Final</label>
              <div className="input-icon">
                <StarIcon className="icon" />
                <input type="number" disabled value="5" />
              </div>
            </div>
          </div>
          <button className="btn">Selecionar atleta existente</button>
        </form>
      </div>

      {/* Linha de separação */}
      <div className="line"></div>

      {/* Seção Novo Atleta */}
      <div className="form-section">
        <h2>Novo atleta</h2>
        <form>
          <div className="form-group">
            <label>Nome do atleta</label>
            <div className="input-icon">
              <PersonIcon className="icon" />
              <input type="text" placeholder="Nome do atleta" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <div className="input-icon">
                <CalendarTodayIcon className="icon" />
                <input type="date" />
              </div>
            </div>
            <div className="form-group">
              <label>Escalão</label>
              <div className="input-icon">
                <GroupIcon className="icon" />
                <select>
                  <option>SUB-16</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Clube</label>
              <div className="input-icon">
                <SportsSoccerIcon className="icon" />
                <select>
                  <option>SL Benfica</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Posição</label>
              <div className="input-icon">
                <SportsSoccerIcon className="icon" />
                <select>
                  <option>PL</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nacionalidade</label>
              <div className="input-icon">
                <FlagIcon className="icon" />
                <input type="text" placeholder="Portugal" />
              </div>
            </div>
            <div className="form-group">
              <label>Rating Final</label>
              <div className="input-icon">
                <StarIcon className="icon" />
                <input type="number" placeholder="1" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Link</label>
            <div className="input-icon">
              <LinkIcon className="icon" />
              <input type="text" placeholder="https://www.google.pt" />
            </div>
          </div>

          <div className="form-group">
            <label>Nome do Encarregado de Educação</label>
            <div className="input-icon">
              <SupervisorAccountIcon className="icon" />
              <input type="text" placeholder="Nome Encarregado de Educação" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Contacto do Encarregado de Educação</label>
            <div className="input-icon">
              <PhoneIcon className="icon" />
              <input type="text" placeholder="Contacto do Encarregado de Educação" />
            </div>
          </div>

          <button className="btn">Adicionar</button>
        </form>
      </div>
    </div>
  );
};

export default RelatorioValidar;
