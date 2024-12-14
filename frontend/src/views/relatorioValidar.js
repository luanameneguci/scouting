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
            <div className="atletasadicionar-input-group">
              <PersonIcon />
              <input type="text" placeholder="John Doe" disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <div className="atletasadicionar-input-group">
                <CalendarTodayIcon />
                <input type="date" disabled value="2001-01-01" />
              </div>
            </div>
            <div className="form-group">
              <label>Escalão</label>
              <div className="atletasadicionar-input-group">
                <GroupIcon />
                <select disabled>
                  <option>SUB-16</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Clube</label>
              <div className="atletasadicionar-input-group">
                <SportsSoccerIcon />
                <select disabled>
                  <option>SL Benfica</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Posição</label>
              <div className="atletasadicionar-input-group">
                <SportsSoccerIcon />
                <select disabled>
                  <option>PL</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nacionalidade</label>
              <div className="atletasadicionar-input-group">
                <FlagIcon />
                <input type="text" placeholder="Portugal" disabled />
              </div>
            </div>
            <div className="form-group">
              <label>Rating Final</label>
              <div className="atletasadicionar-input-group">
                <StarIcon />
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
            <div className="atletasadicionar-input-group">
              <PersonIcon />
              <input type="text" placeholder="Nome do atleta" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <div className="atletasadicionar-input-group">
                <CalendarTodayIcon />
                <input type="date" />
              </div>
            </div>
            <div className="form-group">
              <label>Escalão</label>
              <div className="atletasadicionar-input-group">
                <GroupIcon />
                <select>
                  <option>Profissional</option>
                  <option>Sub 23</option>
                  <option>Sub 19</option>
                  <option>Sub 16</option>
                  <option>Sub 14</option>
                  <option>Sub 12</option>
                  <option>Sub 11</option>
                  <option>Sub 10</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Clube</label>
              <div className="atletasadicionar-input-group">
                <SportsSoccerIcon />
                <select>
                  <option>SL Benfica</option>
                  <option>FC Porto</option>
                  <option>Sporting CP</option>
                  <option>SC Braga</option>
                  <option>Vitória SC</option>
                  <option>Marítimo</option>
                  <option>Rio Ave</option>
                  <option>Boavista</option>
                  <option>Pacos de Ferreira</option>
                  <option>Académico de Viseu</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Posição</label>
              <div className="atletasadicionar-input-group">
                <SportsSoccerIcon />
                <select>
                  <option>Ponta de Lança</option>
                  <option>Ala Direita</option>
                  <option>Ala Esquerda</option>
                  <option>Defesa Central</option>
                  <option>Defesa Direita</option>
                  <option>Defesa Esquerda</option>
                  <option>Guarda-Redes</option>
                  <option>Médio Centro Ofensivo</option>
                  <option>Médio Centro Defensivo</option>
                  <option>Médio Central</option>
                  <option>Médio Direito</option>
                  <option>Médio Esquerdo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nacionalidade</label>
              <div className="atletasadicionar-input-group">
                <FlagIcon />
                <input type="text" placeholder="Portugal" />
              </div>
            </div>
            <div className="form-group">
              <label>Rating Final</label>
              <div className="atletasadicionar-input-group">
                <StarIcon />
                <input type="number" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Link</label>
            <div className="atletasadicionar-input-group">
              <LinkIcon />
              <input type="url" placeholder="https://www.google.pt" />
            </div>
          </div>

          <div className="form-group">
            <label>Nome do Encarregado de Educação</label>
            <div className="atletasadicionar-input-group">
              <SupervisorAccountIcon />
              <input type="text" placeholder="Nome do Encarregado de Educação" />
            </div>
          </div>

          <div className="form-group">
            <label>Contacto do Encarregado de Educação</label>
            <div className="atletasadicionar-input-group">
              <PhoneIcon />
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
