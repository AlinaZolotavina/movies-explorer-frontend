import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    function handleNameChange(e) {
        if((e.target.value.length < 2) || (e.target.value.length > 30)) {
            setNameError('Имя должно содержать от 2 до 30 символов')
        } else {
            setNameError('');
        }
        setName(e.target.value);
    }

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    function handleEmailChange(e) {
        const emailRegex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
        const isEmailValid = emailRegex.test(e.target.value);
        if (!isEmailValid) {
            setEmailError('Пожалуйста, введите корректный E-mail');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            email,
        });
    }

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if(nameError && emailError) {
            setIsFormValid(false);
        } else {
            setIsFormValid(true);
        }
    }, [nameError, emailError]);

    function handleLogout() {
        props.onLogout(currentUser.email)
    }

    useEffect(() => {
        if(currentUser.name === name && currentUser.email === email) {
            setIsFormValid(false);
        } else {
            setIsFormValid(true);
        }
    }, [currentUser.name, currentUser.email, name, email])

    return (
        <>
            <Header class="header header_color_black">
                <Navigation
                    onClick={props.onMenuClick}
                />
            </Header>
            <section className="profile">
                <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <fieldset className="profile__form-container">
                        <label className="profile__form-item">
                            Имя
                            <input
                                id="profile-name"
                                className="profile__input"
                                type='text'
                                name="name"
                                value={name || ""}
                                onChange={handleNameChange}
                                placeholder="Введите имя"
                                required
                                disabled={props.isSendingReq}
                            />
                        </label>
                        <span className="profile__input-error">{nameError}</span>
                        <label className="profile__form-item">
                            E-mail
                            <input
                                id="profile-email"
                                className="profile__input"
                                type='text'
                                name="email"
                                value={email || ""}
                                onChange={handleEmailChange}
                                placeholder="Введите E-mail"
                                required
                                disabled={props.isSendingReq}
                            />
                        </label>
                        <span className="profile__input-error">{emailError}</span>
                    </fieldset>
                    <button
                        className={`profile__edit-btn ${!isFormValid || props.isSendingReq ? 'profile__edit-btn_inactive' : ''}`}
                        type="submit"
                        disabled={!isFormValid || props.isSendingReq}
                    >
                        {props.isSendingReq ? 'Загрузка' : 'Редактировать'}
                    </button>
                </form>
                <Link
                    to="/signin"
                    onClick={handleLogout}
                    className="profile__link"
                >
                    Выйти из аккаунта
                </Link>
            </section>
        </>
    )
}

export default Profile;