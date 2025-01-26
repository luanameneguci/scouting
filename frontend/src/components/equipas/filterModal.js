export default function FilterModal({ modalVisible, rating, setRating, close }) {
    const StarRating = ({ rating, setRating }) => {
        const handleStarClick = (index) => {
            if (rating === index + 1) {
                setRating(0); // Unselect if the same star is clicked
            } else {
                setRating(index + 1);
            }
        };

        return (
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < rating ? 'filled' : ''}`}
                        onClick={() => handleStarClick(index)}
                    >
                        {index < rating ? '★' : '☆'}
                    </span>
                ))}
            </div>
        );
    };


    return (<div className={`filters-container height-100 width-100 ${modalVisible ? '' : 'hidden'}`}>
        <form className='filters'>
            <div className='filters-head'>
                <button className='filter-button rounded' type="button">
                    Limpar Filtros
                </button>
                <button className="close" onClick={close}>
                    <span className="material-symbols-outlined icon">
                        close
                    </span>
                </button>
            </div>
            <div className='rating-minimo'>
                <label className='font-bold'>Rating Mínimo:</label>
                <hr />
                <StarRating rating={rating} setRating={setRating} />
            </div>
            <div className='rating-medio-minimo'>
                <label className='font-bold'>Rating Médio Mínimo:</label>
                <hr />
                <div>
                    <input type='number' max='4' min="0" />
                    <span className='text-secondary'>&emsp;/4</span>
                </div>
            </div>
            <div className='ano-nascimento'>
                <label className='font-bold'>Ano de Nascimento:</label>
                <div>
                    <div>
                        <input type='number' max='2024' min="1950" />
                        <span className='text-secondary'>&emsp;min.</span>
                    </div>
                    <hr />
                    <div>
                        <input type='number' max='2024' min="1950" />
                        <span className='text-secondary'>&emsp;máx.</span>
                    </div>
                </div>
            </div>
            <div className='escalao'>
                <label className='font-bold'>Escalão:</label>
                <div>
                    <div>
                        <select>
                            <option value="seniores">Séniores</option>
                            <option value="sub-18">SUB-18</option>
                            <option value="sub-17">SUB-17</option>
                        </select>
                        <span className='text-secondary'>&emsp;min.</span>
                    </div>
                    <hr />
                    <div>
                        <select>
                            <option value="seniores">Séniores</option>
                            <option value="sub-18">SUB-18</option>
                            <option value="sub-17">SUB-17</option>
                        </select>
                        <span className='text-secondary'>&emsp;máx.</span>
                    </div>
                </div>
            </div>
            <div className='posicao'>
                <label className='font-bold'>Posição:</label>
                <p>falta este</p>
            </div>
            <div className='clube'>
                <label className='font-bold'>Clube:</label>
                <select>
                    <option value="fcporto">FC Porto</option>
                    <option value="slbenfica">SL Benfica</option>
                    <option value="sportingcp">Sporting CP</option>
                </select>
            </div>
            <div className='nacionalidade'>
                <label className='font-bold'>Nacionalidade:</label>
                <select>
                    <option value="portugues">Portugal</option>
                    <option value="ingles">Inglaterra</option>
                    <option value="frances">França</option>
                </select>
            </div>
            <button className='submit-button rounded-pill font-bold' onClick={close}> Filtrar </button>
        </form>
    </div>
    );
}