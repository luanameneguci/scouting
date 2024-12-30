import React from 'react';
import AcademicoViseuImage from '../assets/academico_viseu.png';
import './contactos.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Contactos() {
    return (
        <div className="privacidade-pagepriv">
            <div className="academico-viseu-sectioncontact">
                <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                <div className="header-overlaypriv">
                    <div className="vertical-linepriv"></div>
                    <h1>CONTACTOS</h1>
                </div>
            </div>

            <div className="contentcontact">
                <div className="sectioncontact">
                    <div className="vertical-linecontact"></div>
                    <div className="section-contentcontact">
                        <div className="section-headercontact">
                            <LocationOnIcon className="iconcontact" />
                            <h3>MORADA</h3>
                        </div>
                        <p>Rua serrado, Bloco 58A R/C ESQ, E DIR.; Bloco 58B r/c dir. <br /> 3510-005 - Viseu</p>
                    </div>
                </div>
                
                <div className="sectioncontact">
                    <div className="vertical-linecontact"></div>
                    <div className="section-contentcontact">
                        <div className="section-headercontact">
                            <PhoneIcon className="iconcontact" />
                            <h3>TELEFONE</h3>
                        </div>
                        <p>232 423 268 <br /> (chamada para rede fixa nacional)</p>
                    </div>
                </div>

                <div className="sectioncontact">
                    <div className="vertical-linecontact"></div>
                    <div className="section-contentcontact">
                        <div className="section-headercontact">
                            <EmailIcon className="iconcontact" />
                            <h3>EMAIL</h3>
                        </div>
                        <p>clube@academicodeviseu.pt</p>
                    </div>
                </div>

                <div className="sectioncontact">
                    <div className="vertical-linecontact"></div>
                    <div className="section-contentcontact">
                        <div className="section-headercontact">
                            <EmailIcon className="iconcontact" />
                            <h3>EMAIL DO RESPONSÁVEL DA PLATAFORMA</h3>
                        </div>
                        <p>administracao@cafscouting.pt</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
