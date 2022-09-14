import { useEffect, useState } from 'react';
import Form from '../Form/Form';

function Login() {
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
        if(email && password && !emailError && !passwordError) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, password, emailError, passwordError]);
    

    return (
        <Form
            name="login"
            titletText="Рады видеть!"
            submitBtnText="Войти"
            linkNoteText="Еще не зарегистрированы?"
            linkText="Регистрация"
            linkPath="/signup"
            isFormValid={isFormValid}
        >
            <label className="form__item">
                E-mail
                <input
                    className="form__input form__input_type_email"
                    placeholder="Введите e-mail"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <span className="form__input-error email-input-error">{emailError}</span>
            </label>
            <label className="form__item">
                Пароль
                <input
                    className="form__input form__input_type_password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <span className="form__input-error password-input-error">{passwordError}</span>
            </label>
       </Form>
    )
}

export default Login;