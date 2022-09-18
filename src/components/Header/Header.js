import './Header.css';

function Header(props) {
    return (
        <header className={props.class}>{props.children}</header>
    )
}

export default Header;