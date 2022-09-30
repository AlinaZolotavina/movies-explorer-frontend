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
import {
    LARGE_SCREEN_WIDTH,
    MIDDLE_SCREEN_WIDTH, 
    SMALL_SCREEN_WIDTH,
} from '../../utils/constants';
import {
    LARGE_SCREEN_MOVIES_NUMBER,
    MIDDLE_SCREEN_MOVIES_NUMBER,
    SMALL_SCREEN_MOVIES_NUMBER,
    LARGE_SCREEN_MOVIES_TO_ADD_NUMBER,
    MIDDLE_SCREEN_MOVIES_TO_ADD_NUMBER,
    SMALL_SCREEN_MOVIES_TO_ADD_NUMBER,
    SHORT_MOVIE_DURATION,
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
    const [moviesCheckbox, setMoviesCheckbox] = useState(false);
    let foundMovies = JSON.parse(query)?.foundMovies || [];
    let foundShortMovies = JSON.parse(query)?.foundShortMovies || [];
    const [moviesToRender, setMoviesToRender] = useState([]);
    const [moviesError, setMoviesError] = useState('');

    const [savedMovies, setSavedMovies] = useState([]);
    const [savedShortMovies, setSavedShortMovies] = useState([]);
    const [savedMoviesCheckbox, setSavedMoviesCheckbox] = useState(false);
    const [savedMoviesInput, setSavedMoviesInput] = useState('');
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);
    const [foundShortSavedMovies, setFoundShortSavedMovies] = useState([]);
    const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
    const [savedMoviesError, setSavedMoviesError] = useState('');    
    const [searched, setSearched] = useState(false);

    const [currentCardsNumber, setCurrentCardsNumber] = useState(0);
    const [cardsToAdd, setCardsToAdd] = useState(0);
    const [searchError, setSearchError] = useState('Нужно ввести ключевое слово');

    // if logged in, get and set current user
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

                    const foundShortSavedMovies = foundSavedMovies.filter((movie) => {
                        return movie.duration <= SHORT_MOVIE_DURATION;
                    })

                    setSavedMovies(foundSavedMovies);
                    setSavedShortMovies(foundShortSavedMovies);
                    setSavedMoviesToRender(foundSavedMovies);
                })
                .catch((err) => {
                    console.log(err);
                });
        }        
    }, [currentUser._id, loggedIn]);

    useEffect(() => {
        const foundShortSavedMovies = savedMovies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE_DURATION;
        })
        setSavedShortMovies(foundShortSavedMovies);
    }, [savedMovies]);

    // render movies cards and add more depending on the screen width 
    useEffect(() => {
        window.addEventListener('resize', updateDemensions);
        return () => window.removeEventListener('resize', updateDemensions);
    }, []);

    useEffect(() => {
        calculateMoviesCount();
    }, [currentCardsNumber, screenWidth]);

    const updateDemensions = () => {
        let resizeTimeout;
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                setScreenWidth(window.innerWidth);
            }, 150);
        };
    };    

    const calculateMoviesCount = () => {
        let initialCardsNumber;
        if(screenWidth >= LARGE_SCREEN_WIDTH) {
            initialCardsNumber = LARGE_SCREEN_MOVIES_NUMBER;
            setCardsToAdd(LARGE_SCREEN_MOVIES_TO_ADD_NUMBER);
        } 
        if(screenWidth < MIDDLE_SCREEN_WIDTH) {
            initialCardsNumber = MIDDLE_SCREEN_MOVIES_NUMBER;
            setCardsToAdd(MIDDLE_SCREEN_MOVIES_TO_ADD_NUMBER);
        }
        if(screenWidth < SMALL_SCREEN_WIDTH) {
            initialCardsNumber = SMALL_SCREEN_MOVIES_NUMBER;
            setCardsToAdd(SMALL_SCREEN_MOVIES_TO_ADD_NUMBER);
        }
        if (currentCardsNumber < initialCardsNumber) {
            setCurrentCardsNumber(initialCardsNumber);
        }
    }    

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
                setMoviesCheckbox(false);
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

    // add movie to saved movies list
    function handleSaveMovie(data, saveHandler) {
        mainApi
        .saveMovie(data)
        .then(newSavedMovie => {
            setSavedMovies([...savedMovies, newSavedMovie]);
            saveHandler(true);
        })
        .catch(err => {
            if(err.status === 400) {
                handleError(SAVE_MOVIE_ERROR_MSG);
            }
            handleError(INTERNAL_SERVER_ERROR_MSG);  
        });
    };

    // remove movie from saved movies list
    function handleRemoveMovie(movieId, saveHandler) {
        const findId = (id, arr) => {
            const searchMovie = arr.find(item => item.movieId === id);
            return searchMovie._id;
        };

        const  idToDelete = findId(movieId, savedMovies);
        
        mainApi
            .removeMovie(idToDelete)
            .then(() => {
                saveHandler(false);
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

    // set input and checkbox values from local storage if a query was made
    useEffect(() => {
        if(query) {
            setMoviesCheckbox(JSON.parse(query)?.moviesCheckbox);
            setInputValue(JSON.parse(query)?.input);
        }
    }, []);
    
    // show found movies depending on the checkbox
    useEffect(() => {
        if(!moviesError) {
            moviesCheckbox ? setMoviesToRender(foundShortMovies) : setMoviesToRender(foundMovies);
        }
    }, [moviesCheckbox, moviesError]);

    // show found saved movies depending on the checkbox
    useEffect(() => {
        if(searched) {
            savedMoviesCheckbox ? setSavedMoviesToRender(foundShortSavedMovies) : setSavedMoviesToRender(foundSavedMovies);            
        } 
        else {
            savedMoviesCheckbox ? setSavedMoviesToRender(savedShortMovies) : setSavedMoviesToRender(savedMovies);
        }
        
    }, [savedMoviesCheckbox, searched, savedMovies]);

    useEffect(() => {
        setSearched(false);
    }, [location.pathname]);

    // show error if nothing was found
    useEffect(() => {
        moviesToRender.length === 0 ? setMoviesError(NOT_FOUND_ERROR_MSG) : setMoviesError('');
    }, [moviesToRender]);

    useEffect(() => {
        savedMoviesToRender.length === 0 ? setSavedMoviesError(NOT_FOUND_ERROR_MSG) : setSavedMoviesError('');
    }, [savedMoviesToRender]);

    // save input and checkbox state, if they were changed
    useEffect(() => {
        if(query) {
            const queryData = JSON.parse(query);
            queryData.moviesCheckbox = moviesCheckbox;
            setInputValue(queryData.input);
            localStorage.setItem('query', JSON.stringify(queryData));
        }
    }, [query, moviesCheckbox, inputValue, location.pathname]);

    async function handleMoviesSearch(input, moviesCheckbox) {
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
                    setMoviesError(INTERNAL_SERVER_ERROR_MSG);
                    setIsLoading(false);
                });
        };

        const foundMovies = JSON.parse(movies).filter((movie) => {
            return (keyWord.test(movie.nameRU) || keyWord.test(movie.nameEN));
        });

        const foundShortMovies = foundMovies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE_DURATION;
        });

        const query = {
            foundMovies,
            foundShortMovies,
            input,
            moviesCheckbox,
        };
        localStorage.setItem('query', JSON.stringify(query));

        if(moviesCheckbox) {
            setMoviesToRender(foundShortMovies);
            if(foundShortMovies.length === 0) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        } else {
            setMoviesToRender(foundMovies);
            if(foundMovies.length === 0) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        };
    };

    function handleSavedMoviesSearch(input, savedMoviesCheckbox) {
        setIsLoading(true);
        setSavedMoviesInput(input);
        const keyWord = new RegExp(input, "gi");

        const foundMovies = savedMovies.filter((movie) => {
            return (keyWord.test(movie.nameRU) || keyWord.test(movie.nameEN));
        });
        setFoundSavedMovies(foundMovies);

        const foundShortMovies = foundMovies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE_DURATION;
        });
        setFoundShortSavedMovies(foundShortMovies);

        if(savedMoviesCheckbox) {
            setSavedMoviesToRender(foundShortMovies);
            if(foundShortMovies.length === 0) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        } else {
            setSavedMoviesToRender(foundMovies);
            if(foundMovies.length === 0) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setCurrentCardsNumber(0);
                calculateMoviesCount();
            };
        };
    };

    function handleMoviesCheckbox() {
        setMoviesCheckbox(!moviesCheckbox);
    };

    function handleSavedMoviesCheckbox() {
        setSavedMoviesCheckbox(!savedMoviesCheckbox);
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
                    errorText={moviesError}
                    onShortMovies={handleMoviesCheckbox}
                    checked={moviesCheckbox}
                    cardsQuantity={currentCardsNumber}
                    onSaveMovie={handleSaveMovie}
                    onRemoveMovie={handleRemoveMovie}
                    onShowMore={showMoreMovies}
                    isLoading={isLoading}
                    lastInput={inputValue}
                    searchError={searchError}
                    setSearchError={setSearchError}
                    savedMoviesLastInput={savedMoviesInput}
                    setSearched={setSearched}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    onMenuClick={handleMenu}
                    movies={savedMoviesToRender}
                    savedMovies={savedMovies}
                    onGetMovies={handleSavedMoviesSearch}
                    errorText={savedMoviesError}
                    onShortMovies={handleSavedMoviesCheckbox}
                    checked={savedMoviesCheckbox}
                    onRemoveMovie={handleRemoveMovie}
                    isLoading={isLoading}
                    lastInput={inputValue}
                    searchError={searchError}
                    setSearchError={setSearchError}
                    savedMoviesLastInput={savedMoviesInput}
                    setSearched={setSearched}
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
                <ProtectedRoute 
                    path="/profile"
                    component={Profile}
                    loggedIn={loggedIn}
                    onMenuClick={handleMenu}
                    onUpdateUser={handleUpdateUser}
                    onLogout={handleLogout}
                    isSendingReq={isSendingReq}
                />
                <Route path="/*">
                    <NotFound loggedIn={loggedIn} />
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