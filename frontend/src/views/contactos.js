import React from 'react';
import AcademicoViseuImage from '../assets/academico_viseu.png'; // Importação da imagem
import './contactos.css';

export default function Contactos() {
    return (
        <div className="contactos-page">
            <div className="academico-viseu-section">
                <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                <div className="header-overlay">
                    <h1>CONTACTOS</h1>
                </div>
            </div>
            <div className="content">
                <div className="section">
                    <div className="section-header">
                        <h2>CLUBE</h2>
                    </div>
                    <hr className="yellow-line" />
                    <div className="contact-info">
                        <div className="contact-item">
                            <span className="icon">📍</span>
                            <p>Rua sentido, Bloco 58A 1C Esq e Dr1, Bloco 58B 6º dir, 3510-005 - Viseu</p>
                        </div>
                        <div className="contact-item">
                            <span className="icon">📞</span>
                            <p>232 423 368 <span>(chamada para rede fixa nacional)</span></p>
                        </div>
                        <div className="contact-item">
                            <span className="icon">✉️</span>
                            <p>club@academicodeviseu.pt</p>
                        </div>
                        <div className="contact-item">
                            <span className="icon">✉️</span>
                            <p>administracao@cafscouting.pt</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
