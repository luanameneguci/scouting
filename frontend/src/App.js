import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  useNavigate,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import PreLoadEquipas from "./views/preLoadEquipas";
import Atletas from "./views/atletas";
import AtletasAdicionar from "./views/atletasAdicionar";
import Atletaspersonalpage from "./views/atletapersonalpage";
import RelatorioValidar from "./views/relatorioValidar";
import RelatorioConfirmar from "./views/relatorioConfirmar";
import RelatorioAdicionar from "./views/relatorioAdicionar";
import Adicionarjogo from "./views/adicionarjogo";
import Relatorios from "./views/relatorios";
import NavBackoffice from "./components/navBackoffice";
import NavLanding from "./components/navLanding";
import LandingPage from "./views/landing/landingPage";
import Login from "./views/login";
import Privacidade from "./views/Privacidade";
import Contactos from "./views/contactos";
import Credenciais from "./views/credenciais";
import AdicionarUtilizador from "./views/adicionarutilizador";
import Jogos from "./views/jogos";
import AtletasRating from "./views/atletasrating";
import Dashboard from "./views/dashboard";
import NeedLogin from "./views/landing/needLogin";
import Test from "./views/test";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLandingRoute = [
    "/",
    "/privacidade",
    "/contactos",
    "/erro",
    "/login",
  ].includes(location.pathname); // Verifica se é rota de landing

  return (
    <div className="wrapper">
      {isLandingRoute ? <NavLanding /> : <NavBackoffice />}

      <Routes>
        <Route path="/test" element={<Test />} />

        {/* Routes para a landing*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/erro" element={<NeedLogin />} />
        <Route path="/login" element={<Login />} />

        {/* Routes para o backoffice */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipa/:idEquipa?"
          element={
            <ProtectedRoute>
              <PreLoadEquipas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/atletas"
          element={
            <ProtectedRoute>
              <Atletas />
            </ProtectedRoute>
          }
        />
           <Route
          path="/atletas/atletasrating"
          element={
            <ProtectedRoute>
              <AtletasRating />
            </ProtectedRoute>
          }
        />
        <Route
          path="/atletas/adicionar"
          element={
            <ProtectedRoute>
              <AtletasAdicionar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/atletas/perfil/:id"
          element={
            <ProtectedRoute>
              <Atletaspersonalpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorios/confirmar"
          element={
            <ProtectedRoute>
              <RelatorioConfirmar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorios/validar"
          element={
            <ProtectedRoute>
              <RelatorioValidar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorios/adicionar"
          element={
            <ProtectedRoute>
              <RelatorioAdicionar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jogos/adicionar"
          element={
            <ProtectedRoute>
              <Adicionarjogo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/relatorios"
          element={
            <ProtectedRoute>
              <Relatorios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/credenciais"
          element={
            <ProtectedRoute>
              <Credenciais />
            </ProtectedRoute>
          }
        />
        <Route
          path="/credenciais/adicionar"
          element={
            <ProtectedRoute>
              <AdicionarUtilizador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jogos"
          element={
            <ProtectedRoute>
              <Jogos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
