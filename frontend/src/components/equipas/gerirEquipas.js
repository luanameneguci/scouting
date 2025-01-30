import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './gerirEquipas.css';
import LoadingAnim from '../loadingAnim';

const GerirEquipasModal = forwardRef(({ isOpen, closeModal }, ref) => {
    const url = process.env.REACT_APP_API_URL;
    const [equipas, setEquipas] = useState([]);
    // Filtra por sombra ou própria
    const [sombraSelected, setSombraSelected] = useState(true);

    // Remoção de Equipas
    // Equipa selecionada a ser removida
    const [equipaRemover, setEquipaRemover] = useState(null);
    // Está a carregar?
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Adição de equipas
    // Formulário ativo ou não
    const [addForm, setAddForm] = useState(false);
    // Dados do formulário
    const [addFormData, setAddFormData] = useState({ tipo: 0, escalao: 0 });
    // Erro no formulário
    const [addFormError, setAddFormError] = useState('');
    // Resposta do formulário
    const [addFormResponse, setAddFormResponse] = useState({ message: '', needsConfirmation: false });
    // Está a carregar?
    const [loadingAddForm, setLoadingAddForm] = useState(false);
    // Lista dos tipos e escalões para criar equipa
    const [escaloesTipos, setEscaloesTipos] = useState({ tipos: [], escaloes: [] });

    const fetchDataEquipas = async () => {
        try {
            await axios.get(`${url}/equipas`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setEquipas(res.data.equipas);
                } else {
                    throw new Error(res.data.message);
                }
            });

        } catch (error) {
            console.error("Erro ao receber informação: ", error);
        }
    };
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


    const handleAddForm = async (confirm) => {
        setAddFormResponse('');
        setLoadingAddForm(true);
        setAddFormError('');


        const numeroEquipasSimilares = equipas.filter(equipa => equipa.id_tipoequipa === +addFormData.tipo && equipa.id_escalao === +addFormData.escalao).length;
        // Se já existirem 3 equipas com o mesmo tipo e escalão (divisões A B e C), não pode criar
        if (numeroEquipasSimilares === 3) {
            setAddFormError('Atingiu o máximo de equipas para o tipo e escalão! (divisões A, B e C).');
            setLoadingAddForm(false);

        }
        // Se houverem 1 ou 2 equipas, pergunta se quer criar uma nova divisão, se já estiver confirmado passa para a criação
        else if (!confirm && numeroEquipasSimilares > 0) {
            setAddFormResponse({ message: 'Já existe uma equipa (tipo) com o mesmo tipo e escalão. Deseja criar uma nova divisão (B ou C).', needsConfirmation: true });
            setLoadingAddForm(false);

        }
        else {
            try {
                await axios.post(`${url}/equipa`, { tipo: addFormData.tipo, escalao: addFormData.escalao }, { withCredentials: true }).then((res) => {
                    if (res.status === 200) {
                        fetchDataEquipas();
                        setAddFormResponse({ message: 'Equipa Criada!', needsConfirmation: false });
                        setAddFormError('');
                    }
                    else throw new Error(res.data.message);

                });
            }
            catch (e) {
                setAddFormError(e.response.data.message);

            }
        }
        setLoadingAddForm(false);

    };
    const removeEquipa = async () => {
        setDeleteLoading(true);
        try {
            await axios.delete(`${url}/equipa/${equipaRemover.id_equipa}`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    fetchDataEquipas();
                    setEquipaRemover(null);
                }
                else throw new Error(res.data.message);
                setDeleteLoading(false);

            });
        }
        catch (e) {
            setAddFormError(e.response.data.message);
            setDeleteLoading(false);

        }
    }
    useEffect(() => {
        fetchDataEquipas();
        fetchDataInfo();
    }, []);
    if (!equipas && !escaloesTipos) {
        return (
            <dialog className="gerir-modal modal rounded" ref={ref}>
                <div>
                    <div className='header'>
                        <h1> Gestão de Equipas </h1>
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
        <dialog className="gerir-modal modal rounded" ref={ref}>
            <div>
                <div className='header'>
                    <h1> Gestão de Equipas </h1>
                    <button className="btn-close" onClick={closeModal}>
                        <span className="material-symbols-outlined icon">
                            close
                        </span>
                    </button>
                </div>

                <div className='select-tipo' style={addForm ? { display: 'none' } : { display: 'flex' }}>
                    <span className=" font-bold"> {sombraSelected ? 'Sombra' : 'Própria'} </span> <button className='text-secondary' onClick={() => setSombraSelected(!sombraSelected)}> {!sombraSelected ? '/ Sombra' : '/ Própria'} </button>
                </div>
                <div className="rounded equipas" style={addForm ? { display: 'none' } : { display: 'flex' }}>
                    {
                        equipas.filter((equipa) => (sombraSelected ? equipa.id_tipoequipa === 1 : equipa.id_tipoequipa === 2))
                            .map((equipa, key) => (
                                <div >
                                    <Link to={`/equipa/${equipa.id_equipa}`} key={key}>
                                        <p className='rounded-pill'>
                                            {equipa.tipoequipa.designacao}
                                        </p>
                                        <p>{equipa.escalao.designacao}
                                            <span className='text-secondary'>
                                                {` (${equipa.divisao.designacao})`}
                                            </span>
                                        </p>
                                    </Link>
                                    <button onClick={() => setEquipaRemover(equipa)}>
                                        <span className="material-symbols-outlined icon">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            ))

                    }
                </div>
                {equipaRemover && (
                    <div className='confirm-delete rounded' style={addForm ? { display: 'none' } : { display: 'flex' }}>

                        <p>Tem certeza que pretende eliminar a equipa:&nbsp;
                            <span className='font-bold'>
                                {`${equipaRemover.tipoequipa.designacao} - ${equipaRemover.escalao.designacao} (${equipaRemover.divisao.designacao})`}
                            </span> ?
                            <br />
                            Esta ação é irreversível.   </p>
                        <div>
                            <button className='btn-voltar rounded-pill font-bold' onClick={() => { setEquipaRemover(null) }}>Voltar</button>
                            <button disabled={deleteLoading} className='btn-eliminar rounded-pill font-bold' onClick={() => removeEquipa()}>Eliminar</button>
                        </ div>
                    </div>
                )}
                <div className={`adicionar-equipa rounded ${addForm && 'active'} ${(addForm && addFormError) && ' error'}`}>
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
                    <button className="btn-close" onClick={() => { setAddForm(false); setAddFormResponse({ message: '', needsConfirmation: false }); setAddFormError('') }}>
                        <span className="material-symbols-outlined icon">
                            close
                        </span>
                    </button>
                    <button disabled={loadingAddForm} className='btn-add rounded-pill font-bold' onClick={() => { addForm ? handleAddForm(false) : setAddForm(true) }}>Adicionar</button>

                </div>
            </div>
        </dialog >
    );
});

export default GerirEquipasModal;