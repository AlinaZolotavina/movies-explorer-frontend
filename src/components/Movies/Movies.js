import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from "../Footer/Footer";

function Movies(props) {
    return (
        <>
            <Header class=" header header_color_black">
                <Navigation
                    onClick={props.onMenuClick}
                />
            </Header>
            <SearchForm
                onGetMovies={props.onGetMovies}
                onChange={props.onShortMovies}
                checked={props.checked}
                searchError={props.searchError}
                setSearchError={props.setSearchError}
            />
            {props.isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    movies={props.movies}
                    savedMovies={props.savedMovies}
                    onGetMovies={props.onGetMovies}
                    errorText={props.errorText}
                    cardsQuantity={props.cardsQuantity}
                    onSaveMovie={props.onSaveMovie}
                    onRemoveMovie={props.onRemoveMovie}
                    isSavedMoviesPage={false}
                />
            )}
            {props.movies.length > props.cardsQuantity && !props.isLoading ? (
                <More onShowMore={props.onShowMore} />
            ) : ('')}
            <Footer />
        </>
    )
}

export default Movies;