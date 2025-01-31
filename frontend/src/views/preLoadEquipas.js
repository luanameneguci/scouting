import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Equipas from './equipas';
import LoadingAnim from '../components/loadingAnim';
import { setupContentNavbarMargin } from './utils';


export default function PreLoadEquipas() {
    const url = process.env.REACT_APP_API_URL;

    // Margem top dependendo da altura da navbar
    useEffect(() => {
        setupContentNavbarMargin('equipas-wrapper');
    }, []);

    const { idEquipa } = useParams();

    const [equipaExists, setEquipaExists] = useState(false);
    const [mostrarAddForm, setMostrarAddForm] = useState(false);
    const [equipa, setEquipa] = useState(null);
    const [loadingPesquisa, setLoadingPesquisa] = useState(true);

    // Função para buscar os tipos e escalões
    useEffect(() => {
        if (mostrarAddForm) {
            const fetchAddDataInfo = async () => {
                try {
                    await axios.get(`${url}/equipas/info`, { withCredentials: true }).then((res) => {
                        if (res.status === 200) {
                            setEscaloesTipos(res.data);
                            setAddFormData({ tipo: res.data.tipos[0].id_tipoequipa, escalao: res.data.escaloes[0].id_escalao });
                        } else {
                            throw new Error(res.data.message);
                        }
                    });
                } catch (error) {
                    console.error("Erro ao receber informação: ", error);
                }
            };
            fetchAddDataInfo();
        }
    }, [mostrarAddForm]);


    useEffect(() => { // Procura a equipa
        setEquipaExists(false);
        setMostrarAddForm(false);
        setEquipa(null);
        setLoadingPesquisa(true);
        const fetchEquipa = async () => {
            setLoadingPesquisa(true);
            try {
                if (idEquipa) { // Se houver ID procura se a equipa existe ou não
                    const res = await axios.get(`${url}/equipa/${idEquipa}`, { withCredentials: true });
                    if (res.status === 200) {
                        setEquipa(res.data.equipa);
                        setEquipaExists(true);
                    } else {
                        throw new Error(res.data.message);
                    }
                } else { // Se não existir, vai buscar a primeira 
                    const res = await axios.get(`${url}/equipas`, { withCredentials: true });
                    if (res.status === 200) {
                        if (res.data.equipas.length === 0) { // Se não houverem equipas
                            setMostrarAddForm(true);
                        } else { // Se encontrar a equipa
                            setEquipa(res.data.equipas[0]);
                            setEquipaExists(true);
                        }
                    }
                }
            } catch (error) {
                setEquipaExists(false);
                alert("deu erro no try para verificar se a equipa exist")
                console.error("Erro ao receber informação da equipa: ", error);
            }
            setLoadingPesquisa(false);

        };

        fetchEquipa();

    }, [idEquipa]);



    // Adição de equipa
    // Dados do formulário
    const [addFormData, setAddFormData] = useState({ tipo: 0, escalao: 0 });
    // Erro no formulário
    const [addFormError, setAddFormError] = useState('');
    // Resposta do formulário
    const [addFormResponse, setAddFormResponse] = useState('');
    // Está a carregar?
    const [loadingAddForm, setLoadingAddForm] = useState(false);
    // Lista dos tipos e escalões para criar equipa
    const [escaloesTipos, setEscaloesTipos] = useState({ tipos: [], escaloes: [] });
    // Função para adicionar uma nova equipa
    const handleAddForm = async () => {
        setAddFormResponse('');
        setLoadingAddForm(true);
        setAddFormError('');


        try {
            await axios.post(`${url}/equipa`, { tipo: addFormData.tipo, escalao: addFormData.escalao }, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setEquipa(res.data.equipa);
                    setEquipaExists(true);
                } else throw new Error(res.data.message);
            });
        } catch (e) {
            setAddFormError(e.response.data.message);
        }

        setLoadingAddForm(false);
    };

    if (loadingPesquisa) return <div className='equipas-wrapper'><LoadingAnim /></div>;
    else {
        if (!equipaExists) {
            if (mostrarAddForm) {
                return (
                    <div className='equipas-wrapper'>
                        <div className={`adicionar-equipa rounded not-modal${addFormError && ' error'}`}>
                            <h1>Não existem equipas, crie uma: </h1>
                            <form>
                                <span className='inputs-container'>
                                    <label htmlFor="tipo">Tipo:</label>
                                    <select id="tipo" name="tipo" value={addFormData.tipo} onChange={(e) => setAddFormData({ ...addFormData, tipo: e.target.value })}>
                                        {escaloesTipos.tipos.map((tipo, key) => (
                                            <option key={key} value={tipo.id_tipoequipa}>{tipo.designacao}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="escalao">Escalão:</label>
                                    <select id="escalao" name="escalao" value={addFormData.escalao} onChange={(e) => setAddFormData({ ...addFormData, escalao: e.target.value })}>
                                        {escaloesTipos.escaloes.map((escalao, key) => (
                                            <option key={key} value={escalao.id_escalao}>{escalao.designacao}</option>
                                        ))}
                                    </select>
                                </span>
                                <p className='error'>{addFormError}</p>
                                <p>{addFormResponse}</p>

                            </form>

                            <button disabled={loadingAddForm} className='btn-add rounded-pill font-bold' onClick={handleAddForm}>Adicionar</button>

                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className='equipas-wrapper not-found'>
                        Equipa não encontrada.
                        <Link to='/equipa' className='rounded-pill font-bold'>Ir para uma equipa</Link>
                    </div>
                );
            }
        }
        else return <Equipas equipa={equipa} />;

    }

}
