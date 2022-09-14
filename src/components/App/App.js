import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import NotFound from "../NotFound/NotFound";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <>
        <Switch>
            <Route exact path="/">
                <Main loggedIn={false}/>
            </Route>
            <Route path="/movies">
                <Movies
                    onMenuClick={handleMenu}
                />
            </Route>
            <Route path="/saved-movies">
                <SavedMovies
                    onMenuClick={handleMenu}
                />
            </Route>
            <Route path="/signup">
                <Register/>
            </Route>
            <Route path="/signin">
                <Login/>
            </Route>
            <Route path="/profile">
                <Profile/>
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
        <Menu isOpen={isMenuOpen} onClose={closeMenu} />
        </>
    )
}

export default App;