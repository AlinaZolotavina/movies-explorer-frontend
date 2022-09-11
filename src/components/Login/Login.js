import Form from '../Form/Form';

function Login() {
    return (
        <Form
            name="login"
            titletText="Рады Видеть!"
            submitBtnText="Войти"
            linkNoteText="Еще не зарегистрированы?"
            linkText="Регистрация"
            linkPath="/sign-up"
        >
            <label className="form__item">
                E-mail
                <input className="form__input form__input_type_email"></input>
                <span className="form__input-error email-input-error"></span>
            </label>
            <label className="form__item">
                Пароль
                <input className="form__input form__input_type_password"></input>
                <span className="form__input-error password-input-error"></span>
            </label>
       </Form>
    )
}

export default Login;