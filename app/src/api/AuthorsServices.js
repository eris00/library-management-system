import api from "./api";

// Lista autora
export const getAllAuthors = async (config = {}) => {
  const { data } = await api.get("/authors", config);
  return data;
};

// Detalji autora
export const getAuthor = async (id, config = {}) => {
  const { data } = await api.get(`/authors/${id}`, config);
  return data;
};

// Kreiranje autora
export const createNewAuthor = async (payload, config = {}) => {
  const { data } = await api.post("/authors", payload, config);
  return data;
};

// Ažuriranje autora
export const updateAuthor = async (id, payload, config = {}) => {
  const { data } = await api.put(`/authors/${id}`, payload, config);
  return data;
};

// Brisanje autora
export const deleteAuthor = async (id, config = {}) => {
  const { data } = await api.delete(`/authors/${id}`, config);
  return data;
};
