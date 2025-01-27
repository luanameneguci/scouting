export default function PlayerTable({ players }) {
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
                                <td className="center-align">{player.isInEquipa && <><span className="material-symbols-outlined icon">
                                    check
                                </span></>}</td>
                                <td className="left-align">{player.nome}</td>
                                <td className="left-align">{player.ratingfinal + ' '}
                                    {Array.from({ length: player.ratingfinal }, (_, i) => (
                                        '★'
                                    ))}
                                </td>
                                <td className="right-align">{player.ratinggeral}<span className='text-secondary'>/4</span></td>
                                <td className="left-align">
                                    {player.posicaos.slice(0, 3).map(posicao => `${posicao.designacao} `)}
                                    <span className='text-secondary'>{`(${player.posicaos.length})`}</span>

                                </td>
                                <td className="right-align">{player.datanascimento.substring(0, 4)}</td>
                                <td className="left-align">{player.escalao.designacao}</td>
                                {player.nacionalidades.length !== 0 ?
                                    <td className="left-align">{player.nacionalidades[0].designacao}<span className='text-secondary'>{` (${player.nacionalidades.length})`}</span></td> :
                                    <td className="left-align">
                                        Sem nacionalidade na BD</td>}
                                <td className="left-align">{player.clube.nome}</td>
                                <td className="left-align">Remover Perfil</td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </div >
    );
}