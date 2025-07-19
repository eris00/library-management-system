import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

const Dropdown = ({ trigger, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Klik van dropdown-a zatvara meni
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [open]);

  // Otvaranje/zatvaranje na klik
  const handleTriggerClick = (e) => {
    e.preventDefault();
    setOpen((v) => !v);
  };

    return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className="dropdown__trigger"
        onClick={handleTriggerClick}
        tabIndex={0}
      >
        {trigger}
      </div>
      {open && (
        <div className="dropdown__menu">
          {options.map(({ icon, label, to }, idx) => (
            <Link
              to={to}
              className="dropdown__item"
              key={idx}
              tabIndex={0}
              onClick={() => setOpen(false)}
            >
              <span className="dropdown__icon">{icon}</span>
              <span className="dropdown__label">{label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;