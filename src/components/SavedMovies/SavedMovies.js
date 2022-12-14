import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import savedMoviesList from '../../utils/savedMoviesList ';

function SavedMovies(props) {
    return (
        <>
            <Header class="header header_color_black">
                <Navigation
                onClick={props.onMenuClick}
                />
            </Header>
            <SearchForm />
            <MoviesCardList
                movies={savedMoviesList}
            />
            <Footer />
        </>
    )
}

export default SavedMovies;