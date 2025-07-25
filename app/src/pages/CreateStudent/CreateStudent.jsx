import { useEffect, useState } from 'react'
import "./CreateStudent.css";
import useHeaderData from '../../hooks/useHeaderData';
import { X, Check, Eye, EyeOff } from 'lucide-react';
import { createNewStudent } from '../../api/UsersServices';
import { toast } from "react-toastify";

const CreateStudent = () => {

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Novi Učenik",
      breadcrumbs: [
        {label:"Svi učenici", to: "/students"},
        {label:"Novi učenik", to: "/create-student"}
      ]
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    photoPath: "",
    role_id: 2
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const validate = () => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^https?:\/\/[^\s]+$/i;

  if (!form.photoPath.trim()) newErrors.photoPath = "Morate unijeti url fotografije!";
  else if (!urlRegex.test(form.photoPath)) newErrors.photoPath = "Unesite validan URL (npr. http://...)!";
  if (!form.name.trim()) newErrors.name = "Morate unijeti ime!";
  if (!form.surname.trim()) newErrors.surname = "Morate unijeti prezime!";
  if (!form.jmbg.trim()) newErrors.jmbg = "Morate unijeti JMBG!";
  else if (form.jmbg.length !== 13) newErrors.jmbg = "JMBG mora sadržati tačno 13 brojeva";
  if (!form.email.trim()) newErrors.email = "Morate unijeti email!";
  else if (!emailRegex.test(form.email)) newErrors.email = "Unesite email u ispravnom formatu";

  if (!form.username.trim()) newErrors.username = "Morate unijeti korisničko ime!";
  if (!form.password.trim()) newErrors.password = "Morate unijeti šifru!";
  else if (form.password.length < 8) newErrors.password = "Šifra mora imati bar 8 karaktera!";

  if (!form.password_confirmation.trim()) newErrors.password_confirmation = "Morate ponovo unijeti šifru!";
  if (form.password && form.password_confirmation && form.password !== form.password_confirmation) {
    newErrors.password_confirmation = "Šifre se ne poklapaju!";
  }

  return newErrors;
};

  const handleSubmit = async (e) => {    
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await createNewStudent(form);
      toast.success("Uspješno ste dodali novog učenika!");
    } catch (err) {
      if (
        err.response &&
        err.response.status === 422 &&
        err.response.data &&
        err.response.data.data
      ) {
        const serverErrors = err.response.data.data;
        const mappedErrors = {};
        for (const key in serverErrors) {
          if (Array.isArray(serverErrors[key])) {
            mappedErrors[key] = serverErrors[key][0];
          } else {
            mappedErrors[key] = serverErrors[key];
          }
        }
        setErrors(mappedErrors);
      } else {
        setErrors({ global: "Došlo je do greške, pokušajte kasnije!" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: "",
      surname: "",
      jmbg: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      photoPath: "",
      role_id: 2
    });
  }

  return (
    <form className="create-student-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <input
          name="photoPath"
          className="form-input"
          placeholder="Unesite url fotografije"
          value={form.photoPath}
          onChange={handleChange}
        />
        {errors.photoPath && <div className="input-error">{errors.photoPath}</div>}
      </div>
      
      <div>
        <input
          name="name"
          className="form-input"
          placeholder="Unesite Ime.."
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="input-error">{errors.name}</div>}
      </div>
      <div>
        <input
          name="surname"
          className="form-input"
          placeholder="Unesite Prezime.."
          value={form.surname}
          onChange={handleChange}
        />
        {errors.surname && <div className="input-error">{errors.surname}</div>}
      </div>
      <div>
        {/* Select role */}
        <select name="role_id" className="form-input" value={form.role_id} disabled>
          <option value={2}>Učenik</option> {/** value={2} - student */}
        </select>
      </div>
      <div>
        <input
          name="jmbg"
          className="form-input"
          placeholder="Unesite JMBG.."
          value={form.jmbg}
          onChange={handleChange}
        />
        {errors.jmbg && <div className="input-error">{errors.jmbg}</div>}
      </div>
      <div>
        <input
          name="email"
          className="form-input"
          placeholder="Unesite E-mail.."
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="input-error">{errors.email}</div>}
      </div>
      <div>
        <input
          name="username"
          className="form-input"
          placeholder="Unesite korisnicko ime.."
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <div className="input-error">{errors.username}</div>}
      </div>
      <div className='input-password-wrapper'>
        <div className="input-row">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-input"
            placeholder="Unesite zelјenu sifru.."
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="eye-toggle-btn"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show Password"}
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>
        {errors.password && <div className="input-error">{errors.password}</div>}
      </div>
      <div className='input-password-wrapper'>
        <div className="input-row">
          <input
            name="password_confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            className="form-input"
            placeholder="Ponovo unesite sifru.."
            value={form.password_confirmation}
            onChange={handleChange}
          />
          <button
            type="button"
            className="eye-toggle-btn"
            tabIndex={-1}
            onClick={() => setShowPasswordConfirmation(v => !v)}
            aria-label={showPasswordConfirmation ? "Hide password" : "Show Password"}
          >
            {showPasswordConfirmation ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>
        {errors.password_confirmation && <div className="input-error">{errors.password_confirmation}</div>}
      </div>

      {/* Buttons */}
      <div className="form-buttons">
        <button className="save-btn" type="submit" disabled={submitting}>
          <Check /> sačuvaj
        </button>
        <button className="cancel-btn" type="button" onClick={() => { handleCancel()}} disabled={submitting}>
          <X/> poništi
        </button>
      </div>
      {/* Global error */}
      {errors.global && <div className="input-error global-error">{errors.global}</div>}
    </form>
  )
}

export default CreateStudent