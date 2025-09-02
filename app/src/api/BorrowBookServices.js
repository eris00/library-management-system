import api from "./api";

export const getAllBorrowings = async () => {
  try {
    const response = await api.get("books/borrows");
    return response.data.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const borrowBook = async (bookId, studentId, borrowingStartDate, borrowingEndDate) => {
  try {
    const response = await api.post(`books/${bookId}/izdaj`, {
      student_id: studentId,
      datumIzdavanja: borrowingStartDate,
      datumVracanja: borrowingEndDate
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const returnBook = async (borrowingId) => {
  try {
    const response = await api.post("books/vrati", {
      toReturn: [borrowingId]
    })
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
} 

export const writeOffBook = async (borrowingId) => {
  try {
    const response = await api.post("books/otpisi", {
      toWriteoff: [borrowingId]
    })
    response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}