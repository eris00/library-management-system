import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLibrarian, deleteLibrarian } from "../../api/LibrariansServices";
import "./Librarians.css";

const LibrarianDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [librarian, setLibrarian] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const data = await getLibrarian(id);
        setLibrarian(data);
      } catch (error) {
        console.error("Greška prilikom učitavanja bibliotekara:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrarian();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovog bibliotekara?")) {
      await deleteLibrarian(id);
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
        alt={`${librarian.firstName} ${librarian.lastName}`}
      />

      <div className="author-detail__section">
        <h4 className="author-detail__label">Ime i Prezime</h4>
        <p className="author-detail__value">{librarian.firstName} {librarian.lastName}</p>
      </div>

      <div className="author-detail__section">
        <h4 className="author-detail__label">Email</h4>
        <p className="author-detail__value">{librarian.email}</p>
      </div>

      <div className="author-detail__section">
        <h4 className="author-detail__label">Tip korisnika</h4>
        <p className="author-detail__value">{librarian.role}</p>
      </div>

      <div className="author-detail__section">
        <h4 className="author-detail__label">JMBG</h4>
        <p className="author-detail__value">{librarian.jmbg}</p>
      </div>

      <div className="author-detail__section">
        <h4 className="author-detail__label">Korisničko ime</h4>
        <p className="author-detail__value">{librarian.username}</p>
      </div>

      <div className="author-detail__actions">
        <button className="btn-primary" onClick={() => navigate(`/librarians/edit/${id}`)}>Uredi</button>
        <button className="btn-danger" onClick={handleDelete}>Obriši</button>
      </div>
    </div>
  );
};

export default LibrarianDetails;
