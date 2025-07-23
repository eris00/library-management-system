import api from "./api";

export const getAllUsers = async () => {
  try {
    const data = await api('/users');
    return data.data.data;
  } catch (error) {
    console.log(error);
    throw error;  
  }
};

export const getUser = async (userId) => {
  try {
    const data = await api(`/users/${userId}`);
    return data.data.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    const token = response.data.data.token;

    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
