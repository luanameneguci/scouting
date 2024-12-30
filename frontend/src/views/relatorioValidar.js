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
    <div className="containerval contentval">


      {/* Seção Atleta Existente */}
      <div className="form-sectionval">
        <h2>Atleta Existente</h2>
        <form>
          <div className="form-groupval">
            <label>Atleta</label>
            <div className="atletasadicionar-input-groupval">
              <PersonIcon />
              <input type="text" placeholder="John Doe" disabled />
            </div>
          </div>

          {/* Data de Nascimento */}
          <div className="form-rowval">
            <div className="form-groupval">
              <label>Data de Nascimento</label>
              <div className="atletasadicionar-input-groupval">
                <CalendarTodayIcon />
                <input type="date" disabled value="2001-01-01" />
              </div>
            </div>

            {/* Escalão */}
            <div className="form-groupval">
              <label>Escalão</label>
              <div className="atletasadicionar-input-groupval">
                <GroupIcon />
                <select disabled>
                  <option>SUB-16</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clube */}
          <div className="form-rowval">
            <div className="form-groupval">
              <label>Clube</label>
              <div className="atletasadicionar-input-groupval">
                <SportsSoccerIcon />
                <select disabled>
                  <option>SL Benfica</option>
                </select>
              </div>
            </div>

            {/* Posição */}
            <div className="form-groupval">
              <label>Posição</label>
              <div className="atletasadicionar-input-groupval">
                <SportsSoccerIcon />
                <select disabled>
                  <option>PL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Nacionalidade */}
          <div className="form-rowval">
            <div className="form-groupval">
              <label>Nacionalidade</label>
              <div className="atletasadicionar-input-groupval">
                <FlagIcon />
                <input type="text" placeholder="Portugal" disabled />
              </div>
            </div>

            {/* Rating Final*/}
            <div className="form-groupval">
              <label>Rating Final</label>
              <div className="atletasadicionar-input-groupval">
                <StarIcon />
                <input type="number" disabled value="5" />
              </div>
            </div>
          </div>
          <button className="btnval">Selecionar atleta existente</button>
        </form>
      </div>


      {/* Linha de separação */}
      <div className="lineval"></div>


      {/* Seção Novo Atleta */}
      <div className="form-sectionval">
        <h2>Novo atleta</h2>
        <form>

          {/* Nome do atleta */}
          <div className="form-groupval">
            <label>Nome do atleta</label>
            <div className="atletasadicionar-input-groupval">
              <PersonIcon />
              <input type="text" placeholder="Nome do atleta" />
            </div>
          </div>

          {/* Data de nascimento */}
          <div className="form-rowval">
            <div className="form-groupval">
              <label>Data de Nascimento</label>
              <div className="atletasadicionar-input-groupval">
                <CalendarTodayIcon />
                <input type="date" />
              </div>
            </div>

            {/* Escalão */}
            <div className="form-groupval">
              <label>Escalão</label>
              <div className="atletasadicionar-input-groupval">
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
          
          {/* Clube */}
          <div className="form-rowval">
            <div className="form-groupval">
              <label>Clube</label>
              <div className="atletasadicionar-input-groupval">
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

            {/* Posição */}
            <div className="form-groupval">
              <label>Posição</label>
              <div className="atletasadicionar-input-groupval">
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

          {/* Nacionalide */}
          <div className="form-rowval">
            <div className="form-groupval">
              <label>Nacionalidade</label>
              <div className="atletasadicionar-input-groupval">
                <SportsSoccerIcon />
                <select>
                  <option>Portugal</option>
                  <option>Brasil</option>
                  <option>Inglaterra</option>
                  <option>Espanha</option>
                  <option>França</option>
                  <option>Alemanha</option>
                  <option>Bélgica</option>
                  <option>Itália</option>
                </select>
              </div>
            </div>

            {/* Rating Final */}
            <div className="form-groupval">
              <label>Rating Final</label>
              <div className="atletasadicionar-input-groupval">
                <StarIcon />
                <input type="number" />
              </div>
            </div>
          </div>

          {/* Link */}
          <div className="form-groupval">
            <label>Link</label>
            <div className="atletasadicionar-input-groupval">
              <LinkIcon />
              <input type="url" placeholder="https://www.google.pt" />
            </div>
          </div>

          {/* Nome do Encarregado de Educação */}
          <div className="form-groupval">
            <label>Nome do Encarregado de Educação</label>
            <div className="atletasadicionar-input-groupval">
              <SupervisorAccountIcon />
              <input type="text" placeholder="Nome do Encarregado de Educação" />
            </div>
          </div>

          {/* Conatcto do Encarregado de Educação */}
          <div className="form-groupval">
            <label>Contacto do Encarregado de Educação</label>
            <div className="atletasadicionar-input-groupval">
              <PhoneIcon />
              <input type="text" placeholder="Contacto do Encarregado de Educação" />
            </div>
          </div>

          <button className="btnval">Adicionar</button>
        </form>
      </div>
    </div>
  );
};

export default RelatorioValidar;
