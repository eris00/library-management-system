import { useEffect, useState } from "react";
import useHeaderData from "../../hooks/useHeaderData";
import { getAllBooks } from "../../api/BooksServices";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import BooksHeader from "./BooksHeader";
import BooksTable from "./BooksTable";
import "./Books.css";

const Books = () => {

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Knjige",
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getAllBooks({ signal: controller.signal })
      .then(data => {
        setBooks(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);  

  const filteredBooks = books.filter(book => (book.title && book.title.toLowerCase().includes(search.toLowerCase())) || 
                                    (book.authors && book.authors.map(author => author.name + " " + author.surname).join(", ").toLowerCase().includes(search.toLowerCase())) ||
                                    (book.categories && book.categories.map(category => category.name).join(", ").toLowerCase().includes(search.toLowerCase()))
                                  );
  

  return (
    <div className="books-wrapper__main">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
      ) : (
        <>
          <BooksHeader search={search} setSearch={setSearch} />
          <BooksTable data={filteredBooks.reverse()} setBooks={setBooks} />
        </>
      )}
    </div>
  )
}

export default Books