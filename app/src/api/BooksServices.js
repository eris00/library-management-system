import api from "./api";

export const getAllBooks = async () => {
  try {
    const response = await api("/books");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (bookid) => {
  try {
    const response = await api.delete(`/books/${bookid}/destroy`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}