import { LayoutDashboard, Users, GraduationCap, Book, FileText, BookOpen, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


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
    { label: "Izdavanje knjiga", icon: BookOpen, to: "/publishers"  },
  ];

  const bottomItems = [
    { label: "Podešavanja", icon: Settings, isActive: false, to: "/settings"},
  ];

  const MenuItem =({label, icon, to}) => {
    const location = useLocation();
    const IconComponent = icon;
    const isActive = location.pathname === to;

    return (
      <Link 
        to={to}
        className={`
          flex items-center px-5 py-3 cursor-pointer transition-colors
          ${isActive ? 'bg-blue-100 text-primary-dark' : 'text-gray-500 hover:bg-gray-100'}
        `}
    >
      <IconComponent size={20} className="flex-shrink-0" />
      {isExpanded && (
        <span className={`
        ml-3 text-sm font-medium whitespace-nowrap overflow-hidden
        transition-all duration-300 ease-in-out
        ${isExpanded 
          ? 'opacity-100 delay-150 max-w-xs' 
          : 'opacity-0 max-w-0 ml-0'
        }
      `}>
          {label}
        </span> 
      )}
      </Link>
    )
  }

  return (
    <>
      <div className={`
        fixed top-14 left-0 h-[calc(100vh-3rem)] bg-secondary border-r border-gray-200 
        transition-all duration-300 ease-in-out z-50
        ${isExpanded ? 'w-57' : 'w-16'}
      `}>
        {/* Expand button */}
        <div className="flex p-3 border-b border-gray-300">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1 items-start justify-start py-4 space-y-6">
            {topItems.map((item, index) => (
              <MenuItem 
                key={index} 
                icon={item.icon} 
                label={item.label} 
                to={item.to}
              />
            ))}
          </div>
          <div className="pb-4 border-t border-gray-300">
            <div className="flex justify-start pt-4 space-y-2">
              {bottomItems.map((item, index) => (
                <MenuItem 
                  key={index} 
                  icon={item.icon} 
                  label={item.label}
                  to={item.to}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-16 flex-shrink-0"></div>
    </>

  )
}

export default Sidebar