import { useEffect, useState } from 'react';
import Form from '../Form/Form';

function Register(props) {
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

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    function handlePasswordChange(e) {
        if(e.target.value.length < 6) {
            setPasswordError('Пароль должен содержать не менее 6 символов');
        } else {
            setPasswordError('');
        }
        setPassword(e.target.value);
    }

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if(name && email && password && !nameError && !emailError && !passwordError) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [name, email, password, nameError, emailError, passwordError]);

    function handleRegister(e) {
        e.preventDefault();
        props.onRegister(name, email, password);
    }
    
    return (
        <Form
            name="register"
            titletText="Добро пожаловать!"
            submitBtnText="Зарегистрироваться"
            linkNoteText="Уже зарегистрированы?"
            linkText="Войти"
            linkPath="/signin"
            isFormValid={isFormValid}
            onSubmit={handleRegister}
        >
            <label className="form__item">
                Имя
                <input
                    className={`form__input form__input_type_name ${nameError ? 'form__input_error' : ''}`}
                    placeholder="Введите имя"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <span className="form__error name-input-error">{nameError}</span>
            </label>
            <label className="form__item">
                E-mail
                <input
                    className={`form__input form__input_type_email ${emailError ? 'form__input_error' : ''}`}
                    placeholder="Введите e-mail"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <span className="form__error email-input-error">{emailError}</span>
            </label>
            <label className="form__item">
                Пароль
                <input
                    className={`form__input form__input_type_password ${passwordError ? 'form__input_error' : ''}`}
                    placeholder="Введите пароль"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <span className="form__error password-input-error">{passwordError}</span>
            </label>
        </Form>
    )
}

export default Register;