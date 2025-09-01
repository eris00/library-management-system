import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EllipsisVertical, Pen, Trash, Plus, BookUser } from "lucide-react";
import "./Librarians.css";


const Librarians = () => {
  const { setHeaderData } = useOutletContext();
  const navigate = useNavigate();

    // Header
  useEffect(() => {
    setHeaderData({
      label: "Bibliotekari",
      breadcrumbs: [],
      actions: null,
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  // Dummy podaci (startni bibliotekari)
const dummyData = [
  { id: 1, firstName: "Ana", lastName: "Anić", email: "ana@lib.com", role: "Admin", photoPath: "" },
  { id: 2, firstName: "Marko", lastName: "Markić", email: "marko@lib.com", role: "Bibliotekar", photoPath: "" },
  { id: 3, firstName: "Lana", lastName: "Lakić", email: "lana@lib.com", role: "Bibliotekar", photoPath: "" },
  { id: 4, firstName: "Hana", lastName: "Marić", email: "Hana@lib.com", role: "Bibliotekar", photoPath: "" }


];

  // State
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // "Fetch" simulacija
  useEffect(() => {
    setLoading(true);
    setErr(null);

    setTimeout(() => {
      try {
        setLibrarians(dummyData);
      } catch (e) {
        setErr("Došlo je do greške pri učitavanju.");
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  // Search
  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase();
    return librarians.filter((a) => {
      const full = `${a.firstName} ${a.lastName}`.toLowerCase();
      return full.includes(q);
    });
  }, [librarians, search]);

  // Delete
  const handleDelete = (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete bibliotekara?")) return;
    setLibrarians((prev) => prev.filter((a) => a.id !== id));
    toast.success("Bibliotekar je obrisan.");
  };

  return (
    <div className="authors-page">
      {/* Toolbar */}
      <div className="authors-toolbar">
        <button
          className="authors-btn__primary"
          onClick={() => navigate("/add-librarian")}
        >
          <Plus size={18} />
          <span>NOVI BIBLIOTEKAR</span>
        </button>

        <div className="authors-search">
          <input
            className="authors-search__input"
            type="text"
            placeholder="Pretraži..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="authors-state">Učitavanje...</div>
      ) : err ? (
        <div className="authors-error">{err}</div>
      ) : filtered.length === 0 ? (
        <div className="authors-empty">Nema podataka.</div>
      ) : (
        <div className="authors-table__wrapper">
          {/* Header */}
          <div className="authors-row authors-row--header">
            <div className="authors-col authors-col--name">
              <span className="authors-col-title">Ime i prezime</span>
            </div>
            <div className="authors-col authors-col--desc">
              <span className="authors-col-title">Email</span>
            </div>
            
            <div className="authors-col authors-col--desc">
              <span className="authors-col-title">Tip korisnika</span>
            </div>
            <div className="authors-col authors-col--actions"></div>
          </div>

          {/* Rows */}
          {filtered.map((a) => (
            <div className="authors-row" key={a.id}>
              <div className="authors-col authors-col--name">
                {a.photoPath ? (
                  <img className="authors-avatar" src={a.photoPath} alt={a.firstName} />
                ) : (
                  <div className="authors-avatar--placeholder">
                    <BookUser size={16} />
                  </div>
                )}
                <span className="authors-name">{a.firstName} {a.lastName}</span>
              </div>

              <div className="authors-col authors-col--desc">{a.email}</div>
              <div className="authors-col authors-col--desc">{a.role}</div>

              <div className="authors-col authors-col--actions">
                <button
                  className="authors-icon-btn"
                  onClick={() => setOpenMenuId(openMenuId === a.id ? null : a.id)}
                >
                  <EllipsisVertical size={18} />
                </button>

                {openMenuId === a.id && (
                  <div className="authors-menu">
                    <button onClick={() => navigate(`/librarians/${a.id}`)}>
                      Pogledaj detalje
                    </button>
                    <button onClick={() => navigate(`/librarians/edit/${a.id}`)}>
                      <Pen size={14} /> Izmijeni
                    </button>
                    <button className="danger" onClick={() => handleDelete(a.id)}>
                      <Trash size={14} /> Izbriši
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Librarians;
