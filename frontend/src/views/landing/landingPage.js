import React from 'react';
import HeroImage from '../../assets/heroImage.png';
import GooglePlayIcon from '../../assets/google_play.png'; // Adicione o ícone do Google Play
import AppStoreIcon from '../../assets/apple.png'; // Adicione o ícone da App Store
import './landingPage.css';
import FooterWEB from '../../components/footerWEB';

export default function LandingPage() {
    return (
        <>
            <div className="landing-page">
                <div className='landing-content hero-section'>
                    <img src={HeroImage} alt="Hero Image" />
                    <div className="hero-content">
                        <h1>DESCOBRE ESTRELAS, AVALIA TALENTOS E CONSTRÓI O AMANHÃ</h1>
                        <p>
                        Cria relatórios pormenorizados, monitoriza o desempenho e avalia cada partida com precisão. Regista a evolução dos jogadores e garante que o talento do Académico de Viseu seja potenciado ao máximo, jogo após jogo, temporada após temporada.
                        </p>
                        <button className="landing-button">DESCARREGA AGORA</button>
                    </div>
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

                <div className='landing-segundocontainer'>
                    <h1>Descobre uma nova forma de interagir</h1>
                </div>

                <div className='landing-segundocontainer'>
                    <h1>Descarrega já e contribui para o sucesso do Académico</h1>
                    <div className="download-buttons">
                        <a href="https://play.google.com/store" className="download-button">
                            <img src={GooglePlayIcon} alt="google" />
                            Google Play
                        </a>
                        <a href="https://www.apple.com/app-store/" className="download-button">
                            <img src={AppStoreIcon} alt="App Store" />
                            App Store
                        </a>
                    </div>
                </div>
                <FooterWEB />

            </div>
        </>
    );
}
