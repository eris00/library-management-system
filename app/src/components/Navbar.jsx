import { useState } from "react";
import { Link } from "react-router-dom"
import { Bell, Plus, User, BookOpen, LibraryBig, PenLine, CircleUserRound, LogOut } from 'lucide-react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import Logo from "../assets/logo.svg"
import UserProfileImgTemp from "../assets/user_profile_temp.jpg"

const Navbar = () => {
  const [anchorAddButton, setAnchorAddButton] = useState(null);
  const [anchorProfileButton, setAnchorProfileButton] = useState(null);
  const openAddButton = Boolean(anchorAddButton);
  const openProfileButton = Boolean(anchorProfileButton)

  const handleOpenAddDropdown = (e) => {
    setAnchorAddButton(e.currentTarget);
  }
  const handleOpenProfileDropdown = (e) => {
    setAnchorProfileButton(e.currentTarget);
  }

  const handleCloseAddeButton = () => {
    setAnchorAddButton(null);
  };
  const handleCloseProfileButton = () => {
    setAnchorProfileButton(null);
  };

  const addOptions = [
    {
      icon: <User className="w-4 h-4 mr-2 text-gray-700" />,
      label: 'Bibliotekar',
      to: '/add-librarian',
    },
    {
      icon: <BookOpen className="w-4 h-4 mr-2 text-gray-700" />,
      label: 'Učenik',
      to: '/add-student',
    },
    {
      icon: <LibraryBig className="w-4 h-4 mr-2 text-gray-700" />,
      label: 'Knjiga',
      to: '/add-book',
    },
    {
      icon: <PenLine className="w-4 h-4 mr-2 text-gray-700" />,
      label: 'Autor',
      to: '/add-author',
    },
  ];

  const profileOptions = [
    {
      icon: <CircleUserRound className="w-4 h-4 mr-2 text-gray-700" />,
      label: 'Profil',
      to: '/profile',
    },
    {
      icon: <LogOut className="w-4 h-4 mr-2 text-gray-700" />,
      label: 'Odjavi se',
      to: '/',
    },
  ];

  return (
    <nav className="bg-primary text-secondary flex items-center justify-between shadow w-full h-14">
      <Link to="/" className="flex flex-row gap-3 items-center justify-center bg-primary-dark h-full px-6">
        <img src={Logo} alt="logo" className="h-10 w-10"/>
        <h1 className="text-md font-bold">Online Biblioteka</h1>
      </Link>

      <div className="flex items-center justify-center flex-row gap-8 px-6">
        <div className="flex items-center  gap-2">
          <Link to="/activities"><Bell className="w-6 h-6 text-secondary"/></Link>
          <div className="h-6 w-px bg-secondary"/>
          <IconButton
            onClick={handleOpenAddDropdown}
            size="small"
            className="hover:bg-white/20 rounded"
          >
            <Plus className="w-6 h-6 text-secondary" />
          </IconButton>
          <Menu
            anchorEl={anchorAddButton}
            open={openAddButton}
            onClose={handleCloseAddeButton}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {addOptions.map(({ icon, label, to }) => (
              <MenuItem
                key={label}
                component={Link}
                to={to}
                onClick={handleCloseAddeButton}
              >
                {icon}
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* will be fetched from RTK */}
          <span className="text-xl mr-2">{"User"}</span>
          <IconButton onClick={handleOpenProfileDropdown} size="small" className="hover:bg-white/20 rounded">
            <img src={UserProfileImgTemp} alt="user image" className="w-10 h-10 rounded-full" />
          </IconButton>
          <Menu
            anchorEl={anchorProfileButton}
            open={openProfileButton}
            onClose={handleCloseProfileButton}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {profileOptions.map(({ icon, label, to }) => (
              <MenuItem
                key={label}
                component={Link}
                to={to}
                onClick={handleCloseProfileButton}
              >
                {icon}
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar