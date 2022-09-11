import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Profile(props) {
    return (
        <>
            <Header
                class="header header_color_black"
            >
                <Navigation />
            </Header>
            <div className="profile">
                <h2 className="profile__title">Привет, Алина!</h2>
                <form className="profile__form">
                    <label className="profile__form-item">
                        Имя
                        <input className="profile__input" placeholder="Алина"></input>
                    </label>
                    <span className="profile__input-error"></span>
                    <label className="profile__form-item">
                        E-mail
                        <input className="profile__input" placeholder="email@email.com"></input>
                    </label>
                    <span className="profile__input-error"></span>
                </form>
                <button className="profile__edit-btn">Редактировать</button>
                <Link to="sign-in" className="profile__link">Выйти из аккаунта</Link>
            </div>
        </>
    )
}

export default Profile;