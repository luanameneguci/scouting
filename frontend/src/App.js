  import { useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Routes, useLocation } from "react-router-dom";
import './App.css';
import Equipas from './views/equipas';
import Atletas from './views/atletas';
import AtletasAdicionar from './views/atletasAdicionar';
import Atletaspersonalpage from './views/atletapersonalpage';
import RelatorioValidar from './views/relatorioValidar';
import RelatorioConfirmar from './views/relatorioConfirmar';
import Adicionarjogo from './views/adicionarjogo';
import Relatorios from './views/relatorios';
import NavBackoffice from './components/navBackoffice';
import NavLanding from './components/navLanding';
import LandingPage from './views/landing/landingPage';
import Credenciais from './views/credenciais';
import Jogos from "./views/jogos";
import Dashboard from "./views/dashboard";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLandingRoute = ["/", "/login", "/politicasprivacidade", "/contactos"].includes(location.pathname);

  return (
    <div className='wrapper'>
      {isLandingRoute ? <NavLanding /> : <NavBackoffice />}

      <Routes>
        {/* Routes para a landing*/}
        <Route path="/" element={<LandingPage />} />
        {/* Routes para o backoffice*/}
        <Route path="/equipa/:idEquipa" element={<Equipas />} />
        <Route path="/atletas" element={<Atletas />} /> 
        <Route path="/atletas/adicionar" element={<AtletasAdicionar />} /> 
        <Route path="/atletas/pagina" element={<Atletaspersonalpage />} /> 
        <Route path="/relatorio/confirmar" element={<RelatorioConfirmar />} />
        <Route path="/relatorio/validar" element={<RelatorioValidar />} />
        <Route path="/jogos/adicionarjogo" element={<Adicionarjogo />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/credenciais" element={<Credenciais />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
