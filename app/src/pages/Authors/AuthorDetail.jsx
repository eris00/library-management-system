import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthor, deleteAuthor } from "../../api/AuthorsServices";
import "./Authors.css";

const AuthorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthor(id);
        console.log("API autor:", data); 
        setAuthor(data);
      } catch (error) {
        console.error("Greška prilikom učitavanja autora:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovog autora?")) {
      await deleteAuthor(id);
      navigate("/authors");
    }
  };

  if (loading) return <p>Učitavanje...</p>;
  if (!author) return <p>Autor nije pronađen.</p>;

  return (
    <div className="author-detail">
      <img
        className="author-detail__image"
        src={author.photo_url || author.photoPath || "https://kadkakozasto.com/wp-content/uploads/2023/01/Kad-Kako-Zasto-37.jpg"}
        alt={`${author.name || ""} ${author.surname || ""}`}
      />

      <div className="author-detail__section">
        <h4 className="author-detail__label">Ime i Prezime</h4>
        <p className="author-detail__value">
          {author.name} {author.surname}
        </p>
      </div>

      <div className="author-detail__section">
        <h4 className="author-detail__label">Opis</h4>
        <p className="author-detail__value">{author.bio}</p>
      </div>

      <div className="author-detail__actions">
        <button className="btn-primary" onClick={() => navigate(`/authors/edit/${id}`)}>Uredi</button>
        <button className="btn-danger"  onClick={handleDelete}>Obriši</button>
      </div>
    </div>
  );
};

export default AuthorDetail;
