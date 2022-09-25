import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
const BASE_URL = 'https://api.nomoreparties.co';

function MoviesCard(props) {

    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        const isSavedMovie = (movie) => movie.movieId === props.movie.id || movie.movieId === props.movie.movieId;
        if(props.savedMovies.some(isSavedMovie)) {
            setIsSaved(true);
        }          
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let buttonClassName = (
        `${props.isSavedMoviesPage? 'remove-btn' : isSaved ? 'select-btn_active' : ''}`
    )

    function handleSaveMovie() {
        props.onSaveMovie({
            movieId: props.movie.id,
            nameRU: props.movie.nameRU,
            nameEN: props.movie.nameEN,
            director: props.movie.director,
            country: props.movie.country,
            year: props.movie.year,
            duration: props.movie.duration,
            description: props.movie.description,
            trailerLink: props.movie.trailerLink,
            image: BASE_URL + props.movie.image.url,
            thumbnail: BASE_URL + props.movie.image.formats.thumbnail.url || props.movie.thumbnail,
        });
        setIsSaved(true);
    }

    function handleRemoveMovie() {
        props.onRemoveMovie(props.movie.movieId || props.movie.id);
        setIsSaved(false);
    }

    const duration = `${Math.floor((props.duration || props.movie.duration) / 60)}ч ${(props.duration || props.movie.duration) % 60}м`;

    return (
        <li className="movie">
            <a
                className="movie__trailer-link"
                href={props.movie.trailerLink}
                target="_blank"
                rel="noreferrer">
                    <img
                        className="movie__image"
                        src={props.isSavedMoviesPage ? props.movie.image : BASE_URL + props.movie.image.url}
                        alt={props.movie.nameRU}
                    />
            </a>
            
            <div className="movie__info">
                <h2 className="movie__title">{props.movie.nameRU}</h2>
                <button
                    className={`select-btn ${buttonClassName}`}
                    type="checkbox"
                    onClick={props.isSavedMoviesPage ? handleRemoveMovie : isSaved ? handleRemoveMovie : handleSaveMovie}                    
                />
                <p className="movie__duration">{duration}</p>
            </div>
        </li>
    )
}

export default MoviesCard;