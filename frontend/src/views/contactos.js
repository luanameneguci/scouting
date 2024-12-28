import React from 'react'; 
import AcademicoViseuImage from '../assets/academico_viseu.png'; // Importação da nova imagem
import './contactos.css';

export default function Contactos() {
    return (
        <div className="contactos-page">
            <div className="academico-viseu-section">
                <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                <div className="header-overlay">
                    <div className="vertical-line"></div>
                    <h1>CONTACTOS</h1>
                </div>
            </div>
        </div>
    )
}