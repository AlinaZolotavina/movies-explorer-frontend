import './Form.css';

import { Link } from 'react-router-dom';

function Form(props) {
    return (
        <section className="auth">
            <Link to="/" className="auth__logo-container">
                <div className="logo"/>
            </Link>
            <h2 className="auth__title">{props.titletText}</h2>
            <form
                className="form"
                name="props.name"
                onSubmit={props.onSubmit}
            >
                {props.children}
                <button
                    className={`form__submit-btn ${!props.isFormValid ? 'form__submit-btn_inactive' : ''}`}
                    type="submit"
                    disabled={!props.isFormValid || props.isSendingReq}
                >
                    {props.isSendingReq ? 'Загрузка...' : props.submitBtnText}
                </button>
            </form>
            <div className="auth__link-container">
                <p className="auth__link-note">{props.linkNoteText}</p>
                <Link to={props.linkPath} className="auth__link">{props.linkText}</Link>
            </div>            
        </section>
    )
}

export default Form;