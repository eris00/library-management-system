import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthor as getAuthorById, deleteAuthor } from "../../services/AuthorsServices";
import "./Authors.css";

const AuthorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(id);
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
      <h2>{author.firstName} {author.lastName}</h2>
      <p><strong>Datum rođenja:</strong> {author.birthDate}</p>
      <p><strong>Biografija:</strong> {author.biography}</p>

      <div className="author-detail__actions">
        <button className="btn-primary" onClick={() => navigate(`/authors/edit/${id}`)}>Uredi</button>
        <button className="btn-danger" onClick={handleDelete}>Obriši</button>
      </div>
    </div>
  );
};

export default AuthorDetail;
