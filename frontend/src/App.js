import Equipas from './views/equipas';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, useLocation } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className='wrapper'>
      <div className='navbar'>navbar</div>
      <Routes>
        <Route path="/equipa/:tipo/:escalao" element={<Equipas />} />

      </Routes>
      </div>
    </Router>

  );
}

export default App;
