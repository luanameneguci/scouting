import React, { forwardRef, useState, useEffect } from 'react';
import axios from 'axios';
import './gerirEquipas.css';
import LoadingAnim from '../loadingAnim';
import FootballField from './footballField';
import './gerirAtleta.css';

const GerirAtletaModal = forwardRef(({ id, atleta, atletas, operation, isOpen, closeModal }, ref) => {
    const url = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [atletasOrg, setAtletasOrg] = useState(Array(17).fill(null));

    useEffect(() => {
        setAtletasOrg(Array(17).fill(null));
        if (atletas.length!==0) {
            atletas.forEach(atleta => {
                setAtletasOrg(prevState => {
                    const newState = [...prevState]; // Guarda o array antigo
                    newState[atleta.posicaoformacao - 1] = atleta.RelatedEquipaAtleta;
                    return newState; // Retorna o array (para o state)
                });
            });
        }

    }, [atletas]);

    const handleDeleteButton = async () => {
        setLoading(true);
        try {
            await axios.delete(`${url}/equipa/${id}/atleta/${atleta.id_atleta}`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    closeModal();
                } else {
                    throw new Error(res.data.message);
                }
            });
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
        }
        setLoading(false);
    }
    const handleNovaPosicao = async (novaPosicao) => {
        setLoading(true);
        try {
            await axios.put(`${url}/equipa/${id}/atleta/${atleta.id_atleta}/posicao/${novaPosicao}`, {}, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setError('');
                    closeModal();
                } else {
                    console.log(res.data)
                    throw new Error(res.data.message);
                }
            });
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
        }
        setLoading(false);
    };


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
                    setError('')
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
    if (!atleta || !atletasOrg) {
        return (
            <dialog className="gerir-modal modal rounded" ref={ref}>
                <div>
                    <div className='header'>
                        <h1> Gestão de Atleta </h1>
                        <button className="btn-close" onClick={() => { setError(''); closeModal(); }}>
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
        <dialog className="gerir-modal modal rounded" ref={ref}>
            <div>
                <div className='header'>
                    <h1> Gestão de Atleta </h1>
                    <span>

                        {operation === 2 && <button className='rounded-pill font-bold rmv-atleta-equipa' onClick={handleDeleteButton} disabled={loading}>
                            {loading ? <LoadingAnim /> : 'Remover'}
                        </button>}
                        <button className="btn-close" onClick={() => { setError(''); closeModal(); }}>
                            <span className="material-symbols-outlined icon">
                                close
                            </span>
                        </button>
                    </span>

                </div>
            </div>

            {operation === 3 && (<div className='delete-from-equipa'>
                <p>Tem certeza que pretende remover o atleta da equipa?</p>
                <button className='rounded-pill font-bold rmv-atleta-equipa' onClick={handleDeleteButton} disabled={loading}>
                    {loading ? <LoadingAnim /> : 'Remover'}
                </button>
            </ div>)}
            <div>

                {operation === 2 && <><p>Selecione a nova posição de {atleta.nome}: </p><p className='text-secondary'>Ao selecionar uma posição ocupada os atletas trocarão de posições.</p></>}
                {operation === 1 && <><p>Selecione a posição de {atleta.nome}: </p><p className='text-secondary'>Ao selecionar uma posição ocupada o atleta será removido da equipa.</p></>}
                
                {(operation === 2 || operation === 1) && (
                    <div className='field'>
                        <div class='field-wrapper on-modal'>
                            <div class='football-field rounded bg-color-gray-800'>
                                <div>

                                    {atletasOrg.slice(12, 17).map((item, index) => (
                                        <div className='player' onClick={() => handleNovaPosicao(index + 13)}>
                                            {item ?
                                                <p className='name font-bold'>
                                                    {item.nome.split(' ')[0] /* Primeiro Nome*/}
                                                    <br />
                                                    {item.nome.split(' ')[item.nome.split(' ').length - 1] /* Último Nome */}</p>
                                                :
                                                <p className='name free'>
                                                    <span className="material-symbols-outlined icon">
                                                        person_add
                                                    </span>
                                                </p>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {atletasOrg.slice(7, 12).map((item, index) => (
                                        <div className='player' onClick={() => handleNovaPosicao(index + 8)}>
                                            {item ?
                                                <p className='name font-bold'>
                                                    {item.nome.split(' ')[0] /* Primeiro Nome*/}
                                                    <br />
                                                    {item.nome.split(' ')[item.nome.split(' ').length - 1] /* Último Nome */}</p>
                                                :
                                                <p className='name free'>
                                                    <span className="material-symbols-outlined icon">
                                                        person_add
                                                    </span>
                                                </p>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {atletasOrg.slice(2, 7).map((item, index) => (
                                        <div className='player' onClick={() => handleNovaPosicao(index + 3)}>

                                            {item ?
                                                <p className='name font-bold'>
                                                    {item.nome.split(' ')[0] /* Primeiro Nome*/}
                                                    <br />
                                                    {item.nome.split(' ')[item.nome.split(' ').length - 1] /* Último Nome */}</p>
                                                :
                                                <p className='name free'>
                                                    <span className="material-symbols-outlined icon">
                                                        person_add
                                                    </span>
                                                </p>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {atletasOrg.slice(0, 2).map((item, index) => (
                                        <div className='player' onClick={() => handleNovaPosicao(index + 1)}>

                                            {item ?
                                                <p className='name font-bold'>
                                                    {item.nome.split(' ')[0] /* Primeiro Nome*/}
                                                    <br />
                                                    {item.nome.split(' ')[item.nome.split(' ').length - 1] /* Último Nome */}</p>
                                                :
                                                <p className='name free'>
                                                    <span className="material-symbols-outlined icon">
                                                        person_add
                                                    </span>
                                                </p>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div class='field-lines height-100 width-100'>
                                    <div class='center-circle'></div>
                                    <div class='center-line'></div>
                                    <div class='goal-area-top'></div>
                                    <div class='mini-goal-area-top'></div>
                                    <div class='mini-goal-area-top'></div>
                                    <div class='goal-area-bottom'></div>
                                    <div class='mini-goal-area-bottom'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <p>{error}</p>
            </div>
        </dialog>
    )
});
export default GerirAtletaModal;