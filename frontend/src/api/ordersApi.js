import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/orders'
    : 'https://tu-proyecto-integrador.vercel.app/orders';

export const fetchOrdersAPI = async (token) => {
  const res = await axios.get(API_URL + '/', {
    headers: { 'x-token': token },
  });
  return res.data; // { data: [...] }
};

export const createOrderAPI = async (orderData, token) => {
  const res = await axios.post(API_URL + '/', orderData, {
    headers: { 'x-token': token },
  });
  return res.data; // { order }
};

export default { fetchOrdersAPI, createOrderAPI };
