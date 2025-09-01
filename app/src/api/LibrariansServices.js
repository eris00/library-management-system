import api from "./api";

// Lista bibliotekara
export const getAllLibrarians = async (config = {}) => {
  try {
    const { data } = await api.get("/librarians", config);

    if (Array.isArray(data?.data)) {
      return data.data;   
    }

    if (Array.isArray(data)) {
      return data;        
    }

    return [];            
  } catch (err) {
    console.error("Greška API:", err);
    return [];
  }
};
// Detalji bibliotekara
export const getLibrarian = async (id, config = {}) => {
  const { data } = await api.get(`/librarians/${id}`, config);
  return data.data;
};

// Kreiranje bibliotekara
export const createNewLibrarian = async (payload, config = {}) => {
  const { data } = await api.post("/librarians/store", payload, config);
  return data.data;
};

// Ažuriranje bibliotekara
export const updateLibrarian = async (id, payload, config = {}) => {
  const { data } = await api.put(`/librarians/${id}`, payload, config);
  return data.data;
};

// Brisanje bibliotekara
export const deleteLibrarian = async (id, config = {}) => {
  const { data } = await api.delete(`/librarians/${id}`, config);
  return data.data;
};
