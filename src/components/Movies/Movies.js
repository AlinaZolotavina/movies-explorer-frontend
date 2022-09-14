import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from "../Footer/Footer";
import moviesList from '../../utils/moviesList';

function Movies(props) {
    return (
        <>
            <Header class=" header header_color_black">
                <Navigation
                onClick={props.onMenuClick}
                />
            </Header>
            <SearchForm />
            <MoviesCardList
                movies={moviesList}
            />
            <More />
            <Footer />
        </>
    )
}

export default Movies;