import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Profile(props) {
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
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        const isEmailValid = emailRegex.test(e.target.value);
        if (!isEmailValid) {
            setEmailError('Пожалуйста, введите корректный E-mail');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    }

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if(name && email && !nameError && !emailError) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [name, email, nameError, emailError]);

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
                        <input
                            className="profile__input"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Алина"
                            required
                        />
                    </label>
                    <span className="profile__input-error">{nameError}</span>
                    <label className="profile__form-item">
                        E-mail
                        <input
                            className="profile__input"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="example@email.com"
                            required
                        />
                    </label>
                    <span className="profile__input-error">{emailError}</span>
                </form>
                <button
                    className={`profile__edit-btn ${!isFormValid ? 'profile__edit-btn_inactive' : ''}`}
                >
                    Редактировать
                </button>
                <Link to="sign-in" className="profile__link">Выйти из аккаунта</Link>
            </div>
        </>
    )
}

export default Profile;