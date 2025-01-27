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
    //bla bla
    // Equipa selecionada é sombra?
    const [isSombra, setIsSombra] = useState(false); // New state for "Própria" or "Sombra"
    // Escalao da equipa selecionada?
    const [escalao, setEscalao] = useState(0); // New state for "escalão"


    // Modal de filtro
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    // Função selecionada (ATA, MED, ...)?
    const [selectedFunction, setSelectedFunction] = useState(null);
    // Rating selecionado?
    const [rating, setRating] = useState(0);
    // Filtros completos
    const [filtros, setFiltros] = useState({});

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
        const fetchAtletas = async () => {
            try {
                await axios.post(`${url}/atleta/todos/${idEquipa}`,{page}, { withCredentials: true }).then((res) => {
                    if (res.status === 200) {

                        setAtletas(res.data.atletas);
                        setTotalPages(res.data.totalPages);
                    } else {
                        throw new Error(res.data.message);
                    }
                });

            } catch (error) {
                console.error("Erro ao receber informação: ", error);
            }
        }
        fetchAtletas();
    }, [idEquipa, page]);




    useEffect(() => { // Quando o isSombra ou o escalao é alterado
        // Falta a função para que quando o utilize altere o escalao ou o isSombra, encontrar o id da equipa e atualizar a página com a info da mesma
        if (idEquipa) {
            navigate(`/equipa/${idEquipa}`); // Navigate to the current idEquipa
        }
    }, [isSombra, escalao]);





    useEffect(() => {
        // Atualizar lista de jogadores para a função selecionada

    }, [selectedFunction])

    const handleFilterButtonClick = (event) => { // Abrir e fechar o modal de filtros
        event.preventDefault();
        setIsFilterModalVisible(!isFilterModalVisible);
    };

    const handleGerirButtonClick = (event) => {
        event.preventDefault();
        handleGerirModal();

    };

    if (!atletas) return <div className='equipas-wrapper'><LoadingAnim /></div>;
    return (
        <div className='equipas-wrapper'>
            <GerirEquipasModal ref={refGerir} closeModal={handleGerirModal} isOpen={gerirEquipas} />
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
                <FootballField id={idEquipa} />
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
                        <button className='filter-button rounded' onClick={handleFilterButtonClick}>Filtrar</button>
                        <button className='filter-button rounded' onClick={handleGerirButtonClick}>Gerir Equipas</button>
                    </div>
                    <RadioFunctions selectedFunction={selectedFunction} setSelectedFunction={setSelectedFunction} />
                </div>
                <div className='table-container'>
                    {/* Tabela de jogadores */}
                    <PlayerTable players={atletas} />
                    
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
                    {/* Modal de Filtros */}
                    <FilterModal modalVisible={isFilterModalVisible} rating={rating} setRating={setRating} close={handleFilterButtonClick} />
                </div>
            </div>
        </div>
    );
};
