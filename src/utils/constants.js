// server addresses
export const BASE_URL = 'https://api.movieexplorer.nomoredomains.sbs';
export const BASE_MOVIES_URL = 'https://api.nomoreparties.co';

// error messages
export const INTERNAL_SERVER_ERROR_MSG = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';
export const DEFAULT_ERROR_MSG = 'Что-то пошло не так...';
export const NOT_FOUND_ERROR_MSG = 'Ничего не найдено';
export const USER_NOT_FOUND_ERROR_MSG = 'Пользователь не найден';
export const MOVIE_NOT_FOUND_ERROR_MSG = 'Фильм не найден';
export const AUTHORIZATION_FAILED_ERROR_MSG = 'Ошибка авторизации';
export const UNAUTHORIZED_ERROR_MSG = 'Требуется авторизация';
export const BAD_REQUEST_ERROR_MSG = 'Введенные данные не прошли валидацию на сервере';
export const CONFLICT_SIGNUP_EMAIL_ERROR_MSG = 'Пользователь с таким E-mail уже существует';
export const CONFLICT_UPDATE_EMAIL_ERROR_MSG = 'Введенный Вами E-mail уже используется';
export const FORBIDDEN_ERROR_MSG = 'Вы не можете удалить фильм из списка сохраненных фильмов, который принадлежит другому пользователю.';
export const SAVE_MOVIE_ERROR_MSG = 'Не удалось сохранить фильм. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';
export const DELETE_MOVIE_ERROR_MSG = 'Не удалось удалить фильм из списка сохраненных фильмов. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';

// modal messages
export const SUCCESSFUL_SIGNUP_MSG = 'Вы успешно зарегистрировались';
export const SUCCESSFUL_PROFILE_UPDATE_MSG = 'Данные обновлены';

// unknown movie data
export const UNKNOWN_DATA = 'Неизвестно';
export const UNKNOWN_TRAILER_URL = 'https://www.youtube.com';

// screen width
export const LARGE_SCREEN_WIDTH = 1240;
export const MIDDLE_SCREEN_WIDTH = 1141;
export const SMALL_SCREEN_WIDTH = 601;

// movies constants
export const LARGE_SCREEN_MOVIES_NUMBER = 12;
export const MIDDLE_SCREEN_MOVIES_NUMBER = 8;
export const SMALL_SCREEN_MOVIES_NUMBER = 5;
export const LARGE_SCREEN_MOVIES_TO_ADD_NUMBER = 4;
export const MIDDLE_SCREEN_MOVIES_TO_ADD_NUMBER = 2;
export const SMALL_SCREEN_MOVIES_TO_ADD_NUMBER = 2;
export const SHORT_MOVIE_DURATION = 40;