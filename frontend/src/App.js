import Equipas from './views/equipas';
import AdicionarJogo from './views/adicionarjogo'; // Verifique o caminho correto
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, useLocation } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className='wrapper'>
        <div className='navbar'>
          <div className='rounded font-bold'>
            <span className="material-symbols-outlined icon">
              home
            </span>
          </div>
          <div className='rounded font-bold selected'>
            <span className="material-symbols-outlined icon">
              groups
            </span>
            Atletas
          </div>
          <div className='rounded font-bold'>
            <span className="material-symbols-outlined icon">
              sports_and_outdoors
            </span>
            Equipas
          </div>
          <div className='rounded font-bold'>
            <span className="material-symbols-outlined icon">
              key
            </span>
            Credenciais
          </div>
          <div className='rounded font-bold'>
            <span className="material-symbols-outlined icon">
              check_circle
            </span>
            Relatórios
          </div>
          <div className='rounded font-bold'>
            <span className="material-symbols-outlined icon">
              event
            </span>
            Jogos
          </div>
          <div><div>utilizador</div></div>
        </div>
        <Routes>
          <Route path="/equipa/:tipo/:escalao" element={<Equipas />} />
          <Route path="/adicionarjogo" element={<AdicionarJogo />} />
          
        </Routes>
        
      </div>
    </Router>

  );
}

export default App;
