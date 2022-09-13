import './MoviesCard.css';

function MoviesCard(props) {
    return (
        <li className="movie">
            <img className="movie__image" src={props.movieImage} alt="Изображение к фильму" />
            <div className="movie__info">
                <h2 className="movie__title">{props.movieTitle}</h2>
                <label className="select-btn-container">
                    <input className="select-btn" type="checkbox" />
                    <span className="select-btn-checkbox"></span>
                </label>
                <p className="movie__duration">{props.movieDuration}</p>
            </div>
        </li>
    )
}

export default MoviesCard;