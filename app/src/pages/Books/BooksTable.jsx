import { useState } from 'react';
import "./Books.css";
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { BookUser, Pen, Trash, EllipsisVertical, ClipboardMinus, BookPlus, BookDown, BookUp } from 'lucide-react';
import { deleteBook } from '../../api/BooksServices';
import { toast } from 'react-toastify';

const BooksTable = ({data, setBooks}) => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalErrorText, setModalErrorText] = useState("");

  const handleDeleteBook = async () => {
    try {
      await deleteBook(selectedBook.id);
      setBooks(prev =>
        prev.filter(book => book.id !== selectedBook.id)
      );
      toast.success("Uspješno ste izbrisali knjigu!");
      setShowModal(false); 
    } catch (error) {
      console.log("catch err: ", error.response.data.data.errors);
      setModalErrorText(error.response.data.data.errors)
    }
 
  };

  const columns = [
    {
      field: 'bookTitle',
      headerName: 'Naziv knjige',
      width: 220,
    },
    {
      field: 'authors',
      headerName: 'Autori',
      width: 250,

    },
    {
      field: 'category',
      headerName: 'Kategorija',
      width: 170,
    },
    {
      field: 'fSamples',
      headerName: 'Na raspolaganju',
      width: 120,
    },
    {
      field: 'rSamples',
      headerName: 'Rezervisano',
      width: 120,
    },
    {
      field: 'bSamples',
      headerName: 'Izdato',
      width: 120,
    },
    {
      field: 'inExcess',
      headerName: 'U prekoračenju',
      width: 120,
    },
    {
      field: 'totalSamples',
      headerName: 'Ukupna količna',
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
            onDelete={() => {
              setSelectedBook(params.row);
              setShowModal(true);
            }}
          />
        </div>
      ),
    }
  ];

  const dataRows = data.map(row => ({
    id: row.id,
    bookTitle: row.title,
    authors: row.authors.map(author => author.name + " " + author.surname).join(", "),
    category: row.categories.map(category => category.name).join(", "),
    fSamples: row.fSamples,
    rSamples: row.rSamples,
    bSamples: row.bSamples,
    totalSamples: row.samples
  }))

  return (
    <div className='books-table__wrapper'>
      <DataGrid
        rows={dataRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {showModal && selectedBook && (
        <ConfirmationModal
          title="Izbriši korisnika?"
          text={`Da li ste sigurni da želite da obrišete knjigu "${selectedBook.bookTitle}"?`}
          confirmText="IZBRIŠI"
          onCancel={() => {setShowModal(false), setModalErrorText("")}}
          onConfirm={handleDeleteBook}
          errorText={modalErrorText}
        />
      )}
    </div>
  )
}

const RowMenu = ({ row, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    navigate(`edit-book/${row.id}`)
  };
  const handleDelete = () => {
    handleMenuClose();
     onDelete();
  };
  const handleViewDetails = () => {
    handleMenuClose();
    navigate(`book-detail/${row.id}`)
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
        <MenuItem onClick={handleViewDetails}><div className="menu-item__student"><BookUser className='dropdown-icons'/>Pogledaj Detalje</div></MenuItem>
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><Pen className='dropdown-icons'/>Izmijeni knjigu</div></MenuItem>
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><ClipboardMinus className='dropdown-icons'/>Otpiši</div></MenuItem>
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><BookPlus className='dropdown-icons'/>Izdaj</div></MenuItem>
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><BookDown className='dropdown-icons'/>Vrati</div></MenuItem>
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><BookUp className='dropdown-icons'/>Rezerviši</div></MenuItem>
        <MenuItem onClick={handleDelete}><div className="menu-item__student"><Trash className='dropdown-icons'/>Obriši knjigu</div></MenuItem>
      </Menu>
    </>
  );
}

export default BooksTable