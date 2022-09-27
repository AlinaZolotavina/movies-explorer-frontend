import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm(props) {
    const location = useLocation();
    const query = JSON.parse(localStorage.getItem('query'));

    useEffect(() => {
        if(query.input && location.pathname === '/movies') {
            setInputValue(query.input);
 
        }
    }, [query.input, location.pathname]);



    // useEffect(() => {
    //     if(query.isShortMovies && location.pathname === '/movies') {
    //         props.setChecked(query.isShortMovies);
    //     }
    // })

    const [inputValue, setInputValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    function handleInputChange(e) {
        setInputValue(e.target.value);
        if(e.target.value.length === 0) {
            props.setSearchError('Нужно ввести ключевое слово');
        } else {
            props.setSearchError('');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onGetMovies(inputValue, props.checked);
        props.setSearchError('');
    }

    useEffect(() => {
        if(!inputValue || !query.input) {
            setIsFormValid(false);
            props.setSearchError('Нужно ввести ключевое слово');
        } else {
            setIsFormValid(true);
            props.setSearchError('');
        }
    }, [inputValue, query.input]);

    return (
        <section className="search">
            <div className="search__error">{props.searchError}</div>
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