import React from 'react'; 
import AcademicoViseuImage from '../assets/academico_viseu.png'; // Importação da nova imagem
import './Privacidade.css';

export default function Privacidade() {
    return (
        <div className="privacidade-page">
            <div className="academico-viseu-section">
                <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                <div className="header-overlay">
                    <div className="vertical-line"></div>
                    <h1>POLÍTICA DE PRIVACIDADE</h1>
                </div>
            </div>

            <div className="content">
                <div className="section">
                    <div className="section-header">
                        <div className="section-icon">
                            {/* Espaço para o ícone */}
                        </div>
                        <h2>1. IDENTIFICAÇÃO DO RESPONSÁVEL PELO TRATAMENTO</h2>
                    </div>
                    <hr className="yellow-line" />
                    <ul>
                        <li>Académico de Viseu Futebol Clube</li>
                        <li>NIPC 503954306</li>
                        <li>Sede: sede no Estádio Municipal do Fontelo, Avenida Anacleto Pinto, freguesia e concelho de Viseu.</li>
                        <li>Contato do EPD (Encarregado da Proteção de Dados) xxxxxx@xxxxxx</li>
                    </ul>
                </div>

                <div className="section">
                    <div className="section-header">
                        <div className="section-icon">
                            {/* Espaço para o ícone */}
                        </div>
                        <h2>2. INFORMAÇÃO, CONSENTIMENTO E FINALIDADE DO TRATAMENTO</h2>
                    </div>
                    <hr className="yellow-line" />
                    <p>
                        A Lei da Proteção de Dados Pessoais (em diante "LPD") e o Regulamento Geral de Proteção de Dados (Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho de 27 de abril de 2016, em diante "RGPD") e a Lei 58/2019, de 8 de agosto, asseguram a proteção das pessoas singulares no que diz respeito ao tratamento de dados pessoais e à livre circulação desses dados.
                    </p>
                    <p>
                        Mediante a aceitação da presente Política de Privacidade e/ou Termos e Condições o utilizador presta o seu consentimento informado, expresso, livre e inequívoco para que os dados pessoais fornecidos sejam incluídos num ficheiro da responsabilidade do Académico de Viseu Futebol Clube, cujo tratamento nos termos do RGPD cumpre as medidas de segurança técnicas e organizativas adequadas.
                    </p>
                    <p>
                        Os dados presentes nesta base são utilizados no âmbito dos dados prestados pelos próprios ou encarregados de educação no alusivo da sua registo, sendo tratados apenas para a criação do histórico do jogador de futebol/atleta.
                    </p>
                    <p>
                        Em caso algum será solicitada informação sobre convicções filosóficas ou políticas, filiação partidária ou sindical, fé religiosa, vida privada e origem racial ou étnica bem como os dados relativos à saúde e à vida sexual, incluindo os dados genéticos. Os dados recolhidos não serão cedidos a outras pessoas ou outras entidades, sem o consentimento prévio do titular dos dados.
                    </p>
                </div>
            </div>
        </div>
    );
}
