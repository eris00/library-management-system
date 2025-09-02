import { useEffect, useState } from "react";
import useHeaderData from '../../hooks/useHeaderData';
import { getAllBorrowings } from "../../api/BorrowBookServices";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import "./Activities.css";

const Activities = () => { 

    const { setHeaderData } = useHeaderData();
    useEffect(() => {
      setHeaderData({
        label: "Aktivnosti",
      });
      return () => setHeaderData({ label: "", breadcrumbs: "", actions: null });
    }, [setHeaderData]);

    const [rents, setRents] = useState({});

      const [fetchAllEvidentionError, setFetchAllEvidentionError] = useState(null);
      const [fetchAllEvidentionLoading, setFetchAllEvidentionLoading] = useState(true);
      const [fetchAllReservationError, setFetchAllReservationError] = useState(null);
      const [fetchAllReservationLoading, setFetchAllReservationLoading] = useState(true);
    
      useEffect(() => {
        const controller = new AbortController();
    
        setFetchAllEvidentionLoading(true);
        setFetchAllEvidentionError(null);
    
        setFetchAllReservationLoading(true);
        setFetchAllReservationError(null);
        
        getAllBorrowings({ signal: controller.signal })
          .then(data => {
            setRents(data.izdate);
          })
          .catch((err) => {
            if (err.name !== "AbortError") setFetchAllReservationError(err.message);
          })
          .finally(() => {
            setFetchAllReservationLoading(false);
          });
    
        return () => controller.abort();
      }, []); 

      const today = new Date();


      console.log(rents);
      
  

  return (
     fetchAllEvidentionLoading && fetchAllReservationLoading ? (
      <LoadingSpinner />
    ) : fetchAllEvidentionError && fetchAllReservationError ? (
      <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
    ) : (
      <div className="activities-wrapper">
        <div className="rents-list">
        {rents.map((rent) => {
          const borrowDate = new Date(rent.borrow_date);
          const returnDate = new Date(rent.return_date);
          const diffDays = Math.floor((today - borrowDate) / (1000 * 60 * 60 * 24));
          const formattedBorrow = borrowDate.toLocaleDateString("sr-Latn-ME");
          const returnDiff = Math.floor((returnDate - borrowDate) / (1000 * 60 * 60 * 24));
          const librarian = `${rent.bibliotekar0.name.charAt(0)}. ${rent.bibliotekar0.surname}`;

          return (
            <div key={rent.id} className="rent-item">
              <div>
                <div className="rent-meta">
                  Izdavanje knjige - {diffDays} days ago
                </div>
              </div>
              <div className="rent-top">
                <div className="rent-body">
                  <img
                    src={rent.bibliotekar0.photoPath}
                    alt={librarian}
                    className="rent-avatar"
                  />
                  <p className="rent-text">
                    <span className="librarian">{librarian}</span> je izdala knjigu{" "}
                    <span className="book">{rent.knjiga.title}</span>{" "}
                    <span className="student">
                      {rent.student.name} {rent.student.surname}
                    </span>{" "}
                    dana {formattedBorrow}. Period vraćanja knjige {returnDiff} dana.
                  </p>
                </div>
              </div>
          </div>
          );
        })}
      </div>
    </div>
    )
  )
}

export default Activities