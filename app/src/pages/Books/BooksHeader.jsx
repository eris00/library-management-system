import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const BooksHeader = ({search, setSearch}) => {

  return (
    <div className='book-header__wrapper'>
      <Link to="/create-book" className="book-header__btn">
        + nova knjiga
      </Link>
      <div className="student-book__input-wrapper">
        <input
          className="book-header__input"
          type="text"
          placeholder="Pretraži..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="book-header__icon" size={18} />
      </div>
    </div>
  )
}

export default BooksHeader