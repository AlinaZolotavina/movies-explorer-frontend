import image_1 from '../../images/movie-images/movie-image-1.jpg';
import image_2 from '../../images/movie-images/movie-image-2.jpg';
import image_3 from '../../images/movie-images/movie-image-3.jpg';
import image_4 from '../../images/movie-images/movie-image-4.jpg';
import image_5 from '../../images/movie-images/movie-image-5.jpg';
import image_6 from '../../images/movie-images/movie-image-6.jpg';
import image_7 from '../../images/movie-images/movie-image-7.jpg';
import image_8 from '../../images/movie-images/movie-image-8.jpg';
import image_9 from '../../images/movie-images/movie-image-9.jpg';
import image_10 from '../../images/movie-images/movie-image-10.jpg';
import image_11 from '../../images/movie-images/movie-image-11.jpg';
import image_12 from '../../images/movie-images/movie-image-12.jpg';
import image_13 from '../../images/movie-images/movie-image-13.jpg';
import image_14 from '../../images/movie-images/movie-image-14.jpg';
import image_15 from '../../images/movie-images/movie-image-15.jpg';
import image_16 from '../../images/movie-images/movie-image-16.jpg';

import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <ul className="movies-list">
            <MoviesCard
            movieImage={image_1}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_2}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_3}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_4}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_5}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_6}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_7}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_8}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_9}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_10}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_11}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_12}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_13}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_14}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_15}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
            <MoviesCard
            movieImage={image_16}
            movieTitle="33 слова о дизайне"
            movieDuration="1ч42м"
            />
        </ul>
    )
}

export default MoviesCardList;