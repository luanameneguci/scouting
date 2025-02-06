import React, { forwardRef, useState, useEffect } from 'react';
import axios from 'axios';
import LoadingAnim from '../loadingAnim';
import './filterModal.css';

const FilterModal = forwardRef(({ filtros, setFiltros, isOpen, closeModal, escalaoMax }, ref) => {
    const url = process.env.REACT_APP_API_URL;
    const [escaloes, setEscaloes] = useState([]);
    const [nacionalidades, setNacionalidades] = useState([]);
    const [clubes, setClubes] = useState([]);

    const fetchEscaloes = async () => {
        try {
            await axios.get(`${url}/equipas/info`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setEscaloes(res.data.escaloes.filter(escalao => escalao.id_escalao <= escalaoMax));

                } else {
                    throw new Error(res.data.message);
                }

            });

        } catch (error) {
            console.error("Erro ao receber informação: ", error);
        }
    };
    const fetchNacionalidades = async () => {
        try {
            await axios.get(`${url}/atleta/nacionalidades`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setNacionalidades(res.data.data);

                } else {
                    throw new Error(res.data.message);
                }

            });

        } catch (error) {
            console.error("Erro ao receber informação: ", error);
        }
    };
    const fetchClubes = async () => {
        try {
            await axios.get(`${url}/atleta/clubes`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setClubes(res.data.clubes);

                } else {
                    throw new Error(res.data.message);
                }

            });

        } catch (error) {
            console.error("Erro ao receber informação: ", error);
        }
    };
    useEffect(() => {

        fetchEscaloes();
        fetchNacionalidades();
        fetchClubes();

    }, []);

    const StarRating = () => {
        const handleStarClick = (index) => {
            if (filtros.ratingMin === index + 1) {
                setFiltros({ ...filtros, ratingMin: 0 });
            } else {
                setFiltros({ ...filtros, ratingMin: index + 1 });
            }
        };

        return (
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < filtros.ratingMin ? 'filled' : ''}`}
                        onClick={() => handleStarClick(index)}
                    >
                        {index < filtros.ratingMin ? '★' : '☆'}
                    </span>
                ))}
            </div>
        );
    };

    const handleLimparFiltros = () => {
        setFiltros({
            ...filtros,
            ratingMin: 0,
            ratingGeralMin: 0,
            anoMin: 0,
            anoMax: 0,
            escalaoMin: 0,
            escalaoMax: 0,
            clube: 0,
            nacionalidade: 0
        });
    }
    useEffect(() => {
        const handleClickOutside = (event) => { // Ao clicar fora fecha
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const isInDialog = ( // Verifica se está dentro do modal
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                );

                if (!isInDialog) { // Se não estiver, fecha
                    closeModal();
                }
            }
        };

        if (isOpen) { // Se o modal estiver aberto, adiciona o event listener
            document.addEventListener('mousedown', handleClickOutside);
        } else { // Se não, remove-o
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => { // Cleanup (acho q nem funciona mas yy)
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isOpen, ref, closeModal]);

    if (!escaloes && !nacionalidades && !clubes) {
        return (
            <dialog className="gerir-modal modal rounded" ref={ref}>
                <div>
                    <div className='header'>
                        <h1> Filtragem de atletas </h1>
                        <button className="btn-close" onClick={closeModal}>
                            <span className="material-symbols-outlined icon">
                                close
                            </span>
                        </button>
                    </div>
                    <LoadingAnim />
                </div>
            </dialog>

        )
    }
    return (
        <dialog ref={ref} className='filter-modal modal rounded'>
            <div>
                <div className='header'>
                    <h1> Filtragem de atletas </h1>
                    <span>
                        <button className='text-button rounded' type="button" onClick={handleLimparFiltros}>
                            Limpar Filtros
                        </button>
                        <button className="btn-close" onClick={closeModal}>
                            <span className="material-symbols-outlined icon">
                                close
                            </span>
                        </button>
                    </span>

                </div>

                <form className='filters'>

                    <div className='rating-minimo'>
                        <label className='font-bold'>Rating Mínimo:</label>
                        <hr />
                        <StarRating />
                    </div>
                    <div className='rating-medio-minimo'>
                        <label className='font-bold'>Rating Médio Mínimo:</label>
                        <hr />
                        <div>
                            <input type='number' max='4' min="0" value={filtros.ratingGeralMin} onChange={(e) => setFiltros({ ...filtros, ratingGeralMin: e.target.value })} />
                            <span className='text-secondary'>&emsp;/4</span>
                        </div>
                    </div>
                    <div className='ano-nascimento'>
                        <label className='font-bold'>Ano de Nascimento:</label>
                        <div>
                            <div>
                                <input type='number' max='2025' min="0" value={filtros.anoMin} onChange={(e) => setFiltros({ ...filtros, anoMin: e.target.value })} />
                                <span className='text-secondary'>&emsp;min.</span>
                            </div>
                            <hr />
                            <div>
                                <input type='number' max='2025' min="0" value={filtros.anoMax} onChange={(e) => setFiltros({ ...filtros, anoMax: e.target.value })} />                                <span className='text-secondary'>&emsp;máx.</span>
                            </div>
                        </div>
                    </div>
                    <div className='escalao'>
                        <label className='font-bold'>Escalão:</label>
                        <div>
                            <div>
                                <select value={filtros.escalaoMin} onChange={(e) => setFiltros({ ...filtros, escalaoMin: e.target.value })}>
                                    <option value={0}>-</option>

                                    {
                                        escaloes.map(escalao => (
                                            <option key={escalao.id_escalao} value={escalao.id_escalao}>{escalao.designacao}</option>
                                        ))}

                                </select>
                                <span className='text-secondary'>&emsp;min.</span>
                            </div>
                            <hr />
                            <div>
                                <select value={filtros.escalaoMax} onChange={(e) => setFiltros({ ...filtros, escalaoMax: e.target.value })}>
                                    <option value={0}>-</option>

                                    {
                                        escaloes.map(escalao => (
                                            <option key={escalao.id_escalao} value={escalao.id_escalao}>{escalao.designacao}</option>
                                        ))}
                                </select>
                                <span className='text-secondary'>&emsp;máx.</span>
                            </div>
                        </div>
                    </div>
                    <div className='clube'>
                        <label className='font-bold'>Clube:</label>
                        <select value={filtros.clube} onChange={(e) => setFiltros({ ...filtros, clube: e.target.value })}>
                            <option value={0}>-</option>
                            {
                                clubes.map(clube => (
                                    <option key={clube.id_clube} value={clube.id_clube}>{clube.nome}</option>
                                ))}

                        </select>
                    </div>
                    <div className='nacionalidade'>
                        <label className='font-bold'>Nacionalidade:</label>
                        <select value={filtros.nacionalidade} onChange={(e) => setFiltros({ ...filtros, nacionalidade: e.target.value })}>
                            <option value={0}>-</option>
                            {
                                nacionalidades.map(nacionalidade => (
                                    <option key={nacionalidade.id_nacionalidade} value={nacionalidade.id_nacionalidade}>{nacionalidade.designacao}</option>
                                ))}

                        </select>
                    </div>
                </form>
            </div>

        </dialog >
    );
});

export default FilterModal;