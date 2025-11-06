import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/products'
    : 'https://tu-proyecto-integrador.vercel.app/api/products';

export const fetchProductsAPI = async () => {
  try {
    const res = await axios.get(API_URL);
    // API returns { data: [...] }
    return res.data;
  } catch (error) {
    console.error('fetchProductsAPI error:', error);
    throw error;
  }
};
