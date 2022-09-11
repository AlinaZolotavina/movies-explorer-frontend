import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <p className="portfolio__note">Портфолио</p>
            <div className="portfolio__list">
                <a className="portfolio__link" href="https://alinazolotavina.github.io/how-to-learn/" target="_blank" rel="noreferrer">
                    Статичный сайт
                    <div className="portfolio__link-icon"/>
                </a>
                <a className="portfolio__link" href="https://alinazolotavina.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">
                    Адаптивный сайт
                    <div className="portfolio__link-icon"/>
                </a>
                <a className="portfolio__link" href="https://alinazolotavina.github.io/mesto-react/" target="_blank" rel="noreferrer">
                    Одностраничное приложение
                    <div className="portfolio__link-icon"/>
                </a>
            </div>
        </section>
    )
}

export default Portfolio;