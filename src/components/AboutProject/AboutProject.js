import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about">
            <h2 className="about__title">О проекте</h2>
            <ul className="info">
                <li className="info__element">
                    <h3 className="info__element-title">Дипломный проект включал 5 этапов</h3>
                    <p className="info__element-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="info__element">
                    <h3 className="info__element-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="info__element-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="scale">
                <li className="scale__element scale__element_color_green">1 неделя</li>
                <li className="scale__element">4 недели</li>
                <li className="scale__info">Back-end</li>
                <li className="scale__info">Front-end</li>
            </ul>
        </section>
    )
}

export default AboutProject;