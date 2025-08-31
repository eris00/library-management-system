import { useEffect, useState } from "react";
import Select from 'react-select'
import "./BookActions.css";
import { BookUp, X } from "lucide-react";
import BookQuantities from "../BookDetail/BookQuantities";
import { useNavigate, useParams } from "react-router-dom";
import useHeaderData from "../../../hooks/useHeaderData";
import { getBookById } from "../../../api/BooksServices";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ui/ErrorMessage/ErrorMessage";
import HeaderActions from "../BookDetail/HeaderActions";
import { getAllUsers } from "../../../api/UsersServices";
import { makeOptions } from "../../../utils/bookUtils";
import { reserveBookValidate } from "../../../utils/validations";
import { toast } from "react-toastify";
import { reserveBook } from "../../../api/ReservationBookServices";

const ReserveBook = () => {
  
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { setHeaderData } = useHeaderData();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch book
  const [bookData, setBookData] = useState(null);
  const [fetchBookError, setFetchBookError] = useState(null);
  const [fetchBookLoading, setFetchBookLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    setFetchBookLoading(true);
    setFetchBookError(null);
    getBookById(bookId, { signal: controller.signal })
      .then(data => {        
        setBookData(data);
      })
      .catch((err) => {
        setBookData(null);
        if (err.name !== "AbortError") setErrors(err.message);
      })
      .finally(() => {
        setFetchBookLoading(false);        
      })
    return () => controller.abort();
  }, [bookId]);

  // set page header
  useEffect(() => {
    setHeaderData({
      label: bookData?.title,
      breadcrumbs: [
        {label:"Evidencija knjiga", to: "/books"},
        {label:`KNJIGA-${bookId}`, to: `books/book-detail/${bookId}`},
        {label:"Rezerviši knjigu", to: `/books/reserve-book/${bookId}`}
      ],
      actions: (
        <HeaderActions bookId={bookId} />
      ) 
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, bookId, bookData?.title]);

  // fetch students
  const [fetchStudentLoading, setFetchStudentLoading] = useState(true);
  const [fetchStudentError, setFetchStudentError] = useState(null);

  const [studentOptions, setStudentOptions] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setFetchStudentLoading(true);
    setFetchStudentError(null);

    getAllUsers({ signal: controller.signal })
      .then(data => {
        const studentUsers = data.filter(user => user.role === "Učenik").map(student => ({ id: student.id, name: student.name + " " + student.surname }));       
        setStudentOptions(makeOptions(studentUsers));
      })
      .catch((err) => {
        if (err.name !== "AbortError") setFetchStudentError(err.message);
      })
      .finally(() => {
        setFetchStudentLoading(false);
      });

    return () => controller.abort();
  }, []);

    const handleStartDateChange = (e) => {
      const value = e.target.value;
      setStartDate(value);
      if (value) {
        const start = new Date(value);
        const end = new Date(start);
        end.setDate(start.getDate() + 30);
      }
    };

  const handleSubmit = async (event) => {
    event.preventDefault()    
    
    const newErrors = reserveBookValidate(selectedStudent, startDate);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    
    try {
        await reserveBook(bookId, selectedStudent.value, startDate); // value = id
        toast.success("Uspješno ste rezervisali knjigu");
        navigate(`/books/book-detail/${bookId}`);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setSubmitting(false);
      } 
  }

  const handleCancel = () => {
    setSelectedStudent(null);
    setStartDate(null);
  }
  

  return (
        fetchBookLoading && fetchStudentLoading ? (
      <LoadingSpinner />
    ) : fetchBookError && fetchStudentError ? (
      <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
    ) : (
    <div className="rent-book-wrapper">
      <div className="rent-book-main">
        <h2>Izdaj knjigu</h2>
        <form className="rent-book-form" onSubmit={ handleSubmit }>
          <div>
            <Select
              name="student"
              className="form-select"
              classNamePrefix="rs" 
              options={studentOptions} 
              placeholder="Izaberite učenika"
              value={selectedStudent}
              onChange={(selected) => {
                setSelectedStudent(selected);
              }}
            />
            {errors.student && <div className="input-error">{errors.student}</div>}
          </div>

          <div className="reserve-book-row">
            <div className="reserve-row-section">
              <input 
                type="date" 
                value={startDate}
                onChange={handleStartDateChange}  
              />
              <span>Format: dd/mm/yyyy</span>
              {errors.startDate && <div className="input-error">{errors.startDate}</div>}
            </div>

          </div>

          <div className="form-buttons">
            <button className="save-btn" type="submit" disabled={submitting}>
              <BookUp /> REZERVIŠI KNJIGU
            </button>
            <button className="cancel-btn" type="button" onClick={ handleCancel }>
              <X/> PONIŠTI
            </button>
          </div>

        </form>
      </div>
      <div className="book-quantities-rent">
        <h3>Količine</h3>
        <BookQuantities bookData={bookData}/>
      </div>
    </div>
    )
  )
}

export default ReserveBook