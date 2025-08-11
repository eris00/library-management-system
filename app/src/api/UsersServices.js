import api from "./api";

export const getAllUsers = async () => {
  try {
    const response = await api("/users");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
    const response = await api.post("/register", userData);
    return response; 
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
