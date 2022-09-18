import { Link } from "react-router-dom";
import './Menu.css';

function Menu(props) {
    return (
        <div className={`menu ${props.isOpen ? "menu_opened" : ""}`} onClick={props.onClose}>
            <button className="menu__close-btn" onClick={props.onClose} type="button"/>
            <div className="menu__container" >
                <div className="header__nav menu__nav">
                    <Link to="/" className="menu__link">Главная</Link>
                    <Link to="/movies" className="header__movies-link menu__link">Фильмы</Link>
                    <Link to="/saved-movies" className="header__saved-movies-link menu__link">Сохранённые фильмы</Link>
                </div>
                <Link to="/profile" className="header__profile-link menu__link">
                    Аккаунт
                    <div className="header__link-icon"/>
                </Link>
            </div>
        </div>
    )
}

export default Menu;