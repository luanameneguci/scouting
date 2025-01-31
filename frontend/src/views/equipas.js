import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './equipas.css';
import RadioFunctions from '../components/equipas/radioFunctions';
import FootballField from '../components/equipas/footballField';
import PlayerTable from '../components/equipas/playerTable';
import FilterModal from '../components/equipas/filterModal';
import GerirEquipasModal from '../components/equipas/gerirEquipas';
import GerirAtletaModal from '../components/equipas/gerirAtleta';
import LoadingAnim from '../components/loadingAnim';
import { setupContentNavbarMargin } from './utils';


export default function Equipas({ equipa }) {
    const url = process.env.REACT_APP_API_URL;

    // Margem top dependendo da altura da navbar
    useEffect(() => {
        setupContentNavbarMargin('equipas-wrapper');
    }, []);


    // ID da equipa selecionada
    const idEquipa = equipa.id_equipa;


    // Estado para os atletas da equipa
    const [atletasEquipa, setAtletasEquipa] = useState([]);

    // Função para buscar os atletas da equipa
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

    // Estado e referência para o modal de filtro
    const [filtroOpen, setfiltroOpen] = useState(false);
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

    // Função para abrir e fechar o modal de filtros
    const handleFiltrosModal = () => {
        if (refFiltros.current) {
            if (filtroOpen) refFiltros.current.close();
            else refFiltros.current.showModal();
            setfiltroOpen(!filtroOpen);
        }
    };

    // Estado e referência para o modal de gerir equipas
    const [gerirEquipas, setGerirEquipas] = useState(false);
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

    // Estado para os atletas
    const [atletas, setAtletas] = useState(null);

    // Efeito para mudar a página e atualizar a lista de atletas
    useEffect(() => {
        setPage(1);
    }, [filtros]);

    // Função para buscar os atletas
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
    };


    // Função para abrir e fechar o modal de filtros
    const handleFilterButtonClick = (event) => {
        event.preventDefault();
        handleFiltrosModal();
    };

    // Função para abrir e fechar o modal de gerir equipas
    const handleGerirButtonClick = (event) => {
        event.preventDefault();
        handleGerirModal();
    };

    // Estado para o atleta selecionado e operação a realizar
    const [atletaSelecionado, setAtletaSelecionado] = useState(null);
    const [atletaOperation, setAtletaOperation] = useState(null);

    // Estado e referência para o modal de gerir atleta
    const [gerirAtleta, setGerirAtleta] = useState(false);
    const refAtleta = useRef(null);

    // Função para abrir e fechar o modal de gerir atleta
    const handleAtletaModal = () => {
        if (refAtleta.current) {
            if (gerirAtleta) refAtleta.current.close();
            else refAtleta.current.showModal();
            setGerirAtleta(!gerirAtleta);
        }
    };

    // Efeito para abrir o modal de gerir atleta quando um atleta é selecionado
    useEffect(() => {
        if (atletaSelecionado && atletaOperation) handleAtletaModal();
    }, [atletaSelecionado, atletaOperation]);

    // Efeito para buscar os atletas e os jogadores da equipa
    useEffect(() => {
        fetchAtletas();
        fetchEquipaPlayers();
    }, [page, idEquipa, filtros]);



    // Renderizar animação de carregamento se os dados ainda não foram carregados
    if (!atletas || !atletasEquipa)
        return <div className='equipas-wrapper'><LoadingAnim /></div>;

    return (
        <div className='equipas-wrapper'>
            <GerirAtletaModal ref={refAtleta} closeModal={() => {
                handleAtletaModal();
                setAtletaOperation(null);
                setAtletaSelecionado(null);
                fetchAtletas();
                fetchEquipaPlayers();
            }} isOpen={gerirAtleta} atleta={atletaSelecionado} operation={atletaOperation} id={idEquipa} atletas={atletasEquipa} />

            <GerirEquipasModal equipaSelected={equipa} ref={refGerir} closeModal={handleGerirModal} isOpen={gerirEquipas} />
            <FilterModal ref={refFiltros} closeModal={handleFiltrosModal} isOpen={filtroOpen} filtros={filtros} setFiltros={setFiltros} escalaoMax={equipa.escalao.id_escalao} />
            <div className="sidebar">
                <div className='field-options'>
                    <h1>Equipas</h1>
                    {equipa && (equipa.tipoequipa.designacao + ' - ' + equipa.escalao.designacao + ' (' + equipa.divisao.designacao + ')')}
                    <button className='text-button rounded' onClick={handleGerirButtonClick}>Gerir</button>
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
                        <button className='text-button rounded' onClick={handleFilterButtonClick}>Filtrar</button>
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
                            className='rounded-pill'>
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
