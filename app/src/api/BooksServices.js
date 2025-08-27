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

export const getBookById = async (bookId) => {
  try {
    const response = await api.get(`/books/${bookId}`);
    return response.data.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const createNewBook = async (newBook) => {
  try {
    const response = await api.post("/books/store", newBook);
    return response.data;
  } catch(error) {
    console.log(error);
    throw error;
  }
}

export const updateBook = async (bookId, book) => {
  try {
    const response = await api.post(`books/${bookId}/update`, book);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteBook = async (bookid) => {
  try {
    const response = await api.delete(`/books/${bookid}/destroy`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getAllSelectDatas = async () => {
  try {
    const response = await api.get(`/books/create`)
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}