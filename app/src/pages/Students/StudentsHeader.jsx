import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentsHeader = ({search, setSearch}) => {

  return (
    <div className='student-header__wrapper'>
      <Link to="/create-student" className="student-header__btn">
        + novi učenik
      </Link>
      <div className="student-header__input-wrapper">
        <input
          className="student-header__input"
          type="text"
          placeholder="Pretraži..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="student-header__icon" size={18} />
      </div>
    </div>
  )
}

export default StudentsHeader