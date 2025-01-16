import React from 'react';
import './footerWEB.css';
import { NavLink } from "react-router-dom";
import logoSVG from '../assets/whiteLogo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer className="footer">
      {/* Links principais */}
      <div className="footer-content">
        <a href="#" className="footer-link">PÁGINA PRINCIPAL</a>
        <a href="/Privacidade" className="footer-link">POLÍTICAS DE PRIVACIDADE</a>
        <a href="/Contactos" className="footer-link">CONTACTOS</a>
      </div>

      {/* Logo ao centro */}
      <div className="footer-logo">
        <img src={logoSVG} alt="Logo Académico de Viseu FC" />
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