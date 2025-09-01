import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EllipsisVertical, Pen, Trash, Plus, BookUser } from "lucide-react";
import { getAllLibrarians, deleteLibrarian } from "../../api/LibrariansServices";
import "./Librarians.css";

const Librarians = () => {
  const { setHeaderData } = useOutletContext();
  const navigate = useNavigate();

  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    setHeaderData({
      label: "Bibliotekari",
      breadcrumbs: [],
      actions: null,
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  useEffect(() => {
    const fetchLibrarians = async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await getAllLibrarians();
        const filtered = data.filter(u => u.role === "Bibliotekar" || u.role_id === 1);
        setLibrarians(filtered);
      } catch (e) {
        setErr("Došlo je do greške pri učitavanju.");
      } finally {
        setLoading(false);
      }
    };
    fetchLibrarians();
  }, []);

  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase();
    return librarians.filter((a) => `${a.name} ${a.surname}`.toLowerCase().includes(q));
  }, [librarians, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete bibliotekara?")) return;
    try {
      await deleteLibrarian(Number(id));
      setLibrarians(prev => prev.filter(a => a.id !== id));
      toast.success("Bibliotekar je obrisan.");
    } catch (err) {
      toast.error("Došlo je do greške prilikom brisanja.");
    }
  };

  return (
    <div className="authors-page">
      <div className="authors-toolbar">
        <button className="authors-btn__primary" onClick={() => navigate("/add-librarian")}>
          <Plus size={18} /> <span>NOVI BIBLIOTEKAR</span>
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

      {loading ? (
        <div className="authors-state">Učitavanje...</div>
      ) : err ? (
        <div className="authors-error">{err}</div>
      ) : filtered.length === 0 ? (
        <div className="authors-empty">Nema podataka.</div>
      ) : (
        <div className="authors-table__wrapper">
          <div className="authors-row authors-row--header">
            <div className="authors-col authors-col--name"><span className="authors-col-title">Ime i prezime</span></div>
            <div className="authors-col authors-col--desc"><span className="authors-col-title">Email</span></div>
            <div className="authors-col authors-col--desc"><span className="authors-col-title">Tip korisnika</span></div>
            <div className="authors-col authors-col--actions"></div>
          </div>

          {filtered.map(a => (
            <div className="authors-row" key={a.id}>
              <div className="authors-col authors-col--name">
                {a.photoPath ? (
                  <img className="authors-avatar" src={a.photoPath} alt={a.name} />
                ) : (
                  <div className="authors-avatar--placeholder"><BookUser size={16} /></div>
                )}
                <span className="authors-name">{a.name} {a.surname}</span>
              </div>

              <div className="authors-col authors-col--desc">{a.email}</div>
              <div className="authors-col authors-col--desc">{a.role}</div>

              <div className="authors-col authors-col--actions">
                <button className="authors-icon-btn" onClick={() => setOpenMenuId(openMenuId === a.id ? null : a.id)}>
                  <EllipsisVertical size={18} />
                </button>

                {openMenuId === a.id && (
                  <div className="authors-menu">
                    <button onClick={() => navigate(`/librarians/${a.id}`)}>Pogledaj detalje</button>
                    <button onClick={() => navigate(`/librarians/edit/${a.id}`)}><Pen size={14} /> Izmijeni</button>
                    <button className="danger" onClick={() => handleDelete(a.id)}><Trash size={14} /> Izbriši</button>
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
