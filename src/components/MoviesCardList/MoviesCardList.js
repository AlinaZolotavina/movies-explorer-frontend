import '../Preloader/Preloader.css';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <ul className="movies-list">
            {props.errorText ? (
                <p className="movies__error">{props.errorText}</p>
            ) : (
            props.movies
                .slice(0, props.cardsQuantity)
                .map((movie) => (
                    <MoviesCard 
                        movie={movie}
                        key={movie.id || movie._id}
                        savedMovies={props.savedMovies}
                        onSaveMovie={props.onSaveMovie}
                        onRemoveMovie={props.onRemoveMovie}
                        isSavedMoviesPage={props.isSavedMoviesPage}
                    />
            )))}
        </ul>
    )
}

export default MoviesCardList;