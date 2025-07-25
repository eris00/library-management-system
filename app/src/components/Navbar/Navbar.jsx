import { Link } from "react-router-dom"
import { Bell, Plus, User, BookOpen, LibraryBig, PenLine, CircleUserRound, LogOut } from 'lucide-react';
import Dropdown from "../ui/Dropdown/Dropdown";
import Logo from "../../assets/logo.svg"
import UserProfileImgTemp from "../../assets/user_profile_temp.jpg"
import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

  const navigate = useNavigate();

  const addOptions = [

    {
      icon: <User className="navbar__dropdown-icon" />,
      label: 'Bibliotekar',
      onClick: () => navigate("/librarion"),
    },
    {
      icon: <BookOpen className="navbar__dropdown-icon" />,
      label: 'Učenik',
      onClick: () => navigate("/create-student"),
    },
    {
      icon: <LibraryBig className="navbar__dropdown-icon" />,
      label: 'Knjiga',
      onClick: () => navigate("/create-book"),
    },
    {
      icon: <PenLine className="navbar__dropdown-icon" />,
      label: 'Autor',
      onClick: () => navigate("/create-author"),
    },
  ];

  const profileOptions = [
    {
      icon: <CircleUserRound className="navbar__dropdown-icon" />,
      label: 'Profil',
      onClick: () => navigate("/profile"),
    },
    {
      icon: <LogOut className="navbar__dropdown-icon" />,
      label: 'Odjavi se',
      onClick: () => navigate("/login"), // handle logout here
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
          >
            {addOptions.map(option => (
              <div className="dropdown__item" onClick={() => option.onClick()} key={option.label}>
                <div className="dropdown__item-content">
                  <span className="dropdown__icon">{option.icon}</span>
                  <span className="dropdown__label">{option.label}</span>
                </div>
              </div>
            ))}
          </Dropdown>
        </div>
        <div className="navbar__profile">
          <span className="navbar__profile-name">{"User"}</span>
          <Dropdown
            trigger={
              <button className="navbar__icon-btn" tabIndex={0}>
                <img src={UserProfileImgTemp} alt="user" className="navbar__profile-img" />
              </button>
            }
          >
            {profileOptions.map(option => (
              <div className="dropdown__item" onClick={() => option.onClick()} key={option.label}>
                <div className="dropdown__item-content">
                  <span className="dropdown__icon">{option.icon}</span>
                  <span className="dropdown__label">{option.label}</span>
                </div>
              </div>
            ))}
          </Dropdown>
        </div>
      </div>
    </nav>
  )
}

export default Navbar