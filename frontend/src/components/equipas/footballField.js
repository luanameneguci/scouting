export default function FootballField({players}) {
    const items = [1, 2, 3, 4, 5];

    const FootballFieldPlayers = () => {
        return (
            <div className='player'>
                <p className='position'>EE</p>
                <div className='rating'>5 ★</div>
                <p className='name font-bold'>António<br />Mendes</p>
                <p className='year text-secondary'>2000</p>
            </div>
        );
    };
    return (<div className='field-wrapper'>
        <div className='football-field rounded bg-color-gray-800'>
            <div>
                {items.map(() => {
                    return FootballFieldPlayers();
                })}
            </div>
            <div>
                {items.map(() => {
                    return FootballFieldPlayers();
                })}
            </div>                   <div>
                {items.map(() => {
                    return FootballFieldPlayers();
                })}
            </div>                   <div>
                {items.slice(0, 2).map(() => {
                    return FootballFieldPlayers();
                })}
            </div>
            <div className='field-lines height-100 width-100'>
                <div className="center-circle"></div>
                <div className='center-line'></div>
                <div className='goal-area-top'></div>
                <div className='mini-goal-area-top'></div>
                <div className='mini-goal-area-top'></div>
                <div className='goal-area-bottom'></div>
                <div className='mini-goal-area-bottom'></div>


            </div>
        </div>
    </div>
    );
}