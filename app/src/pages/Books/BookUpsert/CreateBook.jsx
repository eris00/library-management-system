import { useEffect, useState } from 'react'
import useHeaderData from '../../../hooks/useHeaderData';
import BookForm from './BookForm';

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
    "deletePdfs": null,
    "categories": [],
    "genres": [],
    "authors": [],
    "pictures": "",
  }

  return (
    <div>
      <BookForm initialValues={emptyBook} errors={errors} />
    </div>
  )
}

export default CreateBook