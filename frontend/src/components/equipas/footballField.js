import { useState, useEffect } from 'react';
import axios from 'axios';
import './footballField.css';
import LoadingAnim from '../loadingAnim';

export default function FootballField({ atletas, selectAtleta, selectOperation }) {
    const [atletasOrg, setAtletasOrg] = useState(Array(17).fill(null));




    const FootballFieldPlayers = ({ atleta }) => {
        return (
            <div className='player' onClick={() => {selectAtleta(atleta); selectOperation(2);}}>
                <div className={`font-bold rating ${atleta.ratingfinal == '5' && 'golden'}`}>{atleta.ratingfinal} ★</div>
                <p className='name font-bold'>
                    {atleta.nome.split(' ')[0] /* Primeiro Nome*/}
                    <br />
                    {atleta.nome.split(' ')[atleta.nome.split(' ').length - 1] /* Último Nome */}</p>
                <p className='year text-secondary'>{atleta.datanascimento.substring(0, 4)}</p>
            </div>
        );
    };
    const FootballFieldPlayersEmpty = () => {
        return (
            <div className='player empty'>
                <div className='rating empty'>+</div>
                <p className='text-secondary'>Espaço<br />livre</p>
            </div>
        );
    }
    useEffect(() => {
        setAtletasOrg(Array(17).fill(null))
        if (atletas) {

            atletas.forEach(atleta => {
                setAtletasOrg(prevState => {
                    const newState = [...prevState]; // Guarda o array antigo
                    newState[atleta.posicaoformacao - 1] = atleta.RelatedEquipaAtleta; // Atualiza o array
                    return newState; // Retorna o array (para o state)
                });
            });
        }
    }, [atletas]);

    if (!atletasOrg) return <div><LoadingAnim /></div>;
    return (
        <div className='field-wrapper'>
            <div className='football-field rounded bg-color-gray-800'>
                <div>
                    {atletasOrg.slice(12, 17).map((item, index) => (
                        item ? <FootballFieldPlayers atleta={item} key={index} /> : <FootballFieldPlayersEmpty />
                    ))}
                </div>
                <div>
                    {atletasOrg.slice(7, 12).map((item, index) => (
                        item ? <FootballFieldPlayers atleta={item} key={index} /> : <FootballFieldPlayersEmpty />
                    ))}
                </div>
                <div>
                    {atletasOrg.slice(2, 7).map((item, index) => (
                        item ? <FootballFieldPlayers atleta={item} key={index} /> : <FootballFieldPlayersEmpty />
                    ))}
                </div>
                <div>
                    {atletasOrg.slice(0, 2).map((item, index) => (
                        item ? <FootballFieldPlayers atleta={item} key={index} /> : <FootballFieldPlayersEmpty />
                    ))}
                </div>
                <div className='field-lines height-100 width-100'>
                    <div className="center-circle"></div>
                    <div className='center-line'></div>
                    <div className='goal-area-top'></div>
                    <div className='mini-goal-area-top'></div>
                    <div className='mini-goal-area-top'></div>
                    <div className='goal-area-bottom'></div>
                    <div className='mini-goal-area-bottom'></div>


                </div>
            </div>
        </div>
    );
}