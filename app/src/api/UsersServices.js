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

export const createNewStudent = async (studentData) => {
  try {
    const response = await api.post("/users/store", studentData);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error; 
  }
}

export const updateStudent = async (studentData, studentId) => {
  try {
    const response = await api.put(`/users/${studentId}`, studentData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteStudent = async (studentId) => {
  try {
    const response = await api.delete(`/users/${studentId}`);
    return response;
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
