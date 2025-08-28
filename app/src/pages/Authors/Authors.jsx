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
  const [openMenuId, setOpenMenuId] = useState(null);

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
      const last = (a.last_name || a.lastName || a.surname || "").toLowerCase();
      const full = `${first} ${last}`.trim();
      return first.includes(q) || last.includes(q) || full.includes(q);
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

      {/* Lista */}
      {loading ? (
        <div className="authors-state">Učitavanje...</div>
      ) : err ? (
        <div className="authors-error">{err}</div>
      ) : (
        <div className="authors-table__wrapper">
          {/* Header */}
          <div className="authors-row authors-row--header">
            <div className="authors-col authors-col--name">
              <input type="checkbox" className="authors-checkbox" />
              <span className="authors-col-title">Naziv autora</span>
            </div>
            <div className="authors-col authors-col--desc">
              <span className="authors-col-title">Opis</span>
            </div>
            <div className="authors-col authors-col--actions"></div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="authors-empty">Nema podataka.</div>
          ) : (
            filtered.map((a) => {
              const first = a.first_name || a.firstName || a.name || "";
              const last = a.last_name || a.lastName || a.surname || "";
             // const bio = a.bio;
              const full =
                `${first} ${last}`.trim() || first || last || "—";

              return (
                <div className="authors-row" key={a.id}>
                  {/* Checkbox + slika + ime */}
                  <div className="authors-col authors-col--name">
                    <input type="checkbox" className="authors-checkbox" />
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
                    <span className="authors-name">{full}</span>
                  </div>

                  {/* Opis */}
                  <div className="authors-col authors-col--desc">
                    {a.description || a.bio || a.about || a.opis || "Lorem Ipsum is simply dummy text ..." }
                  </div>

                  {/* Akcije (3 tačke) */}
                  <div className="authors-col authors-col--actions">
                    <button
                      className="authors-icon-btn"
                      title="Opcije"
                      onClick={() =>
                        setOpenMenuId(openMenuId === a.id ? null : a.id)
                      }
                    >
                      <EllipsisVertical size={18} />
                    </button>

                    {openMenuId === a.id && (
                      <div className="authors-menu">
                        <button
                          onClick={() => navigate(`/authors/${a.id}`)}
                        >
                          <EllipsisVertical size={14} /> Pogledaj detalje
                        </button>
                        <button
                          onClick={() => navigate(`/authors/edit/${a.id}`)}
                        >
                          <Pen size={14} /> Izmijeni autora
                        </button>
                        <button
                          className="danger"
                          onClick={() => handleDelete(a.id)}
                        >
                          <Trash size={14} /> Izbriši autora
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Authors;
