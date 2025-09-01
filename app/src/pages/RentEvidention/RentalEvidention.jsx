import { useEffect, useState } from 'react'
import { getAllReservations } from '../../api/ReservationBookServices';
import { getAllBorrowings } from '../../api/BorrowBookServices';
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';
import RentedBooks from './TabComponents/RentedBooks';
import ReturnedBooks from './TabComponents/ReturnedBooks';
import OverdueBooks from "./TabComponents/OverdueBooks";
import ActiveReservations from "./TabComponents/ActiveReservations";
import ArchiveReservations from "./TabComponents/ArchiveReservations";

const RentalEvidention = () => {

  const [rents, setRents] = useState({}); // rents === borrowings
  const [reservations, setReservations] = useState({});

  const [fetchAllEvidentionError, setFetchAllEvidentionError] = useState(null);
  const [fetchAllEvidentionLoading, setFetchAllEvidentionLoading] = useState(true);
  const [fetchAllReservationError, setFetchAllReservationError] = useState(null);
  const [fetchAllReservationLoading, setFetchAllReservationLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('izdate-knjige');
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const controller = new AbortController();

    setFetchAllEvidentionLoading(true);
    setFetchAllEvidentionError(null);

    setFetchAllReservationLoading(true);
    setFetchAllReservationError(null);

    getAllReservations({ signal: controller.signal })
      .then(data => {
        setReservations(data);
      })
      .catch((err) => {        
        if (err.name !== "AbortError") setFetchAllReservationError(err.message);
      })
      .finally(() => {
        setFetchAllEvidentionLoading(false);
      });
    
    getAllBorrowings({ signal: controller.signal })
      .then(data => {
        setRents(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setFetchAllReservationError(err.message);
      })
      .finally(() => {
        setFetchAllReservationLoading(false);
      });

    return () => controller.abort();
  }, []);  

  return (
    fetchAllEvidentionLoading && fetchAllReservationLoading ? (
      <LoadingSpinner />
    ) : fetchAllEvidentionError && fetchAllReservationError ? (
      <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
    ) : (
      <div className='rental-evidention-wrapper'>
        <div className="rental-menu">
          <button 
            className={`rental-menu-button ${activeTab === 'izdate-knjige' ? 'active' : ''}`}
            onClick={() => handleTabChange('izdate-knjige')}
          >
            Izdate knjige
          </button>
          <button 
            className={`rental-menu-button ${activeTab === 'vracene-knjige' ? 'active' : ''}`}
            onClick={() => handleTabChange('vracene-knjige')}
          >
            Vraćene knjige
          </button>
          <button 
            className={`rental-menu-button ${activeTab === 'knjige-u-prekoracenju' ? 'active' : ''}`}
            onClick={() => handleTabChange('knjige-u-prekoracenju')}
          >
            Knjige u prekoračenju
          </button>
          <div className="divider"></div>
          <button 
            className={`rental-menu-button ${activeTab === 'aktivne-rezervacije' ? 'active' : ''}`}
            onClick={() => handleTabChange('aktivne-rezervacije')}
          >
            Aktivne rezervacije
          </button>
          <button 
            className={`rental-menu-button ${activeTab === 'arhivirane-rezervacije' ? 'active' : ''}`}
            onClick={() => handleTabChange('arhivirane-rezervacije')}
          >
            Arhivirane rezervacije
          </button>
        </div>
        <div className="rental-content">
          {activeTab === 'izdate-knjige' && (<RentedBooks data={rents.izdate} />)}

          {activeTab === 'vracene-knjige' && (<ReturnedBooks />)}

          {activeTab === 'knjige-u-prekoracenju' && (<OverdueBooks />)}

          {activeTab === 'aktivne-rezervacije' && (<ActiveReservations />)}

          {activeTab === 'arhivirane-rezervacije' && (<ArchiveReservations />)}
        </div>
      </div>
    )
  )
}

export default RentalEvidention