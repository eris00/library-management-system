import { useState } from 'react';
import "./Students.css";
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { BookUser, Pen, Trash, EllipsisVertical  } from 'lucide-react';
import { deleteStudent } from '../../api/UsersServices';
import { toast } from 'react-toastify';

const StudentsTable = ({data, setStudents}) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDeleteStudent = async () => {
    await deleteStudent(selectedStudent.id);
    setStudents(prev =>
      prev.filter(student => student.id !== selectedStudent.id)
    );
    toast.success("Uspješno ste izbrisali korisnika!");
    setShowModal(false);  
  };

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
          <RowMenu
            row={params.row}
            onDelete={() => {
              setSelectedStudent(params.row);
              setShowModal(true);
            }}
          />
        </div>
      ),
    }
  ];

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
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {showModal && selectedStudent && (
        <ConfirmationModal
          title="Izbriši korisnika?"
          text={`Da li ste sigurni da želite da obrišete korisnika "${selectedStudent.firstName} ${selectedStudent.lastName}"?`}
          confirmText="IZBRISI"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDeleteStudent}
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
    navigate(`edit-student/${row.id}`)
  };
  const handleDelete = () => {
    handleMenuClose();
     onDelete();
  };
  const handleViewDetails = () => {
    handleMenuClose();
    navigate(`${row.id}`)
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
        <MenuItem onClick={handleEdit}><div className="menu-item__student"><Pen className='dropdown-icons'/>Izmijeni</div></MenuItem>
        <MenuItem onClick={handleDelete}><div className="menu-item__student"><Trash className='dropdown-icons'/>Obriši</div></MenuItem>
      </Menu>
    </>
  );
}

export default StudentsTable