import { BookDown, BookPlus, BookUp, ClipboardMinus, EllipsisVertical, Pen, Trash } from "lucide-react";
import { deleteBook } from "../../../api/BooksServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";

const HeaderActions = ({bookId}) => {

  const navigate = useNavigate();

  const editStudentOptions = [
    {
      icon: <Trash className="navbar__dropdown-icon" />,
      label: 'Izbriši knjigu',
      onClick: async () => { 
        await deleteBook(bookId);
        toast.success("Uspješno ste izbrisali korisnika!");
        navigate("/books");
      },
    },
    {
      icon: <Pen className="navbar__dropdown-icon" />,
      label: 'Izmijeni podatke',
      onClick: async () => { 
        navigate(`/books/edit-book/${bookId}`);
      },
    }
  ]

  return (
        <>
      <button 
        className="student-detail__edit-btn"
        onClick={ () => {console.log("otpisi");
        }}
      >
        <ClipboardMinus className="student-detail__btn" />
        Otpiši knjigu
      </button>
      <button 
        className="student-detail__edit-btn"
        onClick={ () => { navigate(`/books/rent-book/${bookId}`); }}
      >
        <BookPlus className="student-detail__btn" />
        Izdaj knjigu
      </button>
      <button 
        className="student-detail__edit-btn"
        onClick={ () => {console.log("otpisi");
        }}
      >
        <BookDown className="student-detail__btn" />
        Vrati knjigu
      </button>
      <button 
        className="student-detail__edit-btn"
        onClick={ () => { navigate(`/books/reserve-book/${bookId}`); }}
      >
        <BookUp className="student-detail__btn" />
        Rezerviši knjigu
      </button>

      <Dropdown
        trigger={
          <button className="navbar__icon-btn" tabIndex={0}>
            <EllipsisVertical className="navbar__plus-icon" />
          </button>
        }
      >
        {editStudentOptions.map(option => (
          <div className="dropdown__item" onClick={() => option.onClick()} key={option.label}>
            <div className="dropdown__item-content">
              <span className="dropdown__icon">{option.icon}</span>
              <span className="dropdown__label">{option.label}</span>
            </div>
          </div>
        ))}
      </Dropdown>
    </>
  )
}

export default HeaderActions