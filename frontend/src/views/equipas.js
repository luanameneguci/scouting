import React, { useState, useEffect } from 'react';
import { setupContentNavbarMargin } from './utils';
import './equipas.css';

const items = [1, 2, 3, 4, 5];
const FootballFieldPlayers = () => {
    return (
        <div className='player'>
            <p className='position'>EE</p>
            <div className='rating'>5 ★</div>
            <p className='name font-bold'>António<br/>Mendes</p>
            <p className='year text-secondary'>2000</p>
        </div>
    );
};

export default function Equipas() {
    const [selectedRadio, setSelectedRadio] = useState(null);

    useEffect(() => {
        setupContentNavbarMargin('equipas-wrapper');
    }, []);

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
                    <h2>Equipas</h2>
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
                                    <th scope="col" className="right-align">Rating</th>
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
                                    <td className="center-align">1</td>
                                    <td className="left-align">John</td>
                                    <td className="right-align">Doe</td>
                                    <td className="right-align">@jdoe</td>
                                    <td className="left-align">25</td>
                                    <td className="right-align">Forward</td>
                                    <td className="left-align">Team A</td>
                                    <td className="left-align">USA</td>
                                    <td className="left-align">Active</td>
                                    <td className="left-align">sim</td>
                                </tr>
                                <tr>
                                    <td className="center-align">1</td>
                                    <td className="left-align">John</td>
                                    <td className="right-align">Doe</td>
                                    <td className="right-align">@jdoe</td>
                                    <td className="left-align">25</td>
                                    <td className="right-align">Forward</td>
                                    <td className="left-align">Team A</td>
                                    <td className="left-align">USA</td>
                                    <td className="left-align">Active</td>
                                    <td className="left-align">sim</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Paginação</p>
                </div>
            </div>
        </div>
    );
};
