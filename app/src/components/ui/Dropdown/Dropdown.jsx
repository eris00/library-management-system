import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

const Dropdown = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

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

  const handleTriggerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;