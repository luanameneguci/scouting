import React from 'react';
import AcademicoViseuImage from '../assets/academico_viseu.png';
import './Privacidade.css';

export default function Privacidade() {
    return (
        <>
            <div className="Privacidade">
                <div className='landing-content hero-section'>
                </div>
                <div className="academico-viseu-section">
                    <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                </div>
            </div>
        </>
    );
}
