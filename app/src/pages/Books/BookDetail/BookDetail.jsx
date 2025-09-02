import { useParams } from "react-router-dom";
import useHeaderData from "../../../hooks/useHeaderData";
import { useEffect, useState } from "react";
import { getBookById } from "../../../api/BooksServices";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ui/ErrorMessage/ErrorMessage";
import HeaderActions from "./HeaderActions";
import "./BookDetail.css";
import BookBasicDetails from "./BookBasicDetails";
import BookSpecificationDetails from "./BookSpecificationDetails";
import BookMultimediaDetails from "./BookMultimediaDetails";
import DetailBookSidebar from "./DetailBookSidebar";
import RentEvidentionPage from "../../RentEvidention/RentEvidentionPage";


const BookDetail = () => {

  const { bookId } = useParams();
  const { setHeaderData } = useHeaderData();

  // Fetch book
  const [bookData, setBookData] = useState(null);
  const [fetchBookError, setFetchBookError] = useState(null);
  const [fetchBookLoading, setFetchBookLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('osnovni-detalji');

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
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    setHeaderData({
      label: bookData?.title,
      breadcrumbs: [
        {label:"Evidencija knjiga", to: "/books"},
        {label:`KNJIGA-${bookId}`, to: `books/book-detail/${bookId}`}
      ],
      actions: (
        <HeaderActions bookId={bookId} />
      ) 
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, bookId, bookData?.title]);
  

  return (
    fetchBookLoading ? (
      <LoadingSpinner />
    ) : fetchBookError && errors ? (
      <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
    ) : (
      <div className="page">

        <div className="page-main">
          <div className="book-detail-tabs">
            <button 
              className={`tab-button ${activeTab === 'osnovni-detalji' ? 'active' : ''}`}
              onClick={() => handleTabChange('osnovni-detalji')}
            >
              Osnovni Detalji
            </button>
            <button 
              className={`tab-button ${activeTab === 'specifikacije' ? 'active' : ''}`}
              onClick={() => handleTabChange('specifikacije')}
            >
              Specifikacije
            </button>
            <button 
              className={`tab-button ${activeTab === 'evidencija-iznajmljivanja' ? 'active' : ''}`}
              onClick={() => handleTabChange('evidencija-iznajmljivanja')}
            >
              Evidencija iznajmljivanja
            </button>
            <button 
              className={`tab-button ${activeTab === 'multimedija' ? 'active' : ''}`}
              onClick={() => handleTabChange('multimedija')}
            >
              Multimedija
            </button>
          </div>
          <div className="main-section">
            {activeTab === 'osnovni-detalji' && (
              <BookBasicDetails bookData={bookData} />
            )}
            {activeTab === 'specifikacije' && (
              <BookSpecificationDetails bookData={bookData} />
            )}
            {activeTab === 'evidencija-iznajmljivanja' && (
              <RentEvidentionPage />
            )}
            {activeTab === 'multimedija' && (
              <BookMultimediaDetails bookData={bookData} />
            )}
          </div>
        </div>

        <div className="page-sidebar">
          <DetailBookSidebar bookData={bookData} />
        </div>
      </div>
    )
  )
}

export default BookDetail