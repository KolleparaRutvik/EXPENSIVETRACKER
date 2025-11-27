// src/api/authService.js
import api from "./api";

export async function registerUser({ name, email, password }) {
  const res = await api.post("/api/auth/register", { name, email, password });
  // backend returns { id, name, email } (per our backend)
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await api.post("/api/auth/login", { email, password });
  // returns { id, name, email }
  return res.data;
}