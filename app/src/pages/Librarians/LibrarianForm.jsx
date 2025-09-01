import { useState } from "react";
import "./Librarians.css";

const emptyLibrarian = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  photoPath: "",
  jmbg: "",
  username: "",
  password: "",
  confirmPassword: ""
};

export default function LibrarianForm({ initialValues = emptyLibrarian, onSubmit, submitting, errors = {} }) {
  const [form, setForm] = useState({ ...emptyLibrarian, ...initialValues });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => setForm(emptyLibrarian);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="authors-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <input
          name="photoPath"
          className="authors-input"
          placeholder="URL fotografije"
          value={form.photoPath}
          onChange={handleChange}
        />
        {errors.photoPath && <div className="authors-input__error">{errors.photoPath}</div>}
      </div>

      <div className="authors-row-2">
        <div>
          <input
            name="firstName"
            className="authors-input"
            placeholder="Unesite ime"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="authors-input__error">{errors.firstName}</div>}
        </div>
        <div>
          <input
            name="lastName"
            className="authors-input"
            placeholder="Unesite prezime"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="authors-input__error">{errors.lastName}</div>}
        </div>
      </div>

      <div>
        <input
          name="role"
          className="authors-input"
          placeholder="Tip korisnika"
          value={form.role}
          onChange={handleChange}
        />
        {errors.role && <div className="authors-input__error">{errors.role}</div>}
      </div>

      <div>
        <input
          name="jmbg"
          className="authors-input"
          placeholder="Unesite JMBG"
          value={form.jmbg}
          onChange={handleChange}
          maxLength={13}
        />
        {errors.jmbg && <div className="authors-input__error">{errors.jmbg}</div>}
      </div>

        <div>
        <input
          name="email"
          className="authors-input"
          placeholder="Unesite E-mail"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="authors-input__error">{errors.email}</div>}
      </div>

      <div>
        <input
          name="username"
          className="authors-input"
          placeholder="Unesite korisničko ime"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <div className="authors-input__error">{errors.username}</div>}
      </div>

      <div>
        <input
          name="password"
          className="authors-input"
          type="password"
          placeholder="Unesite željenu šifru"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div className="authors-input__error">{errors.password}</div>}
      </div>

      <div>
        <input
          name="confirmPassword"
          className="authors-input"
          type="password"
          placeholder="Ponovo unesite šifru"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="authors-input__error">{errors.confirmPassword}</div>}
      </div>

      <div className="authors-form__buttons">
        <button className="authors-btn__primary" type="submit" disabled={submitting}>✓ SAČUVAJ</button>
        <button className="authors-btn__secondary" type="button" onClick={handleCancel} disabled={submitting}>X PONIŠTI</button>
      </div>

      {errors.global && <div className="authors-input__error authors-input__error--global">{errors.global}</div>}
    </form>
  );
}
