import React from 'react';
import HeroImage from '../../assets/heroImage.png';
import GooglePlayIcon from '../../assets/google_play.png'; // Adicione o ícone do Google Play
import AppStoreIcon from '../../assets/apple.png'; // Adicione o ícone da App Store
import './landingPage.css';
import Footer from '../../components/footerWEB';
import Image1 from '../../assets/Mockup_inicio2.png';
import Image2 from '../../assets/Mockup_my_task.png';
import Image3 from '../../assets/Mockup_relatorios.png';
import Image4 from '../../assets/Mockup_cons_jogador.png';
import Image5 from '../../assets/Mockup_pag_jogador.png';
import Image6 from '../../assets/Mockup_notificações.png';
import { useState } from 'react';

export default function LandingPage() {

    const [texto, setTexto] = useState([{ titulo: "Página do Login", texto: "Na app Viriatos Scouting, tens tudo o que precisas para estar sempre a par das novidades do clube e dos teus atletas favoritos. Revê momentos importantes e acede a conteúdos exclusivos, onde e quando quiseres.", imagem: Image1 }, { titulo: "Acompanha os Jogos", texto: "Acompanha os jogos e fica a par dos próximos desafios dos atletas do clube. Com apenas alguns toques, prepara relatórios detalhados e personaliza as tuas análises, tudo acessível na palma da tua mão. \n Fica conectado e não percas nenhum detalhe!", imagem: Image2 },
    { titulo: "Crie os teus relatórios", texto: "Tenha acesso rápido a todos os relatórios que já enviou. Consulte facilmente o histórico de jogos, verifique cada detalhe e acompanhe a evolução dos atletas ao longo do tempo. Tudo organizado e acessível para quando precisar. \n Tenha o passado ao seu alcance!", imagem: Image3 }, { titulo: "Consulta os Jogadores", texto: "Consulta o perfil de cada atleta, incluindo posição, idade, nacionalidade e classificação, e filtra facilmente para encontrar o jogador ideal. Mantenha-te atualizado com informações essenciais em um único lugar. \n Explora e conhece o time em detalhe!", imagem: Image4 }, { titulo: "Observa os teus jogadores", texto: "Vê todas as informações de cada atleta. Consulta o seu desempenho, acompanha a evolução ao longo da época e cria relatórios personalizados. Tudo o que precisas para te manteres a par está na palma da tua mão! \n Descobre e acompanha o desempenho dos atletas em detalhe!", imagem: Image5 }, { titulo: "esteja SEMPRE INFOrmado", texto: "Todas as notificações importantes chegam diretamente até si. Seja sobre atualizações nos pedidos, alertas de novos eventos ou qualquer outra informação relevante, mantenha-se sempre informado e preparado para agir. \n Nunca perca uma atualização!", imagem: Image6 }
    ])
    const [posicao, setPosicao] = useState(0);
    const mudarPosicao = (i) => {
        if (i) {
           if (posicao === texto.length -1) setPosicao (0); 
           else setPosicao(posicao + 1) 
        }
        else {
            if (posicao === 0) setPosicao (texto.length -1); 
           else setPosicao(posicao - 1)

        }
    }
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

                <div className='conteudo'>
                    <h1>Descobre uma nova forma de interagir</h1>
                    <div className='container'>
                        <div className='seta'>
                            <button onClick={()=>{mudarPosicao(false)}}>
                                <span class="material-symbols-outlined">
                                    chevron_left
                                </span>
                            </button>
                        </div>
                        <div className='centro'>
                            
                                <div className='imagem-container'>
                                    <img src={texto[posicao].imagem} />
                                </div>
                                <div>
                                    <h2>
                                        {posicao + 1 + "/" + texto.length}
                                    </h2>
                                    <h3> {texto[posicao].titulo} </h3>
                                    <p> {texto[posicao].texto} </p>
                                </div>
                        </div>
                        <div className='seta'>
                            <button onClick={()=>{mudarPosicao(true)}}>
                                <span class="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='landing-terceirocontainer'>
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
                <Footer />
            </div>
        </>
    );
}