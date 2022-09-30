import './More.css';

function More(props) {
    return (
        <section className="more">
            <button className="more__btn" onClick={props.onShowMore}>Еще</button>
        </section>
    )
}

export default More;