// src/api/api.js
import axios from "axios";

export const API_BASE = "http://localhost:30025"; // change if your backend runs elsewhere

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export default api;