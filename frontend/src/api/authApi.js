import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    // El backend expone las rutas en /auth y por defecto corre en el puerto 8080
    ? "http://localhost:8080/auth"
    : "https://tu-proyecto-integrador.vercel.app/api/auth";

export const registerUserAPI = async (userData) => {
  // El backend espera { nombre, email, password }
  const payload = {
    nombre: userData.name,
    email: String(userData.email).trim().toLowerCase(),
    password: userData.password,
  };
  try {
    // log útil durante desarrollo
    console.log('Register API payload:', payload);
    const res = await axios.post(`${API_URL}/register`, payload);
    console.log('Register API response:', res.data);
    return res.data; // debería devolver { message: "Código enviado", email }
  } catch (error) {
    // Normalizar y relanzar con un message legible para el thunk
    const backendMessage =
      error.response?.data?.message ||
      (error.response?.data ? JSON.stringify(error.response.data) : null) ||
      error.message;
    console.error('Register API error:', backendMessage);
    throw new Error(backendMessage);
  }
};

export const verifyCodeAPI = async (email, code) => {
  try {
    const emailNormalized = String(email).trim().toLowerCase();
    console.log('Verify API payload:', { email: emailNormalized, code });
    const res = await axios.post(`${API_URL}/verify`, { email: emailNormalized, code });
    console.log('Verify API response:', res.data);
    return res.data; // debería devolver { user, token }
  } catch (error) {
    const backendMessage =
      error.response?.data?.message ||
      (error.response?.data ? JSON.stringify(error.response.data) : null) ||
      error.message;
    console.error('Verify API error:', backendMessage);
    throw new Error(backendMessage);
  }
};

export const loginUserAPI = async ({ email, password }) => {
  try {
    const emailNormalized = String(email).trim().toLowerCase();
    console.log('Login API payload:', { email: emailNormalized });
    const res = await axios.post(`${API_URL}/login`, { email: emailNormalized, password });
    console.log('Login API response:', res.data);
    return res.data; // debería devolver { usuario, token }
  } catch (error) {
    const backendMessage =
      error.response?.data?.message ||
      (error.response?.data ? JSON.stringify(error.response.data) : null) ||
      error.message;
    console.error('Login API error:', backendMessage);
    throw new Error(backendMessage);
  }
};