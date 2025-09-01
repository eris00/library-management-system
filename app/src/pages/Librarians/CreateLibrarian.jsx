import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import LibrarianForm from "./LibrarianForm"; 
import { createNewLibrarian } from "../../api/LibrariansServices"; 
import "./Librarians.css";

const validate = (v) => {
  const e = {};
  if (!v.firstName?.trim()) e.firstName = "Morate unijeti ime!";
  if (!v.lastName?.trim()) e.lastName = "Morate unijeti prezime!";
  if (!v.email?.trim()) e.email = "Morate unijeti email!";
  if (!v.role?.trim()) e.role = "Morate unijeti tip korisnika!";

  if (!v.jmbg?.trim()) {
    e.jmbg = "Morate unijeti JMBG!";
  } else if (!/^\d{13}$/.test(v.jmbg)) {
    e.jmbg = "JMBG mora imati tačno 13 cifara!";
  }

  if (!v.username?.trim()) e.username = "Morate unijeti korisničko ime!";

  if (!v.password) {
    e.password = "Morate unijeti šifru!";
  } else if (v.password.length < 6) {
    e.password = "Šifra mora imati najmanje 6 karaktera!";
  }

  if (!v.confirmPassword) {
    e.confirmPassword = "Morate ponoviti unos šifre!";
  } else if (v.password !== v.confirmPassword) {
    e.confirmPassword = "Šifre se ne poklapaju!";
  }
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
      await createNewLibrarian(formValues);
      toast.success("Bibliotekar je uspješno kreiran!");
      navigate("/librarians");
    } catch (err) {
      setErrors({ global: "Došlo je do greške, pokušajte kasnije." });
    } finally {
      setSubmitting(false);
    }
  };

  return <LibrarianForm onSubmit={handleSubmit} submitting={submitting} errors={errors} />;
}
