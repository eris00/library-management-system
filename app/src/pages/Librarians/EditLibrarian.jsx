import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LibrarianForm from "./LibrarianForm"; 
import { updateLibrarian, getLibrarian } from "../../api/LibrariansServices";

export default function EditLibrarian() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const data = await getLibrarian(Number(id));
        if (!data) throw new Error("Bibliotekar nije pronađen");
        setForm({
          name: data.name,
          surname: data.surname,
          email: data.email,
          username: data.username,
          photoPath: data.photoPath || "",
          jmbg: data.jmbg || "",
        });
      } catch (err) {
        toast.error("Bibliotekar nije pronađen!");
        navigate("/librarians");
      } finally {
        setLoading(false);
      }
    };
    fetchLibrarian();
  }, [id, navigate]);

  const handleSubmit = async (formValues) => {
    setSubmitting(true);
    try {
      await updateLibrarian(Number(id), {
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email,
        username: formValues.username,
        photoPath: formValues.photoPath,
        jmbg: formValues.jmbg,
      });
      toast.success("Izmjene sačuvane!");
      navigate("/librarians");
    } catch (err) {
      toast.error("Došlo je do greške prilikom čuvanja.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  return (
    <LibrarianForm
      initialValues={form}
      onSubmit={handleSubmit}
      submitting={submitting}
      errors={errors}
    />
  );
}
