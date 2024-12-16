import React, { useState } from 'react';
import './adicionarjogo.css'; 
import { Person, CalendarToday, SportsSoccer, Group } from '@mui/icons-material'; // Importação dos ícones

export default function AdicionarJogo() {
    const [formData, setFormData] = useState({
        clube1: '',
        clube2: '',
        data: '',
        hora: '',
        treinador: '',
        escalão: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados do Formulário:", formData);
    };

    return (
        <div className="adicionar-jogo-wrapper">
            <h1 className="page-title">Jogos / Adicionar Jogo</h1>

            <form className="form" onSubmit={handleSubmit}>
                {/* Atleta */}
                <div className="form-group">
                    <label htmlFor="atleta">Atleta</label>
                    <div className="input-group">
                        <Person />
                        <select
                            name="atleta"
                            id="atleta"
                            value={formData.clube1}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Clube A">Atleta A</option>
                            <option value="Clube B">Atleta B</option>
                        </select>
                    </div>
                </div>

                {/* Clube 1 */}
                <div className="form-group">
                    <label htmlFor="clube1">Clube 1</label>
                    <div className="input-group">
                        <SportsSoccer />
                        <select
                            name="clube1"
                            id="clube1"
                            value={formData.clube1}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Clube A">Clube A</option>
                            <option value="Clube B">Clube B</option>
                        </select>
                    </div>
                </div>

                {/* Data */}
                <div className="form-group">
                    <label htmlFor="data">Data</label>
                    <div className="input-group">
                        <CalendarToday />
                        <input
                            type="date"
                            name="data"
                            id="data"
                            value={formData.data}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Hora */}
                <div className="form-group">
                    <label htmlFor="hora">Hora</label>
                    <div className="input-group">
                        <Group />
                        <input
                            type="time"
                            name="hora"
                            id="hora"
                            value={formData.hora}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Escalão */}
                <div className="form-group">
                    <label htmlFor="escalao">Escalão</label>
                    <div className="input-group">
                        <Group />
                        <select
                            name="escalao"
                            id="escalao"
                            value={formData.escalão}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Escalão A">Sub-10</option>
                            <option value="Escalão B">Sub-11</option>
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Adicionar
                </button>
            </form>
        </div>
    );
}
