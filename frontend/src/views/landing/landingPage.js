import React from 'react';
import HeroImage from '../../assets/heroImage.png';
import './landingPage.css';

export default function LandingPage() {
    return (
        <>
            <div className="landing-page">

                <div className='hero-section'>
                    <img src={HeroImage} alt="Hero Image" />
                </div>
                {/* Página principal */}
                <div className="landing-content">
                    <h1>DESCUBRE ESTRELAS, AVALIA TALENTOS E CONSTRÓI O AMANHÃ</h1>
                    <p>
                        Com análises preditivas, ferramentas avançadas e uma rede de scouts como nenhum outro,
                        junta-te à plataforma que vai mudar o futuro do Académico de Viseu.
                    </p>
                    <button className="landing-button">DESCARREGA AGORA</button>
                </div>

                <div className="landing-features">
                    <div className="feature-item">
                        <span className="material-symbols-outlined">add</span>
                        <h3>ADICIONA TALENTOS</h3>
                        <p>Identifica talentos promissores e adiciona-os à plataforma.</p>
                    </div>
                    <div className="feature-item">
                        <span className="material-symbols-outlined">access_time</span>
                        <h3>ACOMPANHA-OS</h3>
                        <p>Mede o desenvolvimento e acompanha o progresso dos jogadores.</p>
                    </div>
                    <div className="feature-item">
                        <span className="material-symbols-outlined">build</span>
                        <h3>CONSTRÓI O FUTURO</h3>
                        <p>Ajudamos a moldar o futuro dos próximos jogadores e do clube.</p>
                    </div>
                </div>


            </div>

        </>
    );
};

