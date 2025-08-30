import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getAuthor, updateAuthor } from "../../api/AuthorsServices";
import "./Authors.css";

const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    name: "",
    surname: "",
    bio: "",
    photo_url: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthor(id);
        setAuthor(data);
      } catch (err) {
        toast.error("Greška pri učitavanju autora");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAuthor(id, author);
      toast.success("Autor je uspješno ažuriran");
      navigate("/authors");
    } catch (err) {
      toast.error("Greška pri ažuriranju autora");
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  return (
    <form className="author-edit" onSubmit={handleSubmit}>
      {/* Slika */}
      <img
        className="author-detail__image"
        src={author.photo_url || author.photoPath || "https://kadkakozasto.com/wp-content/uploads/2023/01/Kad-Kako-Zasto-37.jpg"}
        alt={`${author.name || ""} ${author.surname || ""}`}
      />

      <div className="author-detail__section">
        <label className="author-detail__label">Ime</label>
        <input
          type="text"
          name="name"
          className="author-input"
          value={author.name}
          onChange={handleChange}
        />
      </div>

      <div className="author-detail__section">
        <label className="author-detail__label">Prezime</label>
        <input
          type="text"
          name="surname"
          className="author-input"
          value={author.surname}
          onChange={handleChange}
        />
      </div>

      <div className="author-detail__section">
        <label className="author-detail__label">Opis</label>
        <textarea
          name="bio"
          className="author-textarea"
          rows="4"
          value={author.bio}
          onChange={handleChange}
        />
      </div>

      <div className="author-detail__actions">
        <button type="submit" className="btn-primary">Sačuvaj</button>
        <button type="button" className="btn-danger" onClick={() => navigate("/authors")}>
          Otkaži
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default EditAuthor;
