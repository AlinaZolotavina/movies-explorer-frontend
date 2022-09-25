import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm(props) {
    useEffect(() => {
        if(props.lastInput) {
            setInputValue(props.lastInput);
        }
    }, [props.lastInput])

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('Нужно ввести ключевое слово');
    const [isFormValid, setIsFormValid] = useState(false);
    // const location = useLocation();

    function handleInputChange(e) {
        setInputValue(e.target.value);
        if(e.target.value.length === 0) {
            setError('Нужно ввести ключевое слово');
        } else {
            setError('');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onGetMovies(inputValue, props.checked);
        setError('');
    }

    useEffect(() => {
        if(inputValue && !error) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [inputValue, error]);

    return (
        <section className="search">
            <div className="search__error">{error}</div>
            <form className="search__form" onSubmit={handleSubmit}>
                <label className="search__field">
                    <input
                        className="search__input"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Фильм"
                        required
                    />
                </label>
                <button
                    className={`search__submit-btn ${isFormValid ? '' : 'search__submit-btn_disable'}`}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    <div className="search__icon"></div>
                </button>
            </form>
            <div className="search__checkbox-container">
                <label className="search__checkbox">
                    <input
                        className="search__checkbox-input"
                        type="checkbox"
                        name="short-movies"
                        id="short-movies"
                        onChange={props.onChange}
                        checked={props.checked}
                    />
                    <span className="search__checkbox-switch"></span>
                </label>
                <p className="search__checkbox-note">Короткометражки</p>
            </div>
        </section>
    )
}

export default SearchForm;