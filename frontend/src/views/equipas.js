import React, { useState, useEffect } from 'react';
import { setupContentNavbarMargin } from './utils';
import './equipas.css';

const items = [1, 2, 3, 4, 5];

const FootballFieldPlayers = () => {
    return (
        <div className='player'>
            <p className='position'>EE</p>
            <div className='rating'>5 ★</div>
            <p className='name font-bold'>António<br />Mendes</p>
            <p className='year text-secondary'>2000</p>
        </div>
    );
};

const StarRating = ({ rating, setRating }) => {
    const handleStarClick = (index) => {
        if (rating === index + 1) {
            setRating(0); // Unselect if the same star is clicked
        } else {
            setRating(index + 1);
        }
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`star ${index < rating ? 'filled' : ''}`}
                    onClick={() => handleStarClick(index)}
                >
                    {index < rating ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default function Equipas() {
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setupContentNavbarMargin('equipas-wrapper');
    }, []);

    useEffect(() => {
        console.log(`Current rating: ${rating}`);
    }, [rating]);

    const handleRadioClick = (value) => {
        if (selectedRadio === value) {
            setSelectedRadio(null);
            console.log(`Deselected: ${value}`);
        } else {
            setSelectedRadio(value);
            console.log(`Selected: ${value}`);
        }
    };

    return (
        <div className='equipas-wrapper'>
            <div className="sidebar">
                <div className='field-options'>
                    <h1>Equipas</h1>
                    <div className='equipa-switch'>
                        <span className="switch-label">Sombra</span>

                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="dropdown-container">
                        <select className="dropdown">
                            <option value="seniores">Séniores</option>
                            <option value="sub-18">SUB-18</option>
                            <option value="sub-17">SUB-17</option>
                        </select>
                    </div>
                </div>
                <div className='field-wrapper'>
                    <div className='football-field rounded bg-color-gray-800'>
                        <div>
                            {items.map(() => {
                                return FootballFieldPlayers();
                            })}
                        </div>
                        <div>
                            {items.map(() => {
                                return FootballFieldPlayers();
                            })}
                        </div>                   <div>
                            {items.map(() => {
                                return FootballFieldPlayers();
                            })}
                        </div>                   <div>
                            {items.slice(0, 2).map(() => {
                                return FootballFieldPlayers();
                            })}
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
            </div>
            <div className="content">
                <div className='table-options'>
                    <div>
                        <div className="searchbar bg-color-gray-800 rounded-pill">
                            <input type="text" className="form-control" placeholder="Procurar por nome de atleta" />
                            <span className="material-symbols-outlined icon">
                                search
                            </span>
                        </div>
                        <button className='filter-button rounded'>Filtrar</button>
                    </div>
                    <div className='radio-buttons'>
                        <input
                            type="radio"
                            className="radio-input"
                            id="atacantes"
                            checked={selectedRadio === 'atacantes'}
                            onClick={() => handleRadioClick('atacantes')}
                        />
                        <label htmlFor="atacantes" className="font-bold">ATA</label>

                        <input
                            type="radio"
                            className="radio-input"
                            id="medios"
                            checked={selectedRadio === 'medios'}
                            onClick={() => handleRadioClick('medios')}
                        />
                        <label htmlFor="medios" className="font-bold">MED</label>

                        <input
                            type="radio"
                            className="radio-input"
                            id="defesas"
                            checked={selectedRadio === 'defesas'}
                            onClick={() => handleRadioClick('defesas')}
                        />
                        <label htmlFor="defesas" className="font-bold">DEF</label>

                        <input
                            type="radio"
                            className="radio-input"
                            id="redes"
                            checked={selectedRadio === 'redes'}
                            onClick={() => handleRadioClick('redes')}
                        />
                        <label htmlFor="redes" className="font-bold">GR</label>
                    </div>
                </div>
                <div className='table-container'>
                    <div className='table-wrapper'>
                        <table className="bg-color-gray-800 rounded width-100">
                            <thead>
                                <tr>
                                    <th scope="col" className="center-align">Inserido</th>
                                    <th scope="col" className="left-align">Nome</th>
                                    <th scope="col" className="left-align">Rating</th>
                                    <th scope="col" className="right-align">Rating Médio</th>
                                    <th scope="col" className="left-align">Posição</th>
                                    <th scope="col" className="right-align">Ano</th>
                                    <th scope="col" className="left-align">Escalão</th>
                                    <th scope="col" className="left-align">Nacionalidade</th>
                                    <th scope="col" className="left-align">Clube Atual</th>
                                    <th scope="col" className="left-align">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="center-align">tick</td>
                                    <td className="left-align">Afonso Almeida</td>
                                    <td className="left-align">5 ★★★★★</td>
                                    <td className="right-align">3.6<span className='text-secondary'>/4</span></td>
                                    <td className="left-align">PL <span className='text-secondary'> ATA</span></td>
                                    <td className="right-align">2008</td>
                                    <td className="left-align">SUB-17</td>
                                    <td className="left-align">Portugal</td>
                                    <td className="left-align">FC Porto</td>
                                    <td className="left-align">Remover Perfil</td>
                                </tr>
                                <tr>
                                    <td className="center-align">tick</td>
                                    <td className="left-align">Afonso Almeida</td>
                                    <td className="left-align">5 ★★★★★</td>
                                    <td className="right-align">3.6<span className='text-secondary'>/4</span></td>
                                    <td className="left-align">PL <span className='text-secondary'> ATA</span></td>
                                    <td className="right-align">2008</td>
                                    <td className="left-align">SUB-17</td>
                                    <td className="left-align">Portugal</td>
                                    <td className="left-align">FC Porto</td>
                                    <td className="left-align">Remover Perfil</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Paginação</p>
                    <div className='filters-container height-100 width-100'>
                        <form className='filters'>
                            <div className='filters-head'>
                                <button className='filter-button rounded'>
                                    <span className="material-symbols-outlined icon">
                                        close
                                    </span>                                </button>
                                    <button className='filter-button rounded'>
                                        Limpar Filtros
                                    </button>
                            </div>
                            <div className='rating-minimo'>
                                <label>Rating Mínimo:</label>
                                <hr />
                                <StarRating rating={rating} setRating={setRating} />
                            </div>
                            <div className='rating-medio-minimo'></div>
                            <div className='ano-nascimento'></div>
                            <div className='escalao'></div>
                            <div className='posicao'></div>
                            <div className='clube'></div>
                            <div className='nacionalidade'></div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
