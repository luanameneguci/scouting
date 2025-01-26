export default function PlayerTable({players}) {
    return (
        <div className='table-wrapper'>
            <table className="bg-color-gray-800 rounded width-100">
                <thead>
                    <tr>
                        <th scope="col" className="center-align">Inserido</th>
                        <th scope="col" className="left-align">Nome</th>
                        <th scope="col" className="left-align">Rating</th>
                        <th scope="col" className="right-align">Rating Médio</th>
                        <th scope="col" className="left-align">Posição</th>
                        <th scope="col" className="right-align">Ano</th>
                        <th scope="col" className="left-align">Escalão</th>
                        <th scope="col" className="left-align">Nacionalidade</th>
                        <th scope="col" className="left-align">Clube Atual</th>
                        <th scope="col" className="left-align">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="center-align">tick</td>
                        <td className="left-align">Afonso Almeida</td>
                        <td className="left-align">5 ★★★★★</td>
                        <td className="right-align">3.6<span className='text-secondary'>/4</span></td>
                        <td className="left-align">PL <span className='text-secondary'> ATA</span></td>
                        <td className="right-align">2008</td>
                        <td className="left-align">SUB-17</td>
                        <td className="left-align">Portugal</td>
                        <td className="left-align">FC Porto</td>
                        <td className="left-align">Remover Perfil</td>
                    </tr>
                    <tr>
                        <td className="center-align">tick</td>
                        <td className="left-align">Afonso Almeida</td>
                        <td className="left-align">5 ★★★★★</td>
                        <td className="right-align">3.6<span className='text-secondary'>/4</span></td>
                        <td className="left-align">PL <span className='text-secondary'> ATA</span></td>
                        <td className="right-align">2008</td>
                        <td className="left-align">SUB-17</td>
                        <td className="left-align">Portugal</td>
                        <td className="left-align">FC Porto</td>
                        <td className="left-align">Remover Perfil</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}