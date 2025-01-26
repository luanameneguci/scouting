import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Replaced useHistory with useNavigate
import { setupContentNavbarMargin } from './utils';
import './equipas.css';
import RadioFunctions from '../components/equipas/radioFunctions';
import FootballField from '../components/equipas/footballField';
import PlayerTable from '../components/equipas/playerTable';
import FilterModal from '../components/equipas/filterModal';
import GerirEquipasModal from '../components/equipas/gerirEquipas';
import { CollectionsBookmarkRounded } from '@mui/icons-material';

export default function Equipas() {
    const { idEquipa } = useParams();
    const navigate = useNavigate(); // Replaced useHistory with useNavigate
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [rating, setRating] = useState(0);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [gerirEquipas, setGerirEquipas] = useState(false);
    const [isSombra, setIsSombra] = useState(false); // New state for "Própria" or "Sombra"
    const [escalao, setEscalao] = useState(0); // New state for "escalão"
    const [page, setPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const refGerir = useRef(null);


    useEffect(() => { // Margem top depenendo da altura da navbar
        setupContentNavbarMargin('equipas-wrapper');
        refGerir.current.close();
    }, []);

    useEffect(() => { // Quando, nos filtros, o rating é alterado
        console.log(`Current rating: ${rating}`);
    }, [rating]);

    // Funções de navegação
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    useEffect(() => { // Quando o isSombra ou o escalao é alterado
        // Falta a função para que quando o utilize altere o escalao ou o isSombra, encontrar o id da equipa e atualizar a página com a info da mesma
        if (idEquipa) {
            navigate(`/equipa/${idEquipa}`); // Navigate to the current idEquipa
        }
    }, [isSombra, escalao]);


    const handleGerirModal = () => {
        if (refGerir.current) {
            if (gerirEquipas) refGerir.current.close();
            else refGerir.current.showModal();
            setGerirEquipas(!gerirEquipas);
        }

    };


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

    return (
        <div className='equipas-wrapper'>
            <GerirEquipasModal ref={refGerir} closeModal={handleGerirModal} isOpen={gerirEquipas}/>
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
                <FootballField players={{}} />
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
                    <PlayerTable players={{}} />

                    {/* Botões de Paginação */}
                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={page === 1} // Desativa o botão se for a primeira página
                        >
                            Anterior
                        </button>
                        <span>
                            Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages} // Desativa o botão se for a última página
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
