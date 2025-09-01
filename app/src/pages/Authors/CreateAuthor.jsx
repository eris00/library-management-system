import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AuthorForm from "./AuthorForm";
import { createNewAuthor } from "../../api/AuthorsServices";
import { toast } from "react-toastify";
import "./Authors.css";

const validate = (v) => {
  const e = {};
  if (!v.name?.trim()) e.name = "Morate unijeti ime!";
  if (!v.surname?.trim()) e.last_name = "Morate unijeti prezime!";
  return e;
};

export default function CreateAuthor() {
  const { setHeaderData } = useOutletContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setHeaderData({
      label: "Novi Autor",
      breadcrumbs: [{ label: "Evidencija autora", to: "/authors" }, { label: "Novi Autor", to: "/add-author" }],
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
      await createNewAuthor(formValues);
      toast.success("Autor je uspješno kreiran!");
      navigate("/authors");
    } catch (err) {
      setErrors({ global: "Došlo je do greške, pokušajte kasnije." });
    } finally {
      setSubmitting(false);
    }
  };

  return <AuthorForm onSubmit={handleSubmit} submitting={submitting} errors={errors} />;
} 