import React from 'react';
import AcademicoViseuImage from '../assets/academico_viseu.png';
import AcademicoViseuImage from '../assets/academico_viseu.png'; 
import './contactos.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function contactos() {
    return (
        <div className="privacidade-pagepriv">
            <div className="academico-viseu-sectionpriv">
                <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                <div className="header-overlaypriv">
                    <div className="vertical-linepriv"></div>
                    <h1>CONTACTOS</h1>
                </div>
            </div>

            {/* Seção Morada */}
            <div className="content">
                <div className="section">
                    <div className="vertical-line"></div>
                    <div className="section-content">
                        <div className="section-header">
                            <LocationOnIcon className="icon" />
                            <h3>MORADA</h3>
                        </div>
                        <p>Rua serrado, Bloco 58A R/C ESQ, E DIR.; Bloco 58B r/c dir. <br /> 3510-005 - Viseu</p>
                    </div>
                </div>

                {/* Seção Telefone */}
                <div className="section">
                    <div className="vertical-line"></div>
                    <div className="section-content">
                        <div className="section-header">
                            <PhoneIcon className="icon" />
                            <h3>TELEFONE</h3>
                        </div>
                        <p>232 423 268 <br /> (chamada para rede fixa nacional)</p>
                    </div>
                </div>

                {/* Seção Email */}
                <div className="section">
                    <div className="vertical-line"></div>
                    <div className="section-content">
                        <div className="section-header">
                            <EmailIcon className="icon" />
                            <h3>EMAIL</h3>
                        </div>
                        <p>clube@academicodeviseu.pt</p>
                    </div>
                </div>

                {/* Seção Email Responsável */}
                <div className="section">
                    <div className="vertical-line"></div>
                    <div className="section-content">
                        <div className="section-header">
                            <EmailIcon className="icon" />
                            <h3>EMAIL DO RESPONSÁVEL DA PLATAFORMA</h3>
                        </div>
                        <p>administracao@cafscouting.pt</p>
                    </div>
                </div>
            </div>
        </div>
    )
}