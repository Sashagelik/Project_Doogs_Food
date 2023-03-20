const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
//Регистрация пользователя
  registerUser(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ ...data, group: "group-10" }),
    }).then(onResponce);
  }
//Авторизация (Логин) пользователя
  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  //Сброс пароля пользователя и отправка ему на почту нового токена
  resetPass({email}) {
    return fetch(`${this._baseUrl}/forgot-password`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({email}),
    }).then(onResponce)
  }
  //меняем пароль после того как получили новый токен на почту
  changePass(token, password) {
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(password),
    }).then(onResponce);
  }
}

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
  },
};

const authApi = new Api(config);

export default authApi;
