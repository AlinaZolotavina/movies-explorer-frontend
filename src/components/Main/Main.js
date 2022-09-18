import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main(props) {
    return (
        <>
            {props.loggedIn ? (
                <Header class="header">
                    <Navigation />
                </Header>
            ) : (
                <Header class="header">
                    <Link to="/">
                        <div className="logo"/>
                    </Link>
                    <div className="header__nav">
                        <Link to="/signup" className="header__sign-up-link">Регистрация</Link>
                        <Link to="/signin">
                            <button className="header__button">Войти</button>
                        </Link>
                    </div>
                </Header> 
            )}
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </>
    )
}

export default Main;