import './Techs.css';

function Techs() {
    return (
        <section className="techs">
            <p className="techs__note">Технологии</p>
            <h2 className="techs__title">7 технологий</h2>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="list">
                <li className="list__element">HTML</li>
                <li className="list__element">CSS</li>
                <li className="list__element">JS</li>
                <li className="list__element">React</li>
                <li className="list__element">Git</li>
                <li className="list__element">Express.js</li>
                <li className="list__element">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;