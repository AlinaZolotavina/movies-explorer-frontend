import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import {
    BASE_MOVIES_URL,
    UNKNOWN_DATA,
    UNKNOWN_TRAILER_URL,
} from '../../utils/constants';
import UNKNOWN_IMAGE from '../../images/image-error.jpg';

function MoviesCard(props) {
    const [isSaved, setIsSaved] = useState(false);
    // eslint-disable-next-line no-useless-escape
    const regex = /^(https?:\/\/)(w{3})?([\da-z\.\-]+)\.([a-z\.]{2,6})([\w\.\-\_~:\/?#\[\]@!$&\'()*\+,;=])*#?\/?$/;
    const isUrlValid = regex.test(props.movie.trailerLink);

    useEffect(() => {
        const isSavedMovie = (movie) => movie.movieId === props.movie.id || movie.movieId === props.movie.movieId;
        if(props.savedMovies.some(isSavedMovie)) {
            setIsSaved(true);
        }          
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let buttonClassName = (
        `${props.isSavedMoviesPage? 'remove-btn' : isSaved ? 'select-btn_active' : ''}`
    );

    function handleSaveMovie() {
        const movieData = ({
            movieId: props.movie.id,
            nameRU: props.movie.nameRU || UNKNOWN_DATA,
            nameEN: props.movie.nameEN || UNKNOWN_DATA,
            director: props.movie.director || UNKNOWN_DATA,
            country: props.movie.country || UNKNOWN_DATA,
            year: props.movie.year || UNKNOWN_DATA,
            duration: props.movie.duration || UNKNOWN_DATA,
            description: props.movie.description || UNKNOWN_DATA,
            trailerLink: isUrlValid ? props.movie.trailerLink : UNKNOWN_TRAILER_URL,
            image: BASE_MOVIES_URL + props.movie.image.url || UNKNOWN_IMAGE, 
            thumbnail: BASE_MOVIES_URL + props.movie.image.formats.thumbnail.url || props.movie.thumbnail || UNKNOWN_IMAGE,
        });
        props.onSaveMovie(movieData, setIsSaved);
    }

    function handleRemoveMovie() {
        props.onRemoveMovie(props.movie.movieId || props.movie.id, setIsSaved);
    }

    const duration = `${Math.floor((props.duration || props.movie.duration) / 60)}ч ${(props.duration || props.movie.duration) % 60}м`;

    return (
        <li className="movie">
            <a
                className="movie__trailer-link"
                href={isUrlValid ? props.movie.trailerLink : UNKNOWN_TRAILER_URL}
                target="_blank"
                rel="noreferrer">
                    <img
                        className="movie__image"
                        src={props.isSavedMoviesPage ? props.movie.image : BASE_MOVIES_URL + props.movie.image.url}
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