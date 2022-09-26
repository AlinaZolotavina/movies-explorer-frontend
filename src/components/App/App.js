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
import {
    INTERNAL_SERVER_ERROR_MSG,
    DEFAULT_ERROR_MSG,
    NOT_FOUND_ERROR_MSG,
    USER_NOT_FOUND_ERROR_MSG,
    MOVIE_NOT_FOUND_ERROR_MSG,
    AUTHORIZATION_FAILED_ERROR_MSG,
    UNAUTHORIZED_ERROR_MSG,
    BAD_REQUEST_ERROR_MSG,
    CONFLICT_SIGNUP_EMAIL_ERROR_MSG,
    CONFLICT_UPDATE_EMAIL_ERROR_MSG,
    FORBIDDEN_ERROR_MSG,
    SAVE_MOVIE_ERROR_MSG,
    DELETE_MOVIE_ERROR_MSG,
    SUCCESSFUL_SIGNUP_MSG,
    SUCCESSFUL_PROFILE_UPDATE_MSG,
} from '../../utils/constants';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingReq, setIsSendingReq] = useState(false);

    const [isModalOpen, setIsModalpOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    let movies = localStorage.getItem('movies');
    const query = localStorage.getItem('query');
    const [inputValue, setInputValue] = useState('');
    let foundMovies = JSON.parse(query)?.foundMovies || [];
    let foundShortMovies = JSON.parse(query)?.foundShortMovies || [];
    const [moviesToRender, setMoviesToRender] = useState([]);
    const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [isShortMoviesOn, setIsShortMoviesOn] = useState(false);
    const [currentCardsNumber, setCurrentCardsNumber] = useState(0);
    const [cardsToAdd, setCardsToAdd] = useState(0);    

    // if logged in, get user and set current user
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

    // check token
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
                };
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // get saved movies
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
                    console.log(err);
                });
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id, loggedIn, location]);

    // render movies cards and add more depending on the screen width 
    const updateDemensions = () => {
        let resizeTimeout;
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                setScreenWidth(window.innerWidth);
            }, 150);
        };
    };

    useEffect(() => {
        window.addEventListener('resize', updateDemensions);
        return () => window.removeEventListener('resize', updateDemensions);
    }, []);

    const calculateMoviesCount = () => {
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
    }

    useEffect(() => {
        calculateMoviesCount();
    }, [currentCardsNumber, screenWidth]);

    function showMoreMovies() {
        setCurrentCardsNumber((prev) => prev + cardsToAdd);
    };

    function handleRegister(name, email, password) {
        setIsSendingReq(true);
        auth.register(name, email, password)
            .then((res) => {
                if(res) {
                    handleLogin(email, password);
                    setIsModalpOpen(true);
                    setIsSuccess(true);
                    setModalMessage(SUCCESSFUL_SIGNUP_MSG);
                };
            })
            .catch((err) => {
                if(err.status === 400) {
                    handleError(BAD_REQUEST_ERROR_MSG);
                } else if (err.status === 409) {
                    handleError(CONFLICT_SIGNUP_EMAIL_ERROR_MSG);
                } else {
                    handleError(DEFAULT_ERROR_MSG);
                };
            })
            .finally(() => setIsSendingReq(false));
    };

    function handleLogin(email, password) {
        setIsSendingReq(true);
        auth.authorize(email, password)
            .then((data) => {
                setLoggedIn(true);
                setCurrentUser(data.user);
                history.push('/movies');
            })
            .catch((err) => {
                if(err.status === 404) {
                    handleError(USER_NOT_FOUND_ERROR_MSG);
                } else if(err.status === 401) {
                    handleError(AUTHORIZATION_FAILED_ERROR_MSG);
                } else {
                    handleError(DEFAULT_ERROR_MSG);
                };
            })
            .finally(() => setIsSendingReq(false));
    };

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
                if(err.status === 404) {
                    handleError(USER_NOT_FOUND_ERROR_MSG);
                } else if(err.status === 401) {
                    handleError(UNAUTHORIZED_ERROR_MSG);
                } else {
                    handleError(DEFAULT_ERROR_MSG);
                };
            });
    };

    function handleUpdateUser(info) {
        setIsSendingReq(true);
        mainApi
            .changeUserData(info) 
            .then((newInfo) => {
                setCurrentUser(newInfo.user);
                setIsSuccess(true);
                setIsModalpOpen(true);
                setModalMessage(SUCCESSFUL_PROFILE_UPDATE_MSG);
            })
            .catch((err) => {
                if(err.status === 409) {
                    handleError(CONFLICT_UPDATE_EMAIL_ERROR_MSG);                  
                } else if(err.status === 404) {
                    handleError(USER_NOT_FOUND_ERROR_MSG); 
                } else if(err.status === 400) {
                    handleError(BAD_REQUEST_ERROR_MSG);
                } else {
                    handleError(DEFAULT_ERROR_MSG);  
                };
            })
            .finally(() => setIsSendingReq(false));
    };

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
    };

    function closeMenu() {
        setIsMenuOpen(false);
    };

    // movies search
    useEffect(() => {
        if(query) {
            setIsShortMoviesOn(JSON.parse(query)?.isShortMovies);
            setInputValue(JSON.parse(query)?.input);
        }
    }, []);

    useEffect(() => {
        if(!errorText) {
            isShortMoviesOn ? setMoviesToRender(foundShortMovies) : setMoviesToRender(foundMovies);
        }
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
    }, []);

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
                .catch(err => {
                    console.log(err);
                    setErrorText(INTERNAL_SERVER_ERROR_MSG);
                    setIsLoading(false);
                });
        };

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
            setMoviesToRender(foundShortMovies);
            if(foundShortMovies.length === 0) {
                setErrorText(NOT_FOUND_ERROR_MSG);
                setIsLoading(false);
            } else {
                setErrorText('');
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        } else {
            setMoviesToRender(foundMovies);
            if(foundMovies.length === 0) {
                setErrorText(NOT_FOUND_ERROR_MSG)
                setIsLoading(false);
            } else {
                setErrorText('');
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        };
    };

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
                setErrorText(NOT_FOUND_ERROR_MSG);
                setIsLoading(false);
            } else {
                setErrorText('');
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        } else {
            setSavedMoviesToRender(foundMovies);
            if(foundMovies.length === cardsToAdd) {
                setErrorText(NOT_FOUND_ERROR_MSG);
                setIsLoading(false);
            } else {
                setErrorText('');
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        };
    };

    function handleShortMoviesOn() {
        setIsShortMoviesOn(!isShortMoviesOn);
    };

    function handleSaveMovie(data) {
        mainApi
        .saveMovie(data)
        .then((newSavedMovie) => {
            setSavedMovies([...savedMovies, newSavedMovie]);
        })
        .catch(err => {
            handleError(SAVE_MOVIE_ERROR_MSG);  
        });
    };

    function handleRemoveMovie(movieId) {
        const findId = (id, arr) => {
            const searchMovie = arr.find(item => item.movieId === id);
            return searchMovie._id;
        };

        const  idToDelete = findId(movieId, savedMovies);
        
        mainApi
            .removeMovie(idToDelete)
            .then(() => {
                setSavedMovies(previousState => previousState.filter((savedMovie) => savedMovie._id !== idToDelete));
                setSavedMoviesToRender(previousState => previousState.filter((savedMovie) => savedMovie._id !== idToDelete));
            })
            .catch(err => {
                if(err.status === 404) {
                    handleError(MOVIE_NOT_FOUND_ERROR_MSG)
                } else if(err.status === 403) {
                    handleError(FORBIDDEN_ERROR_MSG)
                } else {
                    handleError(DELETE_MOVIE_ERROR_MSG); 
                };
            });
    };

    function handleError(errorText) {
        setIsSuccess(false);
        setIsModalpOpen(true);
        setModalMessage(errorText); 
    };

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