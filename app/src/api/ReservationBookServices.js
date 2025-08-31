import api from "./api";

export const getAllReservations = async () => {
  try {
    const response = await api.get("/books/reservations")
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const reserveBook = async (bookId, studentId, reservationDate) => {
  try {
    const response = await api.post(`books/${bookId}/reserve`, {
      student_id: studentId,
      datumRezervisanja: reservationDate
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const cancelReservation = async (reservationId) => {
  try {
    const response = await api.post("books/reservations/cancel", {
      reservation_id: reservationId
    })
    return response.data
  } catch (error) {
    console.log(error);
    throw error
    
  }
}