import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <ul className="movies-list">
            {props.movies.map(movie => (
                <MoviesCard 
                movie={movie}
                key={movie.key}
                />
            ))}
        </ul>
    )
}

export default MoviesCardList;