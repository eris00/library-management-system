import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../../../api/BooksServices';
import useHeaderData from '../../../hooks/useHeaderData';
import HeaderActions from '../BookDetail/HeaderActions';
import { getAllBorrowings, writeOffBook } from '../../../api/BorrowBookServices';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import { formatDuration } from "../../../utils/bookUtils";
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BookDown, BookUser, EllipsisVertical, X } from 'lucide-react';
import "./BookActions.css";
import { toast } from 'react-toastify';

const WriteOffBook = () => {

  const { bookId } = useParams();
  const { setHeaderData } = useHeaderData();

  // Fetch book
  const [bookData, setBookData] = useState(null);
  const [fetchBookError, setFetchBookError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    setFetchBookError(null);
    getBookById(bookId, { signal: controller.signal })
      .then(data => {        
        setBookData(data);
      })
      .catch((err) => {
        setBookData(null);
        if (err.name !== "AbortError") setErrors(err.message);
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
        {label:"Otpiši knjigu", to: `/books/writeoff-book/${bookId}`}
      ],
      actions: (
        <HeaderActions bookId={bookId} />
      ) 
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, bookId, bookData?.title]);

  const [fetchAllEvidentionError, setFetchAllEvidentionError] = useState(null);
  const [fetchAllEvidentionLoading, setFetchAllEvidentionLoading] = useState(true);
  const [borrowings, setBorrowings] = useState(null);

  useEffect(() => {
      const controller = new AbortController();
  
      setFetchAllEvidentionLoading(true);
      setFetchAllEvidentionError(null);
  
      getAllBorrowings({ signal: controller.signal })
        .then(data => {
          if (!data) return;
          const combined = [...(data.izdate || []), ...(data.prekoracene || [])];
          setBorrowings(combined);
        })
        .catch((err) => {
          if (err.name !== "AbortError") setFetchAllEvidentionError(err.message);
        })
        .finally(() => {
          setFetchAllEvidentionLoading(false);
        });
  
      return () => controller.abort();
    }, []);  

      // User Table
      const [rowSelectionModel, setRowSelectionModel] = useState([]);

      const columns = [
      {
        field: 'student',
        headerName: 'Izdato učeniku',
        width: 250,

      },
      {
        field: 'rentDate',
        headerName: 'Datum izdavanja',
        width: 170,
      },
      {
        field: 'bookHold',
        headerName: 'Trenutno zadržavanje knjige',
        width: 210,
      },
      {
        field: 'librarian',
        headerName: 'Knjigu izdao',
        width: 120,
      },
      {
        field: 'actions',
        headerName: '',
        flex: 1, 
        minWidth: 60,
        sortable: false,
        filterable: false,
        disableExport: true,

        renderCell: (params) => (
          <div className='actions-cell'>
            <RowMenu
              row={params.row}
            />
          </div>
        ),
      }
    ];

    // WriteOff Book POST request
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleWriteOffBook = async () => {
      setSubmitting(true);

      try {
        const selectedId = [...rowSelectionModel.ids][0]; 
        await writeOffBook(selectedId);
        toast.success("Uspješno ste otpisali knjigu!");
        navigate(`/books/book-detail/${bookId}`);
      } catch (err) {    
        console.log("is err: ", err);
      } finally {
        setSubmitting(false);
      } 
    }

    const [gridKey, setGridKey] = useState(0);
    const handleCancel = () => {
      setGridKey(prev => prev + 1); 
      setRowSelectionModel(null);
    }

  const dataRows = (borrowings || []).map(row => ({
    id: row.id ?? "",
    student: row.student ? `${row.student.name} ${row.student.surname}` : "N/A",
    librarian: row.bibliotekar0 
      ? `${row.bibliotekar0.name} ${row.bibliotekar0.surname}` 
      : "N/A",
    rentDate: row.borrow_date
      ? new Date(row.borrow_date).toLocaleDateString("sr-Latn-ME", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      : "—",
    bookHold: row.borrow_date ? formatDuration(row.borrow_date) : "—"
  }));

    

    return (
      fetchAllEvidentionLoading ? (
        <LoadingSpinner />
      ) : fetchAllEvidentionError && fetchBookError && errors ? (
        <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
      ) : (
        <div className='writeoff-wrapper'>
          <div className='writeoff-table__wrapper'>
            <DataGrid 
              rows={dataRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              key={gridKey}
              pageSizeOptions={[5]}
              checkboxSelection
              disableMultipleRowSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {                
                setRowSelectionModel(newSelection);
              }}
            />
          </div>
          <div className="form-buttons">
              <button className="save-btn" onClick={handleWriteOffBook} disabled={!rowSelectionModel || submitting}>
                <BookDown /> OTPIŠI KNJIGU
              </button>
              <button className="cancel-btn" onClick={ handleCancel }>
                <X/> PONIŠTI
              </button>
            </div>
        </div>
      )
    )
  }

  const RowMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleViewDetails = () => {
      handleMenuClose();
      navigate(`/student-detail/${row.id}`)
    };

    return (
      <>
        <button onClick={handleMenuOpen} className='elipsis-button__wrapper'>
          <EllipsisVertical className='elipsis-button__student' />
        </button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={handleViewDetails}><div className="menu-item__student"><BookUser className='dropdown-icons'/>Detalji studenta</div></MenuItem>
        </Menu>
      </>
    );
  }

export default WriteOffBook