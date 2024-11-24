import { createStore } from 'vuex';

const store = createStore({
  state: {
    apiUrl: 'http://localhost:3000', // Установите ваш URL сервера здесь
    user: null,
    isAuthenticated: false,
    token: getCookie('token') || null
  },
  mutations: {
    setApiUrl(state, url) {
      state.apiUrl = url;
    },
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setToken(state, token) {
      state.token = token;
      setCookie('token', token, 7); // Сохраняем токен в куки на 7 дней
    },
    clearToken(state) {
      state.token = null;
      deleteCookie('token');
    }
  },
  actions: {
    updateApiUrl({ commit }, url) {
      commit('setApiUrl', url);
    },
    login({ commit }, user) {
      commit('setUser', user);
      commit('setIsAuthenticated', true);
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setIsAuthenticated', false);
      commit('clearToken');
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    }
  },
  getters: {
    apiUrl: state => state.apiUrl,
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    token: state => state.token
  }
});

export default store;

// Функции для работы с куки
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
