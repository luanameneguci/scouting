import React, { useState, useEffect } from 'react';
import { setupContentNavbarMargin } from './utils';
import './equipas.css';

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
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                </div>
                <div className='field-wrapper'>
                    <div className='football-field rounded bg-color-gray-800'>a</div>
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
                <div>
                    <table className="bg-color-gray-800 rounded width-100">
                        <thead>
                            <tr>
                                <th scope="col" className="center-align">#</th>
                                <th scope="col" className="left-align">First</th>
                                <th scope="col" className="left-align">Last</th>
                                <th scope="col" className="left-align">Handle</th>
                                <th scope="col" className="right-align">Age</th>
                                <th scope="col" className="left-align">Position</th>
                                <th scope="col" className="left-align">Team</th>
                                <th scope="col" className="left-align">Country</th>
                                <th scope="col" className="left-align">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="center-align">1</td>
                                <td className="left-align">John</td>
                                <td className="left-align">Doe</td>
                                <td className="left-align">@jdoe</td>
                                <td className="right-align">25</td>
                                <td className="left-align">Forward</td>
                                <td className="left-align">Team A</td>
                                <td className="left-align">USA</td>
                                <td className="left-align">Active</td>
                            </tr>
                            <tr>
                                <td className="center-align">1</td>
                                <td className="left-align">John</td>
                                <td className="left-align">Doe</td>
                                <td className="left-align">@jdoe</td>
                                <td className="right-align">25</td>
                                <td className="left-align">Forward</td>
                                <td className="left-align">Team A</td>
                                <td className="left-align">USA</td>
                                <td className="left-align">Active</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
