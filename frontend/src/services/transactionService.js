import api from './api';

export const transactionService = {
  async createTransaction({ fromAccount, toAccount, amount, idempotencyKey }) {
    const { data } = await api.post('/transactions', {
      fromAccount,
      toAccount,
      amount,
      idempotencyKey,
    });
    return data;
  },

  async createInitialFunds({ toAccount, amount, idempotencyKey }) {
    const { data } = await api.post('/transactions/system/initial-funds', {
      toAccount,
      amount,
      idempotencyKey,
    });
    return data;
  },
};
