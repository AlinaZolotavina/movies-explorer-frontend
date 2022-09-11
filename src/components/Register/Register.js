import Form from '../Form/Form';

function Register() {
    return (
        <Form
            name="register"
            titletText="Добро пожаловать!"
            submitBtnText="Зарегистрироваться"
            linkNoteText="Уже зарегистрированы?"
            linkText="Войти"
            linkPath="/sign-in"
        >
            <label className="form__item">
                Имя
                <input className="form__input form__input_type_name"></input>
                <span className="form__input-error name-input-error"></span>
            </label>
            <label className="form__item">
                E-mail
                <input className="form__input form__input_type_email"></input>
                <span className="form__input-error email-input-error"></span>
            </label>
            <label className="form__item">
                Пароль
                <input className="form__input form__input_type_password"></input>
                <span className="form__input-error password-input-error">Что-то пошло не так...</span>
            </label>
        </Form>
    )
}

export default Register;