import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const history = useHistory();
    return (
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <button onClick={() => history.goBack()} className="not-found__link">
                Назад
            </button>
        </section>
    )
}

export default NotFound;