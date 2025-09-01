import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditLibrarian = ({ librarians, setLibrarians }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const librarian = librarians.find((l) => l.id === Number(id));

  const [form, setForm] = useState(librarian || {});

  useEffect(() => {
    if (!librarian) {
      toast.error("Bibliotekar nije pronađen!");
      navigate("/librarians");
    }
  }, [librarian, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLibrarians((prev) =>
      prev.map((l) => (l.id === Number(id) ? { ...l, ...form } : l))
    );
    toast.success("Izmene sačuvane!");
    navigate("/librarians");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Izmena bibliotekara</h2>
      <input name="firstName" value={form.firstName || ""} onChange={handleChange} />
      <input name="lastName" value={form.lastName || ""} onChange={handleChange} />
      <input name="email" value={form.email || ""} onChange={handleChange} />
      <input name="role" value={form.role || ""} onChange={handleChange} />
      <button type="submit">Sačuvaj</button>
    </form>
  );
};

export default EditLibrarian;
