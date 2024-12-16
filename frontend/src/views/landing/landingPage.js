import React from 'react';
import Slider from "react-slick";
import HeroImage from '../../assets/heroImage.png';
import './landingPage.css';
import Image1 from '../../assets/Mockup_cons_jogador.png';
import Image2 from '../../assets/Mockup_inicio.png';
import Image3 from '../../assets/Mockup_inicio2.png';
import Image4 from '../../assets/Mockup_my_task.png';
import Image5 from '../../assets/Mockup_notificações.png';
import Image6 from '../../assets/Mockup_pag_jogador.png';
import Image7 from '../../assets/Mockup_relatorios.png';

export default function LandingPage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

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

                {/* Nova Seção de Carrossel */}
                <div className="carousel-section">
                    <Slider {...settings}>
                        <div className="carousel-item">
                            <img src={Image1} alt="Slide 1" />
                            <div className="carousel-caption">
                                <h3>PÁGINA DO LOGIN</h3>
                                <p>Na app Viriatos Scouting, tens tudo o que precisas para estar sempre a par das novidades do clube e dos teus atletas favoritos. Revê momentos importantes e acede a conteúdos exclusivos, onde e quando quiseres.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={Image2} alt="Slide 2" />
                            <div className="carousel-caption">
                                <h3>Slide 2</h3>
                                <p>Descrição do Slide 2</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={Image3} alt="Slide 3" />
                            <div className="carousel-caption">
                                <h3>Slide 3</h3>
                                <p>Descrição do Slide 3</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={Image4} alt="Slide 4" />
                            <div className="carousel-caption">
                                <h3>Slide 4</h3>
                                <p>Descrição do Slide 4</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={Image5} alt="Slide 5" />
                            <div className="carousel-caption">
                                <h3>Slide 5</h3>
                                <p>Descrição do Slide 5</p>
                            </div>
                        </div>
                    </Slider>
                </div>
                {/* Fim da Nova Seção de Carrossel */}
            </div>
        </>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
        />
    );
}
