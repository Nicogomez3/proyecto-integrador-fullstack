import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/cart'
    : 'https://tu-proyecto-integrador.vercel.app/api/cart';

export const getCartAPI = async (token) => {
  const res = await axios.get(API_URL, { headers: { 'x-token': token } });
  return res.data;
};

export const setCartAPI = async (items, token) => {
  const res = await axios.post(API_URL, { items }, { headers: { 'x-token': token } });
  return res.data;
};

export const updateCartItemAPI = async (itemId, quantity, token) => {
  const res = await axios.put(`${API_URL}/${itemId}`, { quantity }, { headers: { 'x-token': token } });
  return res.data;
};

export const removeCartItemAPI = async (itemId, token) => {
  const res = await axios.delete(`${API_URL}/${itemId}`, { headers: { 'x-token': token } });
  return res.data;
};
