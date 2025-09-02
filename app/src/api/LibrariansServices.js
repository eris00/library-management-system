import api from "./api";

// Lista svih bibliotekara
export const getAllLibrarians = async () => {
  try {
    const { data } = await api.get(`/users?role_id=1`);
    // backend vraća data.data
    return data.data || [];
  } catch (err) {
    console.error("Greška API:", err);
    return [];
  }
};

// Detalji bibliotekara
export const getLibrarian = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`);
    // backend vraća { data: {...} }
    return data?.data?.role === "Bibliotekar" || data?.data?.role_id === 1
      ? data.data
      : null;
  } catch (err) {
    console.error("Greška API:", err);
    return null;
  }
};

// Kreiranje bibliotekara
export const createNewLibrarian = async (librarian) => {
  try {
    console.log("📤 Šaljem payload:", librarian);
    const { data } = await api.post(`/users/store`, { ...librarian, role_id: 1 });
    console.log("📥 Odgovor API:", data);
    return data.data;
  } catch (err) {
    console.error("❌ Greška API (createNewLibrarian):", err.response?.data || err);
    throw err;
  }
};

// Ažuriranje bibliotekara
export const updateLibrarian = async (id, librarian) => {
  try {
    const { data } = await api.put(`/users/${id}`, librarian);
    return data.data;
  } catch (err) {
    console.error("Greška API:", err);
    throw err;
  }
};

// Brisanje bibliotekara
export const deleteLibrarian = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (err) {
    console.error("Greška API:", err);
    throw err;
  }
};
