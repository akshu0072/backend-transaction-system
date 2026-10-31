import api from './api';

export const accountService = {
  async createAccount() {
    const { data } = await api.post('/accounts');
    return data.account;
  },

  async getAccounts() {
    const { data } = await api.get('/accounts');
    return data.accounts;
  },

  async getBalance(accountId) {
    const { data } = await api.get(`/accounts/balance/${accountId}`);
    return data.balance;
  },
};
