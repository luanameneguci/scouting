export default function RadioFunctions({ selectedFunction, setSelectedFunction }) {

    const handleRadioClick = (value) => { //Radio das opções de posição (ATA, MED, DEF, GR)
        if (selectedFunction === value) {
            setSelectedFunction(null);
            console.log(`Deselected: ${value}`);
        } else {
            setSelectedFunction(value);
            console.log(`Selected: ${value}`);
        }
    };

    return (
        <div className='radio-buttons'>
            <label htmlFor="atacantes" className="font-bold">ATA</label>
            <input
                type="radio"
                className="radio-input"
                id="atacantes"
                checked={selectedFunction === 'atacantes'}
                onClick={() => handleRadioClick('atacantes')}
            />

            <label htmlFor="medios" className="font-bold">MED</label>
            <input
                type="radio"
                className="radio-input"
                id="medios"
                checked={selectedFunction === 'medios'}
                onClick={() => handleRadioClick('medios')}
            />

            <label htmlFor="defesas" className="font-bold">DEF</label>
            <input
                type="radio"
                className="radio-input"
                id="defesas"
                checked={selectedFunction === 'defesas'}
                onClick={() => handleRadioClick('defesas')}
            />

            <label htmlFor="redes" className="font-bold">GR</label>
            <input
                type="radio"
                className="radio-input"
                id="redes"
                checked={selectedFunction === 'redes'}
                onClick={() => handleRadioClick('redes')}
            />
        </div>
    );
}