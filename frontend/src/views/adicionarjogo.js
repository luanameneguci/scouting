import React, { useState, useEffect } from 'react';
import './adicionarjogo.css'; // Supondo que você tenha esse arquivo de estilo
import { setupContentNavbarMargin } from './utils';

export default function AdicionarJogo() {
    const [formData, setFormData] = useState({
        clube1: '',
        clube2: '',
        data: '',
        hora: '',
        treinador: '',
        escalão: ''  // Adicionando estado para o escalão
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados do Formulário:", formData);
    };

    useEffect(() => { // Margem top dependendo da altura da navbar
        setupContentNavbarMargin('adicionar-jogo-wrapper');
    }, []);

    return (
        <div className="adicionar-jogo-wrapper">
            <h1 className="page-title">Jogos / Adicionar Jogo</h1>

            <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="clube1">Atleta</label>
                    <select
                        name="Atleta 1"
                        id="1"
                        value={formData.clube1}
                        onChange={handleChange}
                    >
                        <option value="">Selecione</option>
                        <option value="Clube A">Atleta A</option>
                        <option value="Clube B">Atleta B</option>
                    </select>
                </div>
        
                <div className="form-group">
                    <label htmlFor="clube1">Clube 1</label>
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

                <div className="form-group">
                    <label htmlFor="clube2">Clube 2</label>
                    <select
                        name="clube2"
                        id="clube2"
                        value={formData.clube2}
                        onChange={handleChange} >
                        <option value="">Selecione</option>
                        <option value="Clube A">Clube A</option>
                        <option value="Clube B">Clube B</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="data">Data</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hora">Hora</label>
                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo de Escalão */}
                <div className="form-group">
                    <label htmlFor="escalao">Escalão</label>
                    <select
                        name="escalao"
                        id="escalao"
                        value={formData.escalão}
                        onChange={handleChange}
                    >
                        <option value="">Selecione</option>
                        <option value="Escalão A"> Sub-10</option>
                        <option value="Escalão B"> Sub-11</option>
                        <option value="Escalão C"> Sub-12 A</option>
                        <option value="Escalão D"> Sub-12 B</option>
                        <option value="Escalão E"> Sub-13</option>
                        <option value="Escalão F"> Sub-14</option>
                        <option value="Escalão G"> Sub-16 A</option>
                        <option value="Escalão H"> Sub-16 B</option>
                        <option value="Escalão I"> Sub-19</option>
                        <option value="Escalão J"> Sub-23</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="treinador">Treinador</label>
                    <select
                        name="treinador"
                        id="treinador"
                        value={formData.treinador}
                        onChange={handleChange}
                    >
                        <option value="">Selecione</option>
                        <option value="Treinador A">Treinador A</option>
                        <option value="Treinador B">Treinador B</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Adicionar
                </button>
            </form>
        </div>
    );
}
