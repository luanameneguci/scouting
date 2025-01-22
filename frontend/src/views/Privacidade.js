import React from 'react';
import AcademicoViseuImage from '../assets/academico_viseu.png';
import PCIcon from '../assets/icone_pc.png';
import DadosIcon from '../assets/icone_dados.png';
import Dados2Icon from '../assets/icone_dados_2.png';
import SegurancaIcon from '../assets/icone_seguranca.png';
import ConservacaoIcon from '../assets/icone_conservacao.png';
import AutoridadeIcon from '../assets/icone_autoridade.png';
import './Privacidade.css';
import Footer from '../components/footerWEB';

export default function Privacidade() {
    return (
        <div className="privacidade-pagepriv">
            <div className="academico-viseu-sectionpriv">
                <img src={AcademicoViseuImage} alt="Académico de Viseu" />
                <div className="header-overlaypriv">
                    <div className="vertical-linepriv"></div>
                    <h1>POLÍTICA DE PRIVACIDADE</h1>
                </div>
            </div>

            <br></br>
            <br></br>
            <div className="contentpriv">
                <div className="sectionpriv">
                    <div className="section-headerpriv">
                        <div className="section-titlepriv">
                            <img className="iconpriv" src={PCIcon} alt="icone_pc" />
                        </div>
                        <h2>1. IDENTIFICAÇÃO DO RESPONSÁVEL PELO TRATAMENTO</h2>
                    </div>
                    <hr className="yellow-linepriv" />
                    <ul>
                        <li>Académico de Viseu Futebol Clube</li>
                        <li>NIPC 503954306</li>
                        <li>Sede: sede no Estádio Municipal do Fontelo, Avenida Anacleto Pinto, freguesia e concelho de Viseu.</li>
                        <li>Contato do EPD (Encarregado da Proteção de Dados) xxxxxx@xxxxxx</li>
                    </ul>
                </div>

                <div className="sectionpriv">
                    <div className="section-headerpriv">
                        <div className="section-titlepriv">
                            <img className="iconpriv" src={DadosIcon} alt="icone_dados" />
                        </div>
                        <h2>2. INFORMAÇÃO, CONSENTIMENTO E FINALIDADE DO TRATAMENTO</h2>
                    </div>
                    <hr className="yellow-linepriv" />
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

                <div className="sectionpriv">
                    <div className="section-headerpriv">
                        <div className="section-titlepriv">
                            <img className="iconpriv" src={SegurancaIcon} alt="icone_seguranca" />
                        </div>
                        <h2>3. MEDIDAS DE SEGURANÇA </h2>
                    </div>
                    <hr className="yellow-linepriv" />
                    <p>
                        O Académico de Viseu Futebol Clube declara que implementou e continuará a implementar as medidas de segurança de natureza técnica e organizativa necessárias para garantir a segurança dos dados de carácter pessoal que lhe sejam fornecidos visando evitar a sua alteração, perda, tratamento e/ou acesso não autorizado, tendo em conta o estado atual da tecnologia,
                        a natureza dos dados armazenados e os riscos a que estão expostos bem como garante a confidencialidade dos mesmos.
                    </p>
                </div>

                <div className="sectionpriv">
                    <div className="section-headerpriv">
                        <div className="section-titlepriv">
                            <img className="iconpriv" src={Dados2Icon} alt="icone_dados_2" />
                        </div>
                        <h2>4. EXERCÍCIO DOS DIREITOS</h2>
                    </div>
                    <hr className="yellow-linepriv" />
                    <p>
                        O titular dos dados pessoais/encarregados de educação podem, exercer a todo o tempo, os seus direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade.
                    </p>
                </div>

                <div className="sectionpriv">
                    <div className="section-headerpriv">
                        <div className="section-titlepriv">
                            <img className="iconpriv" src={ConservacaoIcon} alt="icone_conservacao" />
                        </div>
                        <h2>5. PRAZO DE CONSERVAÇÃO</h2>
                    </div>
                    <hr className="yellow-linepriv" />
                    <p>
                        O Académico de Viseu Futebol Clube apenas trata os dados pessaois durante o período que se revele necessário ao cumprimento da sua finalidade (criação de histórico do atleta desde a formação à profissionalização), sem prejuízo dos dados serem conservados por um período superior, por exigências legais.
                    </p>
                </div>

                <div className="sectionpriv">
                    <div className="section-headerpriv">
                        <div className="section-titlepriv">
                            <img className="iconpriv" src={AutoridadeIcon} alt="icone_autoridade" />
                        </div>
                        <h2>6. AUTORIDADE DE CONTROLO</h2>
                    </div>
                    <hr className="yellow-linepriv" />
                    <p>
                        Nos termos legais, o titular dos dados tem o direito de apresentar uma reclamação em matéria de proteção de dados pessoais à autoridade de controlo competente, a Comissão Nacional de Proteção de Dados (CNPD).
                    </p>
                </div>

            </div>
            <Footer />
        </div>
    );
}
