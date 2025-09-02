import { useNavigate, useParams } from 'react-router-dom';
import useHeaderData from "../../../hooks/useHeaderData";
import { useEffect, useState } from 'react';
import { bookValidate } from '../../../utils/validations';
import { mapBookFormToApi, mapBookFromApiToView } from '../../../utils/transformers';
import { getBookById, updateBook } from '../../../api/BooksServices';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage/ErrorMessage';
import BookForm from './BookForm';

const UpdateBook = () => {

  const navigate = useNavigate();
  const { bookId } = useParams();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Izmijeni knjigu",
      breadcrumbs: [
        {label:"Sve knjige", to: "/books"},
        {label:`ID-${bookId}`, to: `books/update-book/${bookId}`}
      ]
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, bookId]);

  // Fetch book
  const [bookData, setBookData] = useState(null);
  const [fetchBookError, setFetchBookError] = useState(null);
  const [fetchBookLoading, setFetchBookLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setFetchBookLoading(true);
    setFetchBookError(null);
    getBookById(bookId, { signal: controller.signal })
      .then(data => {
        const transformedBook = mapBookFromApiToView(data);
        setBookData(transformedBook)
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

  // Update book
  const handleSubmit = async (formValues) => {
      const newErrors = bookValidate(formValues);
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      setSubmitting(true);
  
      try {
        const newBook = mapBookFormToApi(formValues)
        await updateBook(bookId, newBook);
        toast.success("Uspješno ste izmijenili knjigu!");
        navigate("/books");
      } catch (err) {    
        console.log(err);
      } finally {
        setSubmitting(false);
      } 
    }

    return (
      fetchBookLoading ? (
        <LoadingSpinner />
      ) : fetchBookError ? (
        <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
      ) : (
        <BookForm 
          initialValues={bookData} 
          onSubmit={handleSubmit} 
          submitting={submitting} 
          errors={errors} 
    />
      )
  )
}

export default UpdateBook