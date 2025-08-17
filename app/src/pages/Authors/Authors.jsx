import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getAllAuthors, deleteAuthor } from "../../api/AuthorsServices";
import "./Authors.css";
import { toast } from "react-toastify";
import { EllipsisVertical, Pen, Trash, Plus, BookUser } from "lucide-react";

const Authors = () => {
  const { setHeaderData } = useOutletContext();
  const navigate = useNavigate();

  // Header 
  useEffect(() => {
    setHeaderData({
      label: "Autori",
      breadcrumbs: [],
      actions: null,
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);


  // State
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch
  useEffect(() => {
  setLoading(true);
  setErr(null);

  getAllAuthors()
    .then((authors) => {
      console.log("Dobijeni autori:", authors);
      setAuthors(authors);
    })
    .catch((e) => {
      console.error("Greška pri fetch-u autora:", e);
      setErr("Došlo je do greške, pokušajte kasnije.");
    })
    .finally(() => setLoading(false));
}, []);


  // Search 
  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase();
    return authors.filter((a) => {
      const first = (a.first_name || a.firstName || a.name || "").toLowerCase();
      const last  = (a.last_name  || a.lastName  || a.surname || "").toLowerCase();
      const full  = `${first} ${last}`.trim();
      return (
        first.includes(q) ||
        last.includes(q) ||
        full.includes(q)
      );
    });
  }, [authors, search]);

  // Handleri
  const handleDelete = async (id) => {
    if (!confirm("Da li ste sigurni da želite da obrišete autora?")) return;
    try {
      await deleteAuthor(id);
      setAuthors((prev) => prev.filter((a) => a.id !== id));
      toast.success("Autor je uspješno izbrisan.");
    } catch {
      toast.error("Brisanje nije uspjelo.");
    }
  };

  return (
    <div className="authors-page">
      {/* Toolbar: + NOVI AUTOR i pretraga */}
      <div className="authors-toolbar">
        <button
          className="authors-btn__primary"
          onClick={() => navigate("/add-author")}
          aria-label="Dodaj novog autora"
        >
          <Plus size={18} />
          <span>NOVI AUTOR</span>
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

      {/* Tabela / state */}
      {loading ? (
        <div className="authors-state">Učitavanje...</div>
      ) : err ? (
        <div className="authors-error">{err}</div>
      ) : (
        <div className="authors-table__wrapper">
          <table className="authors-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ime i prezime</th>
                <th>Opis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="authors-empty">Nema podataka.</td>
                </tr>
              ) : (
                filtered.map((a) => {
                  const first = a.first_name || a.firstName || a.name || "";
                  const last  = a.last_name  || a.lastName  || a.surname || "";
                  const full  = `${first} ${last}`.trim() || first || last || "—";
                  return (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td className="authors-name-cell">
                        {a.photoPath || a.photo_url ? (
                          <img
                            className="authors-avatar"
                            src={a.photoPath || a.photo_url}
                            alt={full}
                          />
                        ) : (
                          <div className="authors-avatar--placeholder">
                            <BookUser size={16} />
                          </div>
                        )}
                        <span>{full}</span>
                      </td>
                      <td>{a.email || "—"}</td>
                      <td className="authors-actions">
                        <button
                          className="authors-icon-btn"
                          title="Detalji"
                          onClick={() => navigate(`/authors/${a.id}`)}
                        >
                          <EllipsisVertical size={18} />
                        </button>
                        <button
                          className="authors-icon-btn"
                          title="Izmijeni"
                          onClick={() => navigate(`/authors/edit/${a.id}`)}
                        >
                          <Pen size={18} />
                        </button>
                        <button
                          className="authors-icon-btn danger"
                          title="Obriši"
                          onClick={() => handleDelete(a.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Authors;
