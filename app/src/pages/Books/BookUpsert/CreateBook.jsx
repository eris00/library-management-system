import { useEffect, useState } from 'react'
import useHeaderData from '../../../hooks/useHeaderData';
import BookForm from './BookForm';
import { bookValidate } from '../../../utils/validations';
import { mapBookFormToApi } from '../../../utils/transformers';
import { createNewBook } from '../../../api/BooksServices';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {

  const { setHeaderData } = useHeaderData();
    useEffect(() => {
    setHeaderData({
      label: "Nova Knjiga",
      breadcrumbs: [
        {label:"Sve knjige", to: "/books"},
        {label:"Nova knjiga", to: "/create-book"}
      ]
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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
      await createNewBook(newBook);
      toast.success("Uspješno ste dodali novu knjigu!");
      navigate("/books");
    } catch (err) {    
      console.log("is err: ", err);
    } finally {
      setSubmitting(false);
    } 
  }

  // book type
  const emptyBook = {
    "title": "",
    "pageNumber": null,
    "script": null,
    "language": null,
    "binding": null,
    "format": null,
    "publisher": null,
    "publicationYear": null,
    "isbn": null,
    "quantity": null,
    "summary": "",
    "categories": [],
    "genres": [],
    "authors": [],
    "pictures": "",
  }

  return (
    <div>
      <BookForm initialValues={emptyBook} onSubmit={handleSubmit} submitting={submitting} errors={errors} />
    </div>
  )
}

export default CreateBook