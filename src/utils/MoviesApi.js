class MoviesApi {
    constructor(data) {
        this._serverUrl = data.serverUrl;
        this._headers = data.headers;
    }

    _checkResponse(res) {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getMovies() {
        return fetch(`${this._serverUrl}`, { 
            method: "GET", 
            headers: this._headers,
        })
        .then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
    serverUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default moviesApi;