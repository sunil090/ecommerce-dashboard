import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, API_VERSION } from './config';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

axiosClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const resp = err?.response;
    const message = resp?.data?.error || resp?.data?.message || resp?.statusText || err.message || 'Network error';
    return Promise.reject({ status: resp?.status || 500, message, raw: resp?.data || null });
  }
);

export async function signup({ name, email, password }) {
  const res = await axiosClient.post(`${API_VERSION}/users/signup`, { name, email, password });
  return res.data;
}

export async function login({ email, password }) {
  const res = await axiosClient.post(`${API_VERSION}/users/login`, { email, password });
  return res.data;
}

export async function logout() {
  const res = await axiosClient.post(`${API_VERSION}/users/logout`);
  return res.data;
}

export async function me() {
  const res = await axiosClient.get(`${API_VERSION}/users/me`);
  return res.data;
}


export function setAuthToken(token) {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}

export default axiosClient;
