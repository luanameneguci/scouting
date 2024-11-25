import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Equipas from './views/equipas';
import Atletas from './views/atletas';
import RelatorioAdicionar from './views/relatorio_adicionar';
import Adicionarjogo from './views/adicionarjogo';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap para elementos estruturais
import './App.css'; // Seus estilos personalizados

function App() {
  return (
    <Router>
      <div>
        {/* Navbar fixa no topo */}
        <div className="navbar fixed-top">
          <NavLink to="/" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
            <span className="material-symbols-outlined icon">
              home
            </span>
          </NavLink>
          <NavLink to="/atletas" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
            <span className="material-symbols-outlined icon">
              groups
            </span>
            Atletas
          </NavLink>
          <NavLink to="/equipa" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
            <span className="material-symbols-outlined icon">
              sports_and_outdoors
            </span>
            Equipas
          </NavLink>
          <NavLink to="/credenciais" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
            <span className="material-symbols-outlined icon">
              key
            </span>
            Credenciais
          </NavLink>
          <NavLink to="/relatorios" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
            <span className="material-symbols-outlined icon">
              check_circle
            </span>
            Relatórios
          </NavLink>
          <NavLink to="/jogos" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
            <span className="material-symbols-outlined icon">
              event
            </span>
            Jogos
          </NavLink>
          <div><div>utilizador</div></div>
        </div>

        {/* Espaçamento para o conteúdo não ser escondido pela navbar */}
        <div className="wrapper" style={{ marginTop: '70px' }}>
          <Routes>
            <Route path="/equipa/:idEquipa" element={<Equipas />} />
            <Route path="/atletas" element={<Atletas />} />
            <Route path="/relatorio/adicionar" element={<RelatorioAdicionar />} />
            <Route path="/jogos/adicionarjogo" element={<Adicionarjogo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
