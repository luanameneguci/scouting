import React from 'react';
import './footerWEB.css';
import { Link } from "react-router-dom";
import logoSVG from '../assets/whiteLogo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    
    <footer className="footer">
      <div className="footer-logo">
        <img src={logoSVG} alt="Logo Académico de Viseu FC" />
      </div>

      {/* Links principais */}
      <div className="footer-content">
        <Link to="/" className="footer-link">PÁGINA PRINCIPAL</Link>
        <Link to="/Privacidade" className="footer-link">POLÍTICAS DE PRIVACIDADE</Link>
        <Link to="/Contactos" className="footer-link">CONTACTOS</Link>
      </div>

      

      {/* Texto de copyright e ícones sociais */}
      <div className="footer-bottom">
        <span>COPYRIGHT 2024 © ACADÉMICO DE VISEU FC</span>
        <div className="social-icons">
          <a href="https://www.instagram.com/academicodeviseufc/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/AcademicodeViseu" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
      
    </footer>
  );
}
export default Footer;