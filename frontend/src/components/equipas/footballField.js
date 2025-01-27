import { useState, useEffect } from 'react';
import axios from 'axios';
import './footballField.css';
import LoadingAnim from '../loadingAnim';

export default function FootballField({ id }) {
    const url = process.env.REACT_APP_API_URL;
    const [atletas, setAtletas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [atletasOrg, setAtletasOrg] = useState(Array(17).fill(null));
    const fetchEquipaPlayers = async () => {
        setLoading(true);
        try {
            await axios.get(`${url}/equipa/${id}/atletas`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setAtletas(res.data.atletas);
                } else {
                    throw new Error(res.data.message);
                }
            });
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchEquipaPlayers();
    }, []);


    const FootballFieldPlayers = ({ atleta }) => {
        return (
            <div className='player'>
                <p className='position'>EE</p>
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
            <div className='player'>
                <div className='rating empty'>+</div>
                <p className='text-secondary'>Espaço<br />livre</p>
            </div>
        );
    }
    useEffect(() => {
        atletas.forEach(atleta => {
            setAtletasOrg(prevState => {
                const newState = [...prevState]; // Guarda o array antigo
                newState[atleta.posicaoformacao - 1] = atleta.RelatedEquipaAtleta; // Atualiza o array
                return newState; // Retorna o array (para o state)
            });
        });
    }, [atletas]);

    if (loading) return <div><LoadingAnim /></div>;
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