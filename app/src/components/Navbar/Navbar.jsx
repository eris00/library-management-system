import { Link } from "react-router-dom"
import { Bell, Plus, User, BookOpen, LibraryBig, PenLine, CircleUserRound, LogOut } from 'lucide-react';
import Dropdown from "../ui/Dropdown/Dropdown";
import Logo from "../../assets/logo.svg"
import UserProfileImgTemp from "../../assets/user_profile_temp.jpg"
import './Navbar.css'

const Navbar = () => {
  const addOptions = [
    {
      icon: <User className="navbar__dropdown-icon" />,
      label: 'Bibliotekar',
      to: '/add-librarian',
    },
    {
      icon: <BookOpen className="navbar__dropdown-icon" />,
      label: 'Učenik',
      to: '/add-student',
    },
    {
      icon: <LibraryBig className="navbar__dropdown-icon" />,
      label: 'Knjiga',
      to: '/add-book',
    },
    {
      icon: <PenLine className="navbar__dropdown-icon" />,
      label: 'Autor',
      to: '/add-author',
    },
  ];

  const profileOptions = [
    {
      icon: <CircleUserRound className="navbar__dropdown-icon" />,
      label: 'Profil',
      to: '/profile',
    },
    {
      icon: <LogOut className="navbar__dropdown-icon" />,
      label: 'Odjavi se',
      to: '/',
    },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo-box">
        <img src={Logo} alt="logo" className="navbar__logo-img"/>
        <h1 className="navbar__logo-title">Online Biblioteka</h1>
      </Link>
      <div className="navbar__actions">
        <div className="navbar__notifications">
          <Link to="/activities" className="navbar__icon-btn">
            <Bell className="navbar__bell-icon" />
          </Link>
          <div className="navbar__divider"/>
          <Dropdown
            trigger={
              <button className="navbar__icon-btn" tabIndex={0}>
                <Plus className="navbar__plus-icon" />
              </button>
            }
            options={addOptions}
          />
        </div>
        <div className="navbar__profile">
          <span className="navbar__profile-name">{"User"}</span>
          <Dropdown
            trigger={
              <button className="navbar__icon-btn" tabIndex={0}>
                <img src={UserProfileImgTemp} alt="user" className="navbar__profile-img" />
              </button>
            }
            options={profileOptions}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar