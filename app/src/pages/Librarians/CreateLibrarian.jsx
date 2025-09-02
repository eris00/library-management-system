import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import LibrarianForm from "./LibrarianForm"; 
import { createNewLibrarian } from "../../api/LibrariansServices";

const validate = (v) => {
  const e = {};
  if (!v.name?.trim()) e.name = "Morate unijeti ime!";
  if (!v.surname?.trim()) e.surname = "Morate unijeti prezime!";
  if (!v.email?.trim()) e.email = "Morate unijeti email!";
  if (!v.username?.trim()) e.username = "Morate unijeti korisničko ime!";
  if (!v.jmbg) e.jmbg = "Morate unijeti JMBG!";
  else if (v.jmbg.length !== 13) e.jmbg = "Mora imati 13 karaktera!";
  if (!v.password) e.password = "Morate unijeti šifru!";
  else if (v.password.length < 6) e.password = "Šifra mora imati najmanje 6 karaktera!";
  if (!v.confirmPassword) e.confirmPassword = "Morate ponoviti šifru!";
  else if (v.password !== v.confirmPassword) e.confirmPassword = "Šifre se ne poklapaju!";
  return e;
};

export default function CreateLibrarian() {
  const { setHeaderData } = useOutletContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setHeaderData({
      label: "Novi Bibliotekar",
      breadcrumbs: [
        { label: "Evidencija bibliotekara", to: "/librarians" },
        { label: "Novi Bibliotekar", to: "/add-librarian" },
      ],
      actions: null,
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  const handleSubmit = async (formValues) => {
    const val = validate(formValues);
    if (Object.keys(val).length) return setErrors(val);

    setErrors({});
    setSubmitting(true);

    try {
      await createNewLibrarian({
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
        password_confirmation: formValues.confirmPassword, 
        photoPath: formValues.photoPath || "",
        jmbg: formValues.jmbg || "",
      });
      toast.success("Bibliotekar je uspješno kreiran!");
      navigate("/librarians");
    } catch (err) {
        console.error("❌ Backend greška:", err.response?.data || err.message);
        setErrors({ global: "Došlo je do greške, pokušajte kasnije." });
    } finally {
      setSubmitting(false);
    }
  };

  return <LibrarianForm onSubmit={handleSubmit} submitting={submitting} errors={errors} />;
}
