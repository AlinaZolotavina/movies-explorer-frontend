import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <>
            <Link to="/">
                <div className="logo"/>
            </Link>
            <div className="header__nav">
                <Link to="/movies" className="header__movies-link">Фильмы</Link>
                <Link to="/saved-movies" className="header__saved-movies-link">Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="header__profile-link">
                Аккаунт
                <div className="header__link-icon"/>
            </Link>
            <div className="header__menu" onClick={props.onClick}></div>
        </>
    )
}

export default Nav;