const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const freshToken = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
};

const config = {
  baseUrl: "https://api.react-learning.ru",

  freshToken: freshToken,
};

class Api {
  constructor({ baseUrl, headers, freshToken }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._freshToken = freshToken;
  }

  getProductList() {
    return fetch(`${this._baseUrl}/products`, {
      ...this._freshToken(),
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshToken(),
    }).then(onResponce);
  }

  getUserGroup() {
    return fetch(`${this._baseUrl}/users`, {
      ...this._freshToken(),
    }).then(onResponce);
  }

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
      ...this._freshToken(),
    }).then(onResponce);
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      ...this._freshToken(),
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  createReviewProduct(productId, body) {
    console.log(productId, body);
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      method: "POST",
      ...this._freshToken(),
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  search(searchQuery) {
    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
      ...this._freshToken(),
    }).then(onResponce);
  }

  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? "DELETE" : "PUT",
      ...this._freshToken(),
    }).then(onResponce);
  }
}

const api = new Api(config);

export default api;
