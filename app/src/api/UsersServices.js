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