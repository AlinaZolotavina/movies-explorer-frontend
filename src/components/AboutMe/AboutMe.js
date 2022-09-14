import photoPath from '../../images/photo.jpg';
import './AboutMe.css';

function AboutMe() {
    return (
        <section className="about-me">
            <p className="about-me__note">Студент</p>
            <div className="about-me__content">
                <div className="about-me__info">
                    <h2 className="about-me__title">Алина</h2>
                    <h3 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h3>
                    <p className="about-me__text">Я живу в Эрлангене, в декабре 2021 начала проходить курс по веб-разработке в Яндекс.Практикуме. В разработке придерживаюсь методологии БЭМ, могу работать как с React JS, так и с "ванильным" JS. Знакома с основами бэкенда, могу запустить сервер на Node.js. Владею английским языком и немецким языками. После азавершения курса планирую освоить Angular. В качестве хобби слушаю подкасты «Веб-стандарты» и «Hobby Talks», а также фанатею по "Гарри Поттеру".</p>
                    <a className="about-me__link" href="https://github.com/alinazolotavina/" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__photo" src={photoPath} alt="фото Алины"/>
            </div>
        </section>
    )
}

export default AboutMe;