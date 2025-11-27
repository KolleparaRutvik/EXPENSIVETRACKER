// src/api/transactionService.js
import api from "./api";

export async function addTransaction(payload) {
  // payload: { userId, amount, type, category, description }
  const res = await api.post("/api/tx/add", payload);
  return res.data;
}

export async function getHistory(userId) {
  const res = await api.get(`/api/tx/history/${userId}`);
  return res.data;
}

export async function getPie(userId) {
  const res = await api.get(`/api/tx/pie/${userId}`);
  return res.data;
}

export async function getBalance(userId) {
  const res = await api.get(`/api/tx/balance/${userId}`);
  return res.data;
}