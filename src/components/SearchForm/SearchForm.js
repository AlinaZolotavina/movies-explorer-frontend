import './SearchForm.css';

function SearchForm() {
    return (
        <div className="search">
            <form className="search__form">
                <label className="search__field">
                    <input className="search__input" />
                </label>
                <button className="search__submit-btn">
                    <div className="search__icon"></div>
                </button>
            </form>
            <div className="search__checkbox-container">
                <label className="search__checkbox">
                    <input className="search__checkbox-input" type="checkbox" />
                    <span className="search__checkbox-switch"></span>
                </label>
                <p className="search__checkbox-note">Короткометражки</p>
            </div>
        </div>
    )
}

export default SearchForm;