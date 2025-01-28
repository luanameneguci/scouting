export default function RadioFunctions({ filtros, setFunction }) {

    const handleRadioClick = (value) => { //Radio das opções de posição (ATA, MED, DEF, GR)
        if (filtros.funcao === value) {
            setFunction({ ...filtros, funcao: 0 });
        } else {
            setFunction({ ...filtros, funcao: value });
        }
    };

    return (
        <div className='radio-buttons'>
            <label htmlFor="atacantes" className="font-bold">ATA</label>
            <input
                type="radio"
                className="radio-input"
                id="atacantes"
                checked={filtros.funcao === 1}
                onClick={() => handleRadioClick(1)}
            />

            <label htmlFor="medios" className="font-bold">MED</label>
            <input
                type="radio"
                className="radio-input"
                id="medios"
                checked={filtros.funcao === 2}
                onClick={() => handleRadioClick(2)}
            />

            <label htmlFor="defesas" className="font-bold">DEF</label>
            <input
                type="radio"
                className="radio-input"
                id="defesas"
                checked={filtros.funcao === 3}
                onClick={() => handleRadioClick(3)}
            />

            <label htmlFor="redes" className="font-bold">GR</label>
            <input
                type="radio"
                className="radio-input"
                id="redes"
                checked={filtros.funcao === 4}
                onClick={() => handleRadioClick(4)}
            />
        </div>
    );
}