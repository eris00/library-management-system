import { LayoutDashboard, Users, GraduationCap, Book, FileText, BookOpen, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  }

  const topItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Bibliotekari", icon: Users, to: "/librarians"  },
    { label: "Učenici", icon: GraduationCap, to: "/students"  },
    { label: "Knjige", icon: Book, to: "/books"  },
    { label: "Autori", icon: FileText, to: "/authors"  },
    { label: "Izdavanje knjiga", icon: BookOpen, to: "/rent-evidentions"  },
  ];

  const bottomItems = [
    { label: "Podešavanja", icon: Settings, isActive: false, to: "/"},
  ];

  const MenuItem =({label, icon, to}) => {
    const location = useLocation();
    const IconComponent = icon;
    const isActive = location.pathname === to;

    return (
    <Link
      to={to}
      className={`sidebar__menu-item${isActive ? " sidebar__menu-item--active" : ""}`}
    >
      <IconComponent size={27} className="sidebar__icon" />
      <span
        className={`sidebar__label${isExpanded ? " sidebar__label--expanded" : ""}`}
        style={{
          maxWidth: isExpanded ? "140px" : "0",
          opacity: isExpanded ? 1 : 0,
          marginLeft: isExpanded ? "12px" : "0",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)"
        }}
      >
        {label}
      </span>
    </Link>
  );
  }

    return (
    <>
      <aside className={`sidebar${isExpanded ? " sidebar--expanded" : ""}`}>
        {/* Expand/Collapse button */}
        <div className="sidebar__expand-btn-container">
          <button
            onClick={toggleSidebar}
            className="sidebar__expand-btn"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
        {/* Sidebar Content */}
        <div className="sidebar__content">
          <div className="sidebar__top-items">
            {topItems.map((item, index) => (
              <MenuItem
                key={index}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isExpanded={isExpanded}
              />
            ))}
          </div>
          <div className="sidebar__bottom-items">
            {bottomItems.map((item, index) => (
              <MenuItem
                key={index}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar