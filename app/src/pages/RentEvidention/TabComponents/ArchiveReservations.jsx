import { BookUser, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { formatDuration } from "../../../utils/bookUtils";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";


const ArchiveReservations = ({data}) => {
     const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setIsLoading(false);
    }
  }, [data]);

  console.log("dd: ", data);
  
    

  const columns = [
    {
      field: 'bookTitle',
      headerName: 'Naziv knjige',
      width: 220,
    },
    {
      field: 'rentDate',
      headerName: 'Datum rezervacije',
      width: 170,
    },
        {
      field: 'expireDate',
      headerName: 'Rezervacija ističe',
      width: 170,
    },
    {
      field: 'student',
      headerName: 'Rezervaciju podnio',
      width: 250,

    },
        {
      field: 'status',
      headerName: 'Status',
      width: 250,

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
    expireDate: row.action_date ? new Date(row.action_date).toLocaleDateString("sr-Latn-ME") : "—",
    librairan: row.bibliotekar0.name + " " + row.bibliotekar0.surname,
    status: row.status,
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
      </Menu>
    </>

  );
}

export default ArchiveReservations