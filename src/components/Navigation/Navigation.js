import { Link, NavLink } from 'react-router-dom';

function Nav(props) {
    return (
        <>
            <NavLink to="/">
                <div className="logo"/>
            </NavLink>
            <div className="header__nav">
                <NavLink to="/movies" className="header__movies-link" activeClassName="header__movies-link_active">Фильмы</NavLink>
                <NavLink to="/saved-movies" className="header__saved-movies-link" activeClassName="header__saved-movies-link_acitve">Сохранённые фильмы</NavLink>
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