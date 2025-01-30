import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

    // Margem top dependendo da altura da navbar
    useEffect(() => {
        setupContentNavbarMargin('equipas-wrapper');
    }, []);

    // ID da equipa selecionada
    const { idEquipa } = useParams();
    // Equipa selecionada
    const [equipa, setEquipa] = useState({});
    // Equipa selecionada é sombra?
    const [isSombra, setIsSombra] = useState(false);
    // Escalão da equipa selecionada
    const [escalao, setEscalao] = useState(0);
    // Estado para verificar se a equipa existe
    const [equipaExists, setEquipaExists] = useState(true);
    // Estado para verificar se existem equipas
    const [hasEquipas, setHasEquipas] = useState(true);

    // Estado para o formulário de adicionar equipa
    const [addForm, setAddForm] = useState(false);
    const [addFormData, setAddFormData] = useState({ tipo: 0, escalao: 0 });
    const [addFormError, setAddFormError] = useState('');
    const [addFormResponse, setAddFormResponse] = useState({ message: '', needsConfirmation: false });
    const [loadingAddForm, setLoadingAddForm] = useState(false);
    const [escaloesTipos, setEscaloesTipos] = useState({ tipos: [], escaloes: [] });

    // Efeito para buscar a informação da equipa
    useEffect(() => {
        try {
            if (idEquipa) {
                axios.get(`${url}/equipa/${idEquipa}`, { withCredentials: true }).then((res) => {
                    if (res.status === 200) {
                        setEquipa(res.data.equipa);
                        setEquipaExists(true); // Equipa existe
                    } else {
                        setEquipaExists(false); // Equipa não existe
                        throw new Error(res.data.message);
                    }
                }).catch((error) => {
                    setEquipaExists(false); // Equipa não existe
                    console.error("Erro ao receber informação da equipa: ", error);
                });
            } else {
                axios.get(`${url}/equipas`, { withCredentials: true }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.equipas.length > 3) {
                            navigate('/equipa/' + res.data.equipas[0].id_equipa);
                        } else {
                            setHasEquipas(false); // Não existem equipas
                        }
                    }
                }).catch((error) => {
                    setEquipaExists(false); // Equipa não existe
                    console.error("Erro ao procurar a primeira equipa: ", error);
                });
            }
        } catch (error) {
            setEquipaExists(false); // Equipa não existe
            console.error("Erro ao receber informação da equipa: ", error);
        }
    }, [idEquipa]);

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

    // Efeito para navegar para a equipa atual quando isSombra ou escalao é alterado
    useEffect(() => {
        if (idEquipa) {
            navigate(`/equipa/${idEquipa}`);
        }
    }, [isSombra, escalao]);

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

    // Função para buscar os tipos e escalões
    const fetchDataInfo = async () => {
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

    // Função para adicionar uma nova equipa
    const handleAddForm = async (confirm) => {
        setAddFormResponse('');
        setLoadingAddForm(true);
        setAddFormError('');

        const numeroEquipasSimilares = equipa.filter(equipa => equipa.id_tipoequipa === +addFormData.tipo && equipa.id_escalao === +addFormData.escalao).length;
        // Se já existirem 3 equipas com o mesmo tipo e escalão (divisões A B e C), não pode criar
        if (numeroEquipasSimilares === 3) {
            setAddFormError('Atingiu o máximo de equipas para o tipo e escalão! (divisões A, B e C).');
            setLoadingAddForm(false);
        }
        // Se houverem 1 ou 2 equipas, pergunta se quer criar uma nova divisão, se já estiver confirmado passa para a criação
        else if (!confirm && numeroEquipasSimilares > 0) {
            setAddFormResponse({ message: 'Já existe uma equipa (tipo) com o mesmo tipo e escalão. Deseja criar uma nova divisão (B ou C).', needsConfirmation: true });
            setLoadingAddForm(false);
        } else {
            try {
                await axios.post(`${url}/equipa`, { tipo: addFormData.tipo, escalao: addFormData.escalao }, { withCredentials: true }).then((res) => {
                    if (res.status === 200) {
                        navigate(`/equipa/${res.data.id_equipa}`);
                        setAddFormResponse({ message: 'Equipa Criada!', needsConfirmation: false });
                        setAddFormError('');
                    } else throw new Error(res.data.message);
                });
            } catch (e) {
                setAddFormError(e.response.data.message);
            }
        }
        setLoadingAddForm(false);
    };

    // Renderizar conteúdo baseado na existência da equipa
    if (!equipaExists) {
        if (!hasEquipas) {
            return (
                <div className='equipas-wrapper'>
                    <div className='adicionar-equipa rounded active'>
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
                            <p>{addFormResponse.message}</p>
                        </form>
                        {addFormResponse.needsConfirmation &&
                            <button disabled={loadingAddForm} className='btn-add rounded-pill font-bold' onClick={() => { handleAddForm(true); }}>Confirmar</button>}
                        <button disabled={loadingAddForm} className='btn-add rounded-pill font-bold' onClick={() => { handleAddForm(false) }}>Adicionar</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='equipas-wrapper not-found'>
                    Equipa não encontrada.
                    <Link to='/equipa' className='rounded-pill font-bold'>Ir para uma equipa</Link>
                </div>
            );
        }
    }

    // Renderizar animação de carregamento se os dados ainda não foram carregados
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
            }} isOpen={gerirAtleta} atleta={atletaSelecionado} operation={atletaOperation} id={idEquipa} atletas={atletasEquipa} />

            <GerirEquipasModal ref={refGerir} closeModal={handleGerirModal} isOpen={gerirEquipas} />
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
