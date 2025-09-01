import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLibrarian, deleteLibrarian } from "../../api/LibrariansServices";
import "./Librarians.css";

const LibrarianDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [librarian, setLibrarian] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const data = await getLibrarian(Number(id));
        setLibrarian(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrarian();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovog bibliotekara?")) {
      await deleteLibrarian(Number(id));
      navigate("/librarians");
    }
  };

  if (loading) return <p>Učitavanje...</p>;
  if (!librarian) return <p>Bibliotekar nije pronađen.</p>;

  return (
    <div className="author-detail">
      <img
        className="author-detail__image"
        src={librarian.photoPath || "https://kadkakozasto.com/wp-content/uploads/2023/01/Kad-Kako-Zasto-37.jpg"}
        alt={`${librarian.name} ${librarian.surname}`}
      />

      <div className="author-detail__section">
        <h4 className="author-detail__label">Ime i Prezime</h4>
        <p className="author-detail__value">{librarian.name} {librarian.surname}</p>
      </div>

      <div className="author-detail__actions">
        <button className="btn-primary" onClick={() => navigate(`/librarians/edit/${id}`)}>Uredi</button>
        <button className="btn-danger" onClick={handleDelete}>Obriši</button>
      </div>
    </div>
  );
};

export default LibrarianDetail;
