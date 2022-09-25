import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import Modal from '../Modal/Modal';
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from "../../utils/MoviesApi";
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [moviesToRender, setMoviesToRender] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [isShortMoviesOn, setIsShortMoviesOn] = useState(false);
    const [currentCardsNumber, setCurrentCardsNumber] = useState(0);
    const [cardsToAdd, setCardsToAdd] = useState(0);

    const [isModalOpen, setIsModalpOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    let movies = localStorage.getItem('movies');
    const query = localStorage.getItem('query');
    let foundMovies = JSON.parse(query)?.foundMovies || [];
    let foundShortMovies = JSON.parse(query)?.foundShortMovies || [];
    const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
    const [isSendingReq, setIsSendingReq] = useState(false);

    // if logged in, get user and saved movies data from main api and movies data from movies api
    useEffect(() => {
        if(loggedIn) {
            mainApi.getCurrentUser()
            .then(data => {
                const userData = data;
                setCurrentUser(userData);
            })
            .catch(err => console.log(err));
        }
    }, [loggedIn]);

    // function getInitialData() {
    //     return Promise.all([mainApi.getCurrentUser(), moviesApi.getMovies()]);
    // }

    useEffect(() => {
        if(!loggedIn) {
            checkToken();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    function checkToken() {
        mainApi.getCurrentUser()
            .then((res) => {
                const userData = res;
                setLoggedIn(true);
                if(location.pathname === '/signup' || location.pathname === '/signin') {
                    history.push('/movies');
                } else {
                    history.push(location.pathname);
                }
                // history.push('/movies');
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(loggedIn) {
            mainApi
                .getSavedMovies()
                .then((movies) => {
                    const foundSavedMovies = movies.filter((movie) => {
                        return movie.owner === currentUser._id;
                    })
                    setSavedMovies(foundSavedMovies);
                    setSavedMoviesToRender(foundSavedMovies);
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id, loggedIn, location]);

    // function goToPreviousPage () {
    //     history.goBack();
    // }

    // render movies cards and add more depending on the screen width 
    const updateDemensions = () => {
        let resizeTimeout;
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                setScreenWidth(window.innerWidth);
            }, 150)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', updateDemensions);
        return () => window.removeEventListener('resize', updateDemensions);
    }, [])

    useEffect(() => {
        let initialCardsNumber;
        if(screenWidth >= 1240) {
            initialCardsNumber = 12;
            setCardsToAdd(4);
        } 
        if(screenWidth < 1141) {
            initialCardsNumber = 8;
            setCardsToAdd(2);
        }
        if(screenWidth < 601) {
            initialCardsNumber = 5;
            setCardsToAdd(2);
        }
        if (currentCardsNumber < initialCardsNumber) {
            setCurrentCardsNumber(initialCardsNumber);
        }
    }, [currentCardsNumber, screenWidth]);

    function showMoreMovies() {
        setCurrentCardsNumber((prev) => prev + cardsToAdd);
    }

    // signup, signin, signout, update user
    function handleRegister(name, email, password) {
        setIsSendingReq(true);
        auth.register(name, email, password)
            .then((res) => {
                if(res) {
                    setLoggedIn(true);
                    history.push('/movies');
                    setCurrentUser(res.user);
                    setIsModalpOpen(true);
                    setIsSuccess(true);
                    setModalMessage('Вы успешно зарегистрировались');
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsSendingReq(false));
    }

    function handleLogin(email, password) {
        setIsSendingReq(true);
        auth.authorize(email, password)
            .then((data) => {
                setLoggedIn(true);
                setCurrentUser(data.user)
                history.push('/movies');
            })
            .catch((err) => {
                console.log(err);
                setIsModalpOpen(true);
                setIsSuccess(false);
                setModalMessage('Ошибка авторизации');
            })
            .finally(() => setIsSendingReq(false));
    }

    function handleLogout(email) {
        auth.logout(email)
            .then(() => {
                setLoggedIn(false);
                history.push('/');
                setCurrentUser({});
                localStorage.removeItem('movies');
                localStorage.removeItem('query');
                setIsShortMoviesOn(false);
                setMoviesToRender([]);
                setSavedMovies([]);
                setInputValue('');
            })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
                setIsModalpOpen(true);
                setModalMessage('Что-то пошло не так...');
            })
    }

    function handleUpdateUser(info) {
        setIsSendingReq(true);
        mainApi
            .changeUserData(info) 
            .then((newInfo) => {
                setCurrentUser(newInfo.user);
                setIsSuccess(true);
                setIsModalpOpen(true);
                setModalMessage('Данные обновлены')
            })
            .catch((err) => {
                console.log(err);
                if(err === 'Ошибка: 409') {
                    setIsModalpOpen(true);
                    setModalMessage('Пользователь с таким E-mail уже существует');                  
                } else {
                    setIsModalpOpen(true);
                    setModalMessage('Что-то пошло не так...');  
                }
            })
            .finally(() => setIsSendingReq(false));
    }

    // modal
    function closeModal() {
        setIsModalpOpen(false);
    };

    useEffect(e => {
        const handleEscClose = (e) => {
          if (e.keyCode === 27) {
            closeModal();
          }
        }
        window.addEventListener('keydown', handleEscClose);
        return () => window.removeEventListener('keydown', handleEscClose);
      }, []);

    // menu 
    function handleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    // movies search
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(query) {
            setIsShortMoviesOn(JSON.parse(query)?.isShortMovies);
            setInputValue(JSON.parse(query)?.input);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!errorText) {
            isShortMoviesOn ? setMoviesToRender(foundShortMovies) : setMoviesToRender(foundMovies);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShortMoviesOn, errorText]);

    useEffect(() => {
        if(query) {
            const queryData = JSON.parse(query);
            queryData.isShortMovies = isShortMoviesOn;
            localStorage.setItem('query', JSON.stringify(queryData));
        }
    }, [isShortMoviesOn, query]);

    useEffect(() => {
        function removeMovies() {
            localStorage.removeItem('movies');
        }
        window.addEventListener('beforeunload', removeMovies);
        return () => window.removeEventListener('beforeunload', removeMovies);
    }, [])

    async function handleMoviesSearch(input, isShortMovies) {
        const keyWord = new RegExp(input, "gi");

        if(!movies) {
            setIsLoading(true);
            await moviesApi.getMovies()
                .then(data => {
                    const moviesData = data;
                    localStorage.setItem('movies', JSON.stringify(moviesData));
                })
                .then(() => {
                    movies = localStorage.getItem('movies');
                })
        }

        const foundMovies = JSON.parse(movies).filter((movie) => {
            return (keyWord.test(movie.nameRU) || keyWord.test(movie.nameEN));
        });

        const foundShortMovies = foundMovies.filter((movie) => {
            return movie.duration <= 40;
        });

        const query = {
            foundMovies,
            foundShortMovies,
            input,
            isShortMovies,
        };
        localStorage.setItem('query', JSON.stringify(query));

        if(isShortMovies) {
            console.log(foundShortMovies);
            setMoviesToRender(foundShortMovies);
            if(foundShortMovies.length === 0) {
                setErrorText('Ничего не найдено')
                setIsLoading(false);
                // setCurrentCardsNumber(0);
                // setCardsToAdd(0);
            }
        } else {
            console.log(foundMovies);
            setMoviesToRender(foundMovies);
            if(foundMovies.length === 0) {
                setErrorText('Ничего не найдено')
                setIsLoading(false);
            } else {
                setErrorText('');
                setIsLoading(false);
                setCurrentCardsNumber(currentCardsNumber);
                setCardsToAdd(cardsToAdd);
            }
        }
    }

    function handleSavedMoviesSearch(input, isShortMovies) {
        setIsLoading(true);
        const keyWord = new RegExp(input, "gi");

        const foundMovies = savedMovies.filter((movie) => {
            return (keyWord.test(movie.nameRU) || keyWord.test(movie.nameEN));
        });

        const foundShortMovies = foundMovies.filter((movie) => {
            return movie.duration <= 40;
        });

        if(isShortMovies) {
            setSavedMoviesToRender(foundShortMovies);
            if(foundShortMovies.length === 0) {
                setErrorText('Ничего не найдено');
                setIsLoading(false);
                setCurrentCardsNumber(0);
                setCardsToAdd(0);
            }
        } else {
            setSavedMoviesToRender(foundMovies);
            if(foundMovies.length === 0) {
                setErrorText('Ничего не найдено');
                setIsLoading(false);
            } else {
                setErrorText('');
                setIsLoading(false);
                setCurrentCardsNumber(0);
                setCardsToAdd(0);
            }
        }
    }

    function handleShortMoviesOn() {
        setIsShortMoviesOn(!isShortMoviesOn);
    }

    // save and delete movie
    // доделать обработку ошибок
    function handleSaveMovie(data) {
        mainApi
        .saveMovie(data)
        .then((newSavedMovie) => {
            setSavedMovies([...savedMovies, newSavedMovie]);
        })
        .catch((err) => console.log(err));
    }

    // доделать обработку ошибок
    function handleRemoveMovie(movieId) {
        const findId = (id, arr) => {
            const searchMovie = arr.find(item => item.movieId === id);
            return searchMovie._id;
        }

        const  idToDelete = findId(movieId, savedMovies);
        
        mainApi
            .removeMovie(idToDelete)
            .then(() => {
                setSavedMovies(previousState => previousState.filter((savedMovie) => savedMovie._id !== idToDelete));
                setSavedMoviesToRender(previousState => previousState.filter((savedMovie) => savedMovie._id !== idToDelete));
            })
            .catch(err => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={loggedIn}/>
                </Route>
                <ProtectedRoute
                    path="/movies"
                    component={Movies}
                    loggedIn={loggedIn}
                    onMenuClick={handleMenu}
                    movies={moviesToRender}
                    savedMovies={savedMovies}
                    onGetMovies={handleMoviesSearch}
                    errorText={errorText}
                    onShortMovies={handleShortMoviesOn}
                    checked={isShortMoviesOn}
                    cardsQuantity={currentCardsNumber}
                    onSaveMovie={handleSaveMovie}
                    onRemoveMovie={handleRemoveMovie}
                    onShowMore={showMoreMovies}
                    isLoading={isLoading}
                    lastInput={inputValue}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    onMenuClick={handleMenu}
                    movies={savedMoviesToRender}
                    savedMovies={savedMovies}
                    onGetMovies={handleSavedMoviesSearch}
                    errorText={errorText}
                    onShortMovies={handleShortMoviesOn}
                    checked={isShortMoviesOn}
                    onRemoveMovie={handleRemoveMovie}
                    isLoading={isLoading}
                />
                <Route path="/signup">
                    <Register
                        onRegister={handleRegister}
                        isSendingReq={isSendingReq}
                    />
                </Route>
                <Route path="/signin">
                    <Login
                        onLogin={handleLogin}
                        isSendingReq={isSendingReq}
                    />
                </Route>
                <Route path="/profile">
                    <Profile
                        onMenuClick={handleMenu}
                        onUpdateUser={handleUpdateUser}
                        onLogout={handleLogout}
                        isSendingReq={isSendingReq}
                    />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            <Menu isOpen={isMenuOpen} onClose={closeMenu} />
            <Modal 
                isOpen={isModalOpen}
                isSuccess={isSuccess}
                onClose={closeModal}
                message={modalMessage}
            />
        </CurrentUserContext.Provider>
    )
}

export default App;