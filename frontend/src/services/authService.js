import api, { setStoredToken, getStoredToken } from './api';

const USER_KEY = 'ledger_user';

export const authService = {
  async register({ name, email, password }) {
    const { data } = await api.post('/auth/register', { name, email, password });
    setStoredToken(data.token);
    setStoredUser(data.user);
    return data;
  },

  async login({ email, password }) {
    const { data } = await api.post('/auth/login', { email, password });
    setStoredToken(data.token);
    setStoredUser(data.user);
    return data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      setStoredToken(null);
      setStoredUser(null);
    }
  },

  getCurrentUser() {
    return getStoredUser();
  },

  isAuthenticated() {
    return !!getStoredToken();
  },
};

export const setStoredUser = (user) => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
};
