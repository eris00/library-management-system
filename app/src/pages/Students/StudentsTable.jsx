import { useState } from 'react';
import "./Students.css";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { BookUser, Pen, Trash, EllipsisVertical  } from 'lucide-react';

const columns = [
  {
    field: 'fullName',
    headerName: 'Ime i Prezime',
    width: 220,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,

  },
  {
    field: 'userType',
    headerName: 'Tip korisnika',
    width: 170,

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
        <RowMenu row={params.row} />
      </div>
    )
  }
];

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

  const handleEdit = () => {
    handleMenuClose();
    navigate(`edit-student/${row.id}`)
  };
  const handleDelete = () => {
    handleMenuClose();
    // open confirmation modal and delete user
  };
    const handleViewDetails = () => {
    handleMenuClose();
    navigate(`student/${row.id}`)
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
        <MenuItem onClick={handleViewDetails}><div className="menu-item__student"><BookUser className='dropdown-icons'/> Pogledaj Detalje</div></MenuItem>
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><Pen className='dropdown-icons'/>Izmijeni</div></MenuItem>
        <MenuItem onClick={handleDelete}><div className="menu-item__student"><Trash className='dropdown-icons'/> Obriši</div></MenuItem>
      </Menu>
    </>
  );
}

const StudentsTable = ({data}) => {

  const dataRows = data.map(row => ({
    id: row.id,
    firstName: row.name,
    lastName: row.surname,
    email: row.email,
    userType: row.role,
  }))

  return (
    <div className='students-table__wrapper'>
      <DataGrid
        rows={dataRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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

export default StudentsTable