class MainApi {
    constructor(data) {
      this._serverUrl = data._serverUrl;
    }

    _checkResponse(res) {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

    getCurrentUser() {
      return fetch(`${this._serverUrl}users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => this._checkResponse(res));
    }

    changeUserData(data) {
      return fetch(`${this._serverUrl}users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      })
      .then((res) => this._checkResponse(res));
    }

    saveMovie(data) {
      return fetch(`${this._serverUrl}movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((res) => this._checkResponse(res));
    }

    removeMovie(id) {
      return fetch(`${this._serverUrl}movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => this._checkResponse(res));
    }

    getSavedMovies() {
      return fetch(`${this._serverUrl}movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => this._checkResponse(res));
    }

}

const mainApi = new MainApi({
  _serverUrl: 'https://api.movieexplorer.nomoredomains.sbs/',
});

export default mainApi;