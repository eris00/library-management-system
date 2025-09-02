import { BookUser, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { formatDuration } from "../../../utils/bookUtils";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";

const OverdueBooks = ({data}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setIsLoading(false);
    }
  }, [data]);
    

  const columns = [
    {
      field: 'bookTitle',
      headerName: 'Naziv knjige',
      width: 220,
    },
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
      field: 'overdueInDays',
      headerName: 'Prekoračenje u danima',
      width: 170,
    },
    {
      field: 'bookHold',
      headerName: 'Trenutno zadržavanje knjige',
      width: 210,
    },
    {
      field: 'librairan',
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

  const dataRows = data?.map(row => ({
    id: row.id,
    bookTitle: row.knjiga.title,
    student: row.student.name + " " + row.student.surname,
    librairan: row.bibliotekar0.name + " " + row.bibliotekar0.surname,
    overdueInDays: row.return_date
    ? Math.max(
        0,
        Math.floor(
          (new Date() - new Date(row.return_date)) / (1000 * 60 * 60 * 24)
        )
      )
    : 0, 
    rentDate: new Date(row.borrow_date).toLocaleDateString("sr-Latn-ME", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }),
    bookHold: formatDuration(row.borrow_date)
  }))

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='rented-table__wrapper'>
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
    </div>
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
        <MenuItem onClick={() => {navigate(`/books/book-detail/${row.id}`)}}><div className="menu-item__student"><BookUser className='dropdown-icons'/>Pogledaj Detalje</div></MenuItem>
        <MenuItem onClick={() => {navigate(`/books/rent-book/${row.id}`)}}><div className="menu-item__student"><BookUser className='dropdown-icons'/>Izdaj Knjigu</div></MenuItem>
        <MenuItem onClick={() => {navigate(`/books/reserve-book/${row.id}`)}}><div className="menu-item__student"><BookUser className='dropdown-icons'/>Rezerviši Knjigu</div></MenuItem>
        <MenuItem onClick={() => {navigate(`/books/writeoff-book/${row.id}`)}}><div className="menu-item__student"><BookUser className='dropdown-icons'/>Otpiši Knjigu</div></MenuItem>
      </Menu>
    </>

  );
}

export default OverdueBooks