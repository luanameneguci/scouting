import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setupContentNavbarMargin } from './utils';
import './equipas.css';
import RadioFunctions from '../components/equipas/radioFunctions';
import FootballField from '../components/equipas/footballField';
import PlayerTable from '../components/equipas/playerTable';
import FilterModal from '../components/equipas/filterModal';
import GerirEquipasModal from '../components/equipas/gerirEquipas';
import GerirAtletaModal from '../components/equipas/gerirAtleta';
import LoadingAnim from '../components/loadingAnim';

export default function Equipas() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    // Margem top depenendo da altura da navbar
    useEffect(() => {
        setupContentNavbarMargin('equipas-wrapper');
    }, []);


    // ID da equipa selecionada
    const { idEquipa } = useParams();
    // Equipa selecionada
    const [equipa, setEquipa] = useState({});
    // Equipa selecionada é sombra?
    const [isSombra, setIsSombra] = useState(false); // New state for "Própria" or "Sombra"
    // Escalao da equipa selecionada?
    const [escalao, setEscalao] = useState(0); // New state for "escalão"
    useEffect(() => {
        try {
            if (idEquipa) {
                axios.get(`${url}/equipa/${idEquipa}`, { withCredentials: true }).then((res) => {
                    if (res.status === 200) {
                        setEquipa(res.data.equipa);
                    } else {
                        throw new Error(res.data.message);
                    }
                });
            }
        }
        catch (error) {
            console.error("Erro ao receber informação da equipa: ", error);
        }
    }, [idEquipa]);

    const [atletasEquipa, setAtletasEquipa] = useState([]);
    //Buscar os atletas da equipa
    const fetchEquipaPlayers = async () => {
        try {
            await axios.get(`${url}/equipa/${idEquipa}/atletas`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setAtletasEquipa(res.data.atletas);
                } else {
                    throw new Error(res.data.message);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Modal de filtro (estado)
    const [filtroOpen, setfiltroOpen] = useState(false);
    // Referência para o modal de filtro (para poder fechar e abrir)
    const refFiltros = useRef(null);
    // Nome de atleta para pesquisa
    const [nomeSearch, setNomeSearch] = useState('');
    // Filtros completos
    const [filtros, setFiltros] = useState({
        nome: '',
        funcao: 0,
        ratingMin: 0,
        ratingGeralMin: 0,
        anoMax: 0,
        anoMin: 0,
        escalaoMax: 0,
        escalaoMin: 0,
        clube: 0,
        nacionalidade: 0
    });

    // Função para abrir e fechar o modal de gerir equipas
    const handleFiltrosModal = () => {
        if (refFiltros.current) {
            if (filtroOpen) refFiltros.current.close();
            else refFiltros.current.showModal();
            setfiltroOpen(!filtroOpen);
        }

    };
    // Modal de gerir equipas (estado)
    const [gerirEquipas, setGerirEquipas] = useState(false);
    // Referência para o modal de gerir equipas (para poder fechar e abrir)
    const refGerir = useRef(null);
    // Função para abrir e fechar o modal de gerir equipas
    const handleGerirModal = () => {
        if (refGerir.current) {
            if (gerirEquipas) refGerir.current.close();
            else refGerir.current.showModal();
            setGerirEquipas(!gerirEquipas);
        }

    };

    // Paginação
    const [page, setPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    // Funções de navegação
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };


    // Atletas
    const [atletas, setAtletas] = useState(null);


    useEffect(() => {
        setPage(1); // Muda a página, e atualiza a lista de atletas
    }, [filtros]);
    const fetchAtletas = async () => {
        try {
            await axios.post(`${url}/atleta/todos/${idEquipa}`, { page, filtros }, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setAtletas(res.data.atletas);
                    setTotalPages(Math.ceil(res.data.totalPages));

                } else {
                    throw new Error(res.data.message);
                }
            });

        } catch (error) {
            console.error("Erro ao receber informação: ", error);
        }
    }



    useEffect(() => { // Quando o isSombra ou o escalao é alterado
        // Falta a função para que quando o utilize altere o escalao ou o isSombra, encontrar o id da equipa e atualizar a página com a info da mesma
        if (idEquipa) {
            navigate(`/equipa/${idEquipa}`); // Navigate to the current idEquipa
        }
    }, [isSombra, escalao]);




    const handleFilterButtonClick = (event) => { // Abrir e fechar o modal de filtros
        event.preventDefault();
        handleFiltrosModal();
    };

    const handleGerirButtonClick = (event) => {
        event.preventDefault();
        handleGerirModal();

    };
    // Id do atleta selecionado (para remover, editar ou adicionar)
    const [atletaSelecionado, setAtletaSelecionado] = useState(null);
    // Operação a realizar no atleta selecionado (1 - Adicionar, 2 - Editar, 3 - Remover)
    const [atletaOperation, setAtletaOperation] = useState(null);
    // Modal de gerir equipas (estado)
    const [gerirAtleta, setGerirAtleta] = useState(false);
    // Referência para o modal de gerir equipas (para poder fechar e abrir)
    const refAtleta = useRef(null);
    // Função para abrir e fechar o modal de gerir equipas
    const handleAtletaModal = () => {
        if (refAtleta.current) {
            if (gerirAtleta) refAtleta.current.close();
            else refAtleta.current.showModal();
            setGerirAtleta(!gerirAtleta);
        }

    };
    useEffect(() => {
        if (atletaSelecionado && atletaOperation) handleAtletaModal();
    }, [atletaSelecionado, atletaOperation]);

    useEffect(() => {
        fetchAtletas();
        fetchEquipaPlayers();
    }, [page, idEquipa, filtros]);

    if (!atletas || !equipa || !atletasEquipa) 
        return <div className='equipas-wrapper'><LoadingAnim /></div>;
    return (
        <div className='equipas-wrapper'>
            <GerirAtletaModal ref={refAtleta} closeModal={() => {
                handleAtletaModal();
                setAtletaOperation(null);
                setAtletaSelecionado(null); 
                fetchAtletas();
                fetchEquipaPlayers();
            }} isOpen={gerirAtleta} atleta={atletaSelecionado} operation={atletaOperation} id={idEquipa} atletas={atletasEquipa}  />

            <GerirEquipasModal ref={refGerir} closeModal={handleGerirModal} isOpen={gerirEquipas} />
            <FilterModal ref={refFiltros} closeModal={handleFiltrosModal} isOpen={filtroOpen} filtros={filtros} setFiltros={setFiltros} escalaoMax={equipa.escalao.id_escalao} />
            <div className="sidebar">
                <div className='field-options'>
                    <h1>Equipas</h1>
                    <div className='equipa-switch'>
                        <span className="switch-label">{isSombra ? 'Sombra' : 'Própria'}</span>
                        <label className="switch">
                            <input type="checkbox" onChange={() => {
                                setIsSombra(!isSombra);
                            }} checked={isSombra} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="dropdown-container">
                        <select className="dropdown" value={escalao} onChange={(e) => setEscalao(parseInt(e.target.value))}>
                            <option value={0}>Séniores</option>
                            <option value={1}>SUB-18</option>
                            <option value={2}>SUB-17</option>
                        </select>
                    </div>
                </div>
                <FootballField atletas={atletasEquipa} selectAtleta={setAtletaSelecionado} selectOperation={setAtletaOperation} />
            </div>
            <div className="content">
                <div className='table-options'>
                    <div>
                        <div className="searchbar bg-color-gray-800 rounded-pill">
                            <input type="text" className="form-control" placeholder="Procurar por nome de atleta" onChange={(e) => setNomeSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setFiltros({ ...filtros, nome: nomeSearch });
                                    }
                                }}
                            />
                            <span className="material-symbols-outlined icon" onClick={() => { setFiltros({ ...filtros, nome: nomeSearch }) }}>
                                search
                            </span>
                        </div>
                        <button className='filter-button rounded' onClick={handleFilterButtonClick}>Filtrar</button>
                        <button className='filter-button rounded' onClick={handleGerirButtonClick}>Gerir Equipas</button>
                    </div>
                    <RadioFunctions filtros={filtros} setFunction={setFiltros} />
                </div>
                <div className='table-container'>
                    {/* Tabela de jogadores */}
                    <PlayerTable players={atletas} selectAtleta={setAtletaSelecionado} selectOperation={setAtletaOperation} />

                    {/* Botões de Paginação */}
                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={page === 1} // Desativa o botão se for a primeira página
                            className='rounded-pill'
                        >
                            Anterior
                        </button>
                        <span>
                            Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages} // Desativa o botão se for a última página
                            className='rounded-pill'

                        >
                            Próxima
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
