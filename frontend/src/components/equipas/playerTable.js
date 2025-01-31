import {Link} from 'react-router-dom';

export default function PlayerTable({ players, selectAtleta, selectOperation }) {
    if (!players) return 'n há atletas';
    return (
        <div className='table-wrapper'>
            <table className="bg-color-gray-800 rounded width-100">
                <thead>
                    <tr>
                        <th scope="col" className="center-align">Inserido</th>
                        <th scope="col" className="left-align">Nome</th>
                        <th scope="col" className="left-align">Rating</th>
                        <th scope="col" className="right-align">Rating Médio</th>
                        <th scope="col" className="left-align">Posições</th>
                        <th scope="col" className="right-align">Ano</th>
                        <th scope="col" className="left-align">Escalão</th>
                        <th scope="col" className="left-align">Nacionalidades</th>
                        <th scope="col" className="left-align">Clube Atual</th>
                        <th scope="col" className="left-align">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map((player, key) => (
                            <tr key={key}>
                                <td className="center-align">  <span className="material-symbols-outlined icon">
                                    {player.isInEquipa ? 'check' : 'close'}
                                </span> </td>
                                <td className="left-align nome">
                                    <Link className='font-bold' to={`/atletas/perfil/${player.id_atleta}`}> {player.nome}</Link>
                                    </td>
                                <td className="left-align">{player.ratingfinal + ' '}
                                    {Array.from({ length: player.ratingfinal }, (_, i) => (
                                        '★'
                                    ))}
                                </td>
                                <td className="right-align">{player.ratinggeral}<span className='text-secondary'>/4</span></td>
                                <td className="left-align" title={player.posicoes.map(posicao => posicao.designacao).join(', ')}>
                                    {player.posicoes.slice(0, 2).map(posicao => `${posicao.designacao} `)}
                                    {player.posicoes.length > 2 && '... '}
                                    <span className='text-secondary'>{`(${player.posicoes.length})`}</span>

                                </td>
                                <td className="right-align">{player.datanascimento.substring(0, 4)}</td>
                                <td className="left-align">{player.escalao.designacao}</td>
                                {player.nacionalidades.length !== 0 ?
                                    <td className="left-align">{player.nacionalidades[0].designacao}<span className='text-secondary'>{` (${player.nacionalidades.length})`}</span></td> :
                                    <td className="left-align">
                                        Sem nacionalidade na BD</td>}
                                <td className="left-align">{player.clube.nome}</td>
                                <td className="left-align actions">
                                    {player.isInEquipa ?
                                        <>
                                            <span className="material-symbols-outlined icon"
                                                onClick={() => { selectAtleta(player); selectOperation(2); }}>
                                                edit
                                            </span>
                                            <span className="material-symbols-outlined icon" onClick={() => { selectAtleta(player); selectOperation(3); }}>
                                                delete
                                            </span></>
                                        :
                                        <span className="material-symbols-outlined icon" onClick={() => { selectAtleta(player); selectOperation(1); }}>
                                            add
                                        </span>}
                                </td>

                            </tr>
                        ))}

                </tbody>
            </table>
        </div >
    );
}