import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthorForm from "./AuthorForm";
import { getAuthorById, updateAuthor } from "../../api/AuthorsServices";
import "./Authors.css";

const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    name: "",
    surname: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(id);
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
    <div className="authors-edit">
      <h2>Izmjena autora</h2>
      <AuthorForm author={author} onChange={handleChange} onSubmit={handleSubmit} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditAuthor;
